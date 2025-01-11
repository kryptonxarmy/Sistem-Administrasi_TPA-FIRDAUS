"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col h-36 items-center justify-center p-6 border-2 border-dashed border-primary rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
    >
      <input {...getInputProps()} className="hidden" />
      {isDragActive ? (
        <p className="text-primary font-semibold">Drop the files here ...</p>
      ) : (
        <p className="text-gray-500 font-semibold">Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}