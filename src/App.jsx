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

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((url, index) => (
          <div
            key={index}
            className="group relative rounded-xl overflow-hidden bg-slate-800 aspect-video shadow-2xl transition-transform hover:scale-[1.02]"
          >
            <img
              src={url}
              alt="Wallpaper"
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-white text-black px-4 py-2 rounded-full font-bold">
                View Fullscreen
              </button>
            </div>
          </div>
        ))}
      </main>
  );
}
