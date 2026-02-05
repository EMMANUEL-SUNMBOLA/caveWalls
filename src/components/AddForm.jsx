import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AddForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [message, setMessage] = useState("");

  // generate preview when file changes
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setStatus("idle");
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setMessage("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from("wallpapers")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      setStatus("success");
      setMessage("Wallpaper uploaded successfully 🎉");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to upload image. Try again.");
    }
  };

  return (
    <div className="w-[80%] h-[80vh] bg-white p-6">
      <h1 className="text-xl font-semibold mb-4">Add new wallpaper</h1>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileSelect}
        className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
      />

      {/* POPUP */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-[400px]">
            <h2 className="font-semibold mb-3">Preview wallpaper</h2>

            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            {status === "success" && (
              <p className="text-green-600 text-sm mb-2">{message}</p>
            )}

            {status === "error" && (
              <p className="text-red-600 text-sm mb-2">{message}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFile(null)}
                disabled={status === "uploading"}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                disabled={status === "uploading"}
                className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md disabled:opacity-50"
              >
                {status === "uploading" ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
