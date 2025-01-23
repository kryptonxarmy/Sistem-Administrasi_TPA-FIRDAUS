// pages/index.jsx
import React from 'react';
import CloudinaryUpload from './CloudinaryComponent';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Image to Cloudinary</h1>
      <CloudinaryUpload />
    </div>
  );
};

export default HomePage;