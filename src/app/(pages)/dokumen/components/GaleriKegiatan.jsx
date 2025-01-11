"use client";

import React, { useState, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { ArrowRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function GaleriKegiatan() {
  const [documents, setDocuments] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/admin/document/galeriKegiatan");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      } else {
        console.error("Failed to fetch documents:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/admin/document/galeriKegiatan/${isEdit ? "updateGaleriKegiatan" : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        fetchDocuments(); // Refresh data after save
        setShowForm(false);
      } else {
        console.error("Failed to save document data:", data.message);
      }
    } catch (error) {
      console.error("Failed to save document data:", error);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleTambah = () => {
    setEditData(null);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleKembali = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {showForm ? (
        <div className="flex flex-col gap-4">
          <Button onClick={handleKembali} className="btn btn-secondary self-start">
            Kembali
          </Button>
          <Form onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} />
        </div>
      ) : (
        <>
          <h1 className="text-lg font-bold text-primary mb-4 mt-8">Galeri Kegiatan</h1>
          <Button onClick={handleTambah} className="btn btn-primary mb-4">
            Tambah Kegiatan
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 max-w-xl h-[50vh] shadow-2xl rounded-xl">
                <div className="flex flex-col gap-4">
                  <div className="p-2 rounded-full size-14 flex justify-center items-center shadow-xl bg-primary">
                    <Image className="text-white" />
                  </div>
                  <div>
                    <Separator orientation="vertical" />
                    <h1 className="text-xl font-semibold">{doc.title}</h1>
                  </div>
                  <div className="flex gap-4 text-primary items-center">
                    <Link href={doc.link} target="_blank" className="text-primary">
                      <p className="font-semibold">Lihat Selengkapnya</p>
                    </Link>
                    <ArrowRight />
                  </div>
                  <Button onClick={() => handleEdit(doc)} className="bg-primary text-white font-semibold rounded-xl px-4">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Form({ onSubmit, initialData, isEdit }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    link: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        title: initialData.title || "",
        link: initialData.link || "",
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
      title: "",
      link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border-2 border-primary rounded-xl">
      <h2 className="text-lg font-bold">{isEdit ? "Update Data" : "Form Kegiatan"}</h2>

      <label className="font-semibold">Judul</label>
      <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Judul Kegiatan" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Link</label>
      <Input type="text" name="link" value={formData.link} onChange={handleChange} placeholder="Link Kegiatan" className="border-2 border-primary rounded-xl" />

      <Button type="submit" className="bg-primary text-white font-semibold rounded-xl px-4">
        {isEdit ? "Update Data" : "Submit"}
      </Button>
    </form>
  );
}
