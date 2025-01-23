// components/CloudinaryUpload.jsx
"use client"
import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';

const CloudinaryUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUploadSuccess = (result) => {
    setImageUrl(result.info.secure_url);
  };

  return (
    <div>
      <CldUploadWidget uploadPreset="tpa_firdaus" onSuccess={handleUploadSuccess}>
        {({ open }) => (
          <Button onClick={() => open()} className="w-full p-2 border border-gray-300 rounded">
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="mt-2 w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;