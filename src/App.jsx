import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
import { supabase } from "./lib/supabase";

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .storage
        .from('wallpapers')
        .list('', { limit: 4, sortBy: { column: 'created_at', order: 'desc' } });

      if (error) {
        console.error(error);
      } else {
        const urls = data.map(file => ({
          name: file.name,
          url: supabase
            .storage
            .from('wallpapers')
            .getPublicUrl(file.name).data.publicUrl
        }));
        setImages(urls);
      }

      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading wallpapers…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {images.map(img => (
        <div
          key={img.name}
          className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
        >
          <img
            src={img.url}
            alt="Wallpaper"
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
