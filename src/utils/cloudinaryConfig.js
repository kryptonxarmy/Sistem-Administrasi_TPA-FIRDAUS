// utils/cloudinaryConfig.js
import { CldUploadWidget } from "next-cloudinary";

export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "your_upload_preset", // Replace with your upload preset
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result.event === "success") {
          resolve(result.info.secure_url);
        }
      }
    );

    uploadWidget.open();
  });
};
