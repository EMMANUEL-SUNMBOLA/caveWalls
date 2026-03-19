import { Delete, Download, Expand, Trash } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/store/alertStore";

export default function ImageCard({
  isAuthenticated = false,
  imgUrl,
  refreshFunction,
}) {
  const showModal = useAlertStore((s) => s.showModal);

  const fullScreen = (url) => {
    showModal(
      <img
        src={url}
        className="max-h-[85vh] w-auto object-contain select-none shadow-2xl"
      />,
    );
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
    refreshFunction();
  };

  const handleDownload = async () => {
    try {
      // 1. Fetch image as a blob
      const response = await fetch(imgUrl);
      const blob = await response.blob();

      // 2. Create a temporary local URL for the blob
      const url = window.URL.createObjectURL(blob);

      // 3. Create a hidden anchor tag and click it
      const link = document.createElement("a");
      link.href = url;
      link.download = `wallpaper-${Date.now()}.jpg`; // Set filename
      document.body.appendChild(link);
      link.click();

      // 4. Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <img
        src={imgUrl}
        alt="wallpaper"
        className="object-cover w-full h-auto"
      />

      <div className="absolute bottom-2 right-2 flex gap-2">
        <Button size="icon" className="cursor-pointer" onClick={handleDownload}>
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
