import { Delete, Download, Expand, Trash } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/store/alertStore";

export default function ImageCard({ isAuthenticated = false, imgUrl, refreshFunction }) {
  const showModal = useAlertStore((s) => s.showModal);

  const fullScreen = (url) => {
    showModal(<img src={url} />);
  };

  const deleteImg = async (imgUrl) => {
    const filePath = imgUrl.split("/").pop();

    const { data, error } = await supabase.storage
      .from("wallpapers")
      .remove([filePath]);

    if (error) {
      console.error("Something went wrong:", error.message);
      return;
    }

    console.log("Deleted successfully:", data);
    refreshFunction()
  };

  return (
    <div className="relative w-full h-full">
      <img
        src={imgUrl}
        alt="wallpaper"
        className="object-cover w-full h-full"
      />

      <div className="absolute bottom-2 right-2 flex gap-2">
        <Button size="icon" className="cursor-pointer">
          <Download />
        </Button>

        <Button
          size="icon"
          onClick={() => {
            fullScreen(imgUrl);
          }}
          className="cursor-pointer"
        >
          <Expand />
        </Button>

        {isAuthenticated && (
          <Button
            size="icon"
            onClick={() => {
              deleteImg(imgUrl);
            }}
            variant="destructive"
            className="cursor-pointer"
          >
            <Trash />
          </Button>
        )}
      </div>
    </div>
  );
}
