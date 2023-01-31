import React from "react";
import { useDropzone } from "react-dropzone";


export default function DragDrop({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <div
      component="span"
      sx={{ p: 5 }}
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      <div>
        {isDragActive ? (
          <p display="block" gutterBottom>
            Release to drop the files here
          </p>
        ) : (
          <p display="block" gutterBottom>
            Drag your image here
          </p>
        )}
      </div>
    </div>
  );
}
