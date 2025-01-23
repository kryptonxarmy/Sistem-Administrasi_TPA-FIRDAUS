'use client';

import React from "react";
import { LogOut } from "lucide-react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import AcademicPage from "./Academic";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";

export default function Page() {
  const { user, loading, name, role, profilePict, updateProfilePhoto } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleUploadSuccess = async (result) => {
    try {
      await updateProfilePhoto(result.info.public_id);
      console.log("Profile photo updated successfully");
    } catch (error) {
      console.error("Failed to update profile photo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-purple-200 rounded-xl p-6 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-6 w-full max-w-md">
        <h1 className="text-primary font-bold text-2xl">Profile</h1>
        <div className="rounded-full border-2 h-48 w-48 border-primary shadow-2xl overflow-hidden">
          <img className="object-cover object-top h-full w-full" src={profilePict ? `https://res.cloudinary.com/dsp8lxkqu/image/upload/${profilePict}.jpg` : "/assets/person.jpg"} alt="person" />
        </div>
        <CldUploadWidget uploadPreset="tpa_firdaus" onSuccess={handleUploadSuccess}>
          {({ open }) => (
            <Button type="button" onClick={() => open()} className="w-full p-2 border border-gray-300 rounded">
              Upload Profile Photo
            </Button>
          )}
        </CldUploadWidget>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-gray-500">{role === "PARENT" ? "Orang Tua" : role}</p>
        </div>
        <button onClick={handleLogout} className="bg-red-600 flex justify-center items-center w-16 h-16 rounded-full shadow-lg">
          <LogOut className="text-white text-3xl" />
        </button>
      </div>
      {role === "ADMIN" && <AcademicPage />}
    </div>
  );
}