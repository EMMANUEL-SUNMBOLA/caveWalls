import React, { useState } from "react";
import { DropZoneArea } from "react-dropzone";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <DropZoneArea
        
        onChange={(files) => {
          ("Files", files);
        }}
      />
    </div>
  );
}
