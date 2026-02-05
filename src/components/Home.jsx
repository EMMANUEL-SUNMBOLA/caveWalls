import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAlertStore } from "../store/alertStore";
import AddForm from "./AddForm";

export default function Home() {
  const [images, setImages] = useState([]);
  const { showModal } = useAlertStore();

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

  const handleAddWall = () => {
    showModal(<AddForm />);
    // console.log("caveman");
  };

  const fullScreen = (url) => {
    showModal(<img src={url} />);
  };

  return (
    <div className="p-10 bg-red-500 min-h-screen flex  justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {images?.map((url, index) => (
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
              <button
                onClick={() => {
                  fullScreen(url);
                }}
                className="bg-white text-black px-4 py-2 rounded-full font-bold"
              >
                View Fullscreen
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={handleAddWall}
        className="absolute bottom-8 right-8  bg-green-300 p-6 rounded-sm hover:bg-white/20 hover:border hover:border-green-300"
      >
        <p className="text-3xl font-bold">+</p>
      </div>
    </div>
  );
}
