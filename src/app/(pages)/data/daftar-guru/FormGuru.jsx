"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function FormGuru({ status, data, onKembali, fetchTeachers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (status === "edit" && data) {
      setFormData(data);
    }
  }, [status, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
      };

      if (status === "edit") {
        // Update data
        const res = await fetch(`/api/admin/teacher/updateTeacher`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Failed to update teacher");
        }
      } else {
        // Add new data
        const res = await fetch("/api/admin/teacher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Failed to add teacher");
        }
      }
      onKembali(); // Kembali ke tampilan tabel setelah submit
      fetchTeachers(); // Update daftar guru setelah submit
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex gap-4 flex-col">
      <div className="mb-4 border-b-2 border-primary w-fit">
        <h1 className="text-xl font-bold text-primary">Profile</h1>
      </div>
      <div className="flex gap-4 justify-around">
        <div className="size-36 overflow-hidden rounded-full border-2 border-primary">
          <img className="object-cover object-bottom" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4xjShh4ynJbrgYrW_aB4lhKSxeMzQ3cO_A&s" alt="profile" />
        </div>
        <div className="flex flex-col w-[70%] gap-4">
          <h1 className="text-xl font-bold">{status === "edit" ? "Edit Guru" : "Tambah Guru"}</h1>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama Guru" className="border border-gray-300 rounded-md p-2" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="No Telp" className="border border-gray-300 rounded-md p-2" />
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder="Tanggal Lahir" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Jenis Kelamin" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Alamat" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Kota" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Kode Pos" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Negara" className="border border-gray-300 rounded-md p-2" />
          <div className="flex gap-4">
            <Button onClick={handleSubmit} className="bg-primary text-white font-semibold rounded-xl px-4">
              {status === "edit" ? "Update" : "Tambah"}
            </Button>
            <Button onClick={onKembali} className="bg-gray-500 text-white font-semibold rounded-xl px-4">
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}