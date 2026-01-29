import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    // 1. Supabase returns an object { data, error }, not an array [data, error]
    const { data, error } = await supabase.storage.from("wallpapers").list("");

    if (error) {
      console.error("Something went wrong:", error.message);
      return;
    }

    // 2. Map through files and generate the public URL for each
    const imageUrls = data.map((file) => {
      const { data: urlData } = supabase.storage
        .from("wallpapers")
        .getPublicUrl(file.name);

      return urlData.publicUrl;
    });

    setImages(imageUrls);
  };

  // 3. Auto-fetch when the component loads
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-500">
      <h1 className="text-2xl font-bold mb-6">WallPapers by Caveman</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              {/* Added a key and fixed the return inside map */}
              <img
                src={url}
                alt={`Wallpaper ${index}`}
                className="w-full h-auto"
              />
            </div>
          ))
        ) : (
          <p>No wallpapers found. Try uploading some!</p>
        )}
      </div>
    </div>
  );
}
