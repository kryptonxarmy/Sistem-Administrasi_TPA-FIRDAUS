"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import useUser from "@/hooks/useUser";
import { format, parseISO } from "date-fns";

export default function DataAnak() {
  const { user, role } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    if (user) {
      fetchChildren();
    }
  }, [user]);

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/admin/child");
      const data = await res.json();
      if (data.success) {
        // Filter data anak berdasarkan parentId jika role adalah PARENT
        const filteredChildren = role === "PARENT" ? data.children.filter((child) => child.parent.userId === user.id) : data.children;
        setChildren(filteredChildren);
      } else {
        console.error("Failed to fetch children:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch children:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async (result, childId) => {
    try {
      const res = await fetch(`/api/admin/child`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: childId, profilePhoto: result.info.public_id }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile photo");
      }

      fetchChildren(); // Refresh the list after updating the profile photo
    } catch (error) {
      console.error("Failed to update profile photo:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Data Anak</h1>
      {children.length === 0 ? (
        <div className="rounded-xl p-4 shadow-lg border-2 border-primary">
          <p className="text-center font-semibold">Tidak ada data anak, harap menghubungi guru untuk mendaftarkan</p>
        </div>
      ) : (
        children.map((child) => (
          <div key={child.id} className="border-2 border-primary rounded-xl p-4 mb-4 grid grid-cols-2 gap-4">
            <h2 className="text-xl font-bold col-span-2">{child.name}</h2>
            <div className="col-span-2 flex justify-center">
              <div className="size-36 overflow-hidden rounded-full border-2 border-primary">
                <img
                  className="object-cover object-center"
                  src={child.profilePhoto ? `https://res.cloudinary.com/dsp8lxkqu/image/upload/${child.profilePhoto}.jpg` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4xjShh4ynJbrgYrW_aB4lhKSxeMzQ3cO_A&s"}
                  alt="profile"
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <CldUploadWidget uploadPreset="tpa_firdaus" onSuccess={(result) => handleUploadSuccess(result, child.id)}>
                {({ open }) => (
                  <Button type="button" onClick={() => open()} className="w-full p-2 border border-gray-300 rounded">
                    Upload Profile Photo
                  </Button>
                )}
              </CldUploadWidget>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Nomor Induk:</span> <span>{child.studentId}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">No. Telp:</span> <span>{child.phone}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Tanggal Lahir:</span> <span>{format(parseISO(child.birthDate), "dd/MM/yyyy")}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Jenis Kelamin:</span> <span>{child.gender}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Alamat:</span> <span>{child.address}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Kota:</span> <span>{child.city}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Kode Pos:</span> <span>{child.postalCode}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Negara:</span> <span>{child.country}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Orang Tua:</span> <span>{child.parent.user.name}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold">Kelas:</span> <span>{child.class.name}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}