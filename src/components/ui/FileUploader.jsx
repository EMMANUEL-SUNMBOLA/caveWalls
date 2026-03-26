import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, CheckCircle2, X } from "lucide-react";

export default function FileUploader({ send, onSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // generate preview
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // ✅ ONLY store file
  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    setFile(selected);
    setUploadedFile(null);
  }, []);

  // ✅ upload happens here
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      const url = await send(file);

      setUploadedFile({ file, url });

      if (onSuccess) onSuccess(url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadedFile(null);
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: isUploading,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* DROP ZONE */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />

        {/* ICON */}
        {isUploading ? (
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        ) : uploadedFile ? (
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        ) : (
          <Upload className="w-10 h-10 text-gray-400" />
        )}

        {/* TEXT */}
        <div className="mt-2 text-center text-sm">
          {isUploading ? (
            <p>Uploading...</p>
          ) : uploadedFile ? (
            <p className="text-green-600 font-medium">
              Upload successful!
            </p>
          ) : file ? (
            <p className="text-blue-500 font-medium">
              File ready to upload
            </p>
          ) : (
            <>
              <p className="font-medium text-blue-500">
                Click to upload
              </p>
              <p className="text-xs text-gray-400">
                or drag and drop
              </p>
            </>
          )}
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded-md"
        />
      )}

      {/* ACTION BUTTONS */}
      {file && !uploadedFile && (
        <div className="flex gap-2">
          <button
            onClick={removeFile}
            className="px-4 py-2 border rounded"
            disabled={isUploading}
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-violet-600 text-white rounded"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* FILE LINK */}
      {uploadedFile && (
        <div className="p-2 border rounded bg-gray-50 text-xs flex items-center gap-2">
          <a
            href={uploadedFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-blue-500 hover:underline"
          >
            {uploadedFile.file.name}
          </a>

          <button onClick={removeFile}>
            <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}