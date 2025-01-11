"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import useUser from "@/hooks/useUser";
import { format, parseISO } from "date-fns";

export default function DataAnak() {
  const { user, role } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Data Anak</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
      <div>
      {children.length === 0 && (
        <div className="rounded-xl p-4 shadow-lg border-2 border-primary">
          <p className="text-center font-semibold">Tidak ada data anak, harap menghubungi guru untuk mendaftarkan</p>
        </div>
        )}
      {children?.map((child) => (
        <div key={child.id} className="border-2 border-primary rounded-xl p-4 mb-4 grid grid-cols-2 gap-4">
          <h2 className="text-xl font-bold col-span-2">{child.name}</h2>
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
      ))}
      </div>)}
    </div>
  );
}

function EditForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    studentId: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    parentId: "",
    classId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        name: initialData.name || "",
        studentId: initialData.studentId || "",
        phone: initialData.phone || "",
        birthDate: initialData.birthDate ? new Date(initialData.birthDate).toISOString().substring(0, 10) : "",
        gender: initialData.gender || "",
        address: initialData.address || "",
        city: initialData.city || "",
        postalCode: initialData.postalCode || "",
        country: initialData.country || "",
        parentId: initialData.parentId || "",
        classId: initialData.classId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: "",
      name: "",
      studentId: "",
      phone: "",
      birthDate: "",
      gender: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      parentId: "",
      classId: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border-2 border-primary rounded-xl">
      <label className="font-semibold">Nama</label>
      <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nama" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Nomor Induk</label>
      <Input type="text" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Nomor Induk" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">No. Telp</label>
      <Input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="No. Telp" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Tanggal Lahir</label>
      <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder="Tanggal Lahir" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Jenis Kelamin</label>
      <select name="gender" value={formData.gender} onChange={handleChange} className="border-2 border-primary rounded-xl">
        <option value="">Pilih</option>
        <option value="Male">Laki-laki</option>
        <option value="Female">Perempuan</option>
      </select>

      <label className="font-semibold">Alamat</label>
      <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Alamat" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Kota</label>
      <Input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Kota" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Kode Pos</label>
      <Input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Kode Pos" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Negara</label>
      <Input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Negara" className="border-2 border-primary rounded-xl" />

      <Button type="submit" className="bg-primary text-white font-semibold rounded-xl px-4">
        Update
      </Button>
    </form>
  );
}
