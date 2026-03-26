import { supabase } from "@/lib/supabase";
import { useAlertStore } from "../../store/alertStore";
import FileUploader from "./FileUploader";

export default function AddForm() {
  const { hideModal } = useAlertStore();

  const uploadToSupabase = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = fileName;

    const { error } = await supabase.storage
      .from("wallpapers")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("wallpapers").getPublicUrl(filePath);

    return data.publicUrl;
  };

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-4">Add new wallpaper</h1>

      <div className="flex p-3 items-center justify-center w-full">
        <FileUploader
          send={uploadToSupabase}
          onSuccess={(url) => {
            console.log("Uploaded:", url);
            hideModal(); // close modal after upload
          }}
        />
      </div>
    </div>
  );
}
