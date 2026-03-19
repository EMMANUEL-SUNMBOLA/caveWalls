import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAlertStore } from "@/store/alertStore";
import AddForm from "@/components/ui/AddForm";
import ImageCard from "@/components/ui/ImageCard";
import { useAuthStore } from "@/store/authStore";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const { showModal } = useAlertStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

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

  return (
    <div className="p-3 bg-red-500 min-h-screen  justify-center">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}
        gutterBreakpoints={{ 350: "5px", 750: "16px", 900: "24px" }}
      >
        <Masonry>
          {images?.map((url, index) => (
            // <div
            //   key={index}
            //   className="group relative rounded-xl overflow-hidden bg-slate-800 aspect-video shadow-2xl transition-transform hover:scale-[1.02]"
            // >
            <ImageCard
              key={index}
              isAuthenticated={isAuthenticated}
              imgUrl={url}
            />
            // </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <div
        onClick={handleAddWall}
        className="fixed bottom-5 right-5  bg-green-300 p-4 rounded-sm hover:bg-white/20 hover:border hover:border-green-300"
      >
        <p className="text-3xl font-bold">+</p>
      </div>
    </div>
  );
}
