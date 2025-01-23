"use client";

import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { getCldImageUrl } from "next-cloudinary";
import { toast, Toaster } from "sonner";
import RichEditor from "@/components/RichEditor";
import Link from "next/link";

export default function Page() {
  const [learningModules, setLearningModules] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationWeeks: "",
    pancasilaDesc: "",
    facilityDesc: "",
    conceptMap: "",
    semesterId: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editModuleId, setEditModuleId] = useState(null);

  useEffect(() => {
    fetchLearningModules();
    fetchSemesters();
  }, []);

  const fetchLearningModules = async () => {
    try {
      const res = await fetch("/api/learningModule");
      const data = await res.json();
      if (data.success) {
        setLearningModules(data.learningModules);
      } else {
        console.error("Failed to fetch Learning Modules:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch Learning Modules:", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const res = await fetch("/api/semester");
      const data = await res.json();
      if (data.success) {
        setSemesters(data.semesters);
        console.log("semester : ", data.semesters)
      } else {
        console.error("Failed to fetch Semesters:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch Semesters:", error);
    }
  };

  const handleAddOrUpdateLearningModule = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("durationWeeks", formData.durationWeeks);
    form.append("pancasilaDesc", formData.pancasilaDesc);
    form.append("facilityDesc", formData.facilityDesc);
    form.append("conceptMap", formData.conceptMap);
    form.append("semesterId", formData.semesterId);

    try {
      const response = await fetch(`/api/learningModule${isEdit ? `/${editModuleId}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        body: form,
      });
      const result = await response.json();
      if (result.success) {
        if (isEdit) {
          setLearningModules(learningModules.map((module) => (module.id === editModuleId ? result.learningModule : module)));
          toast.success("Modul ajar berhasil diperbarui!", {
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        } else {
          setLearningModules([...learningModules, result.learningModule]);
          toast.success("Modul ajar berhasil ditambahkan!", {
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        }
        setFormData({
          title: "",
          description: "",
          durationWeeks: "",
          pancasilaDesc: "",
          facilityDesc: "",
          conceptMap: "",
          semesterId: "",
        });
        setIsEdit(false);
        setEditModuleId(null);
      } else {
        console.error("Failed to add/update learning module:", result.error);
      }
    } catch (error) {
      console.error("Failed to add/update learning module:", error);
    }
  };

  const handleUploadSuccess = (result) => {
    setFormData((prevData) => ({ ...prevData, conceptMap: result.info.public_id }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (name, content) => {
    setFormData({ ...formData, [name]: content });
  };

  const handleEdit = (module) => {
    setFormData({
      title: module.title,
      description: module.description,
      durationWeeks: module.durationWeeks,
      pancasilaDesc: module.pancasilaDesc,
      facilityDesc: module.facilityDesc,
      conceptMap: module.conceptMap,
      semesterId: module.semesterId,
    });
    setIsEdit(true);
    setEditModuleId(module.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/learningModule`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        setLearningModules(learningModules.filter((module) => module.id !== id));
        toast.success("Modul ajar berhasil dihapus!", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        console.error("Failed to delete learning module:", result.error);
      }
    } catch (error) {
      console.error("Failed to delete learning module:", error);
    }
  };


  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Modul Ajar" : "Tambah Modul Ajar"}</h1>
      <Link href="/aktivitas">
        <Button className="bg-primary mb-6 text-white">Kembali</Button>
      </Link>
      <form onSubmit={handleAddOrUpdateLearningModule} className="flex flex-col gap-4">
        <CldUploadWidget uploadPreset="tpa_firdaus" onSuccess={handleUploadSuccess}>
          {({ open }) => (
            <Button type="button" onClick={() => open()} className="w-full p-2 border border-gray-300 rounded">
              Upload Concept Map
            </Button>
          )}
        </CldUploadWidget>
        {formData.conceptMap && (
          <div className="mt-4">
            <p>Uploaded Concept Map:</p>
            <img
              src={getCldImageUrl({
                src: formData.conceptMap,
                width: 500,
                height: 500,
              })}
              alt="Concept Map"
              className="mt-2 w-full h-auto"
            />
          </div>
        )}
        <label htmlFor="title">Judul Modul</label>
        <input type="text" name="title" placeholder="Judul Modul" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={!formData.conceptMap} />
        <label htmlFor="description">Tujuan Kegiatan</label>
        <RichEditor value={formData.description} onEditorChange={(content) => handleEditorChange("description", content)} placeholder="Deskripsi" disabled={!formData.conceptMap} />
        <label htmlFor="durationWeeks">Durasi (minggu)</label>
        <input type="number" name="durationWeeks" placeholder="Durasi (minggu)" value={formData.durationWeeks} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={!formData.conceptMap} />
        <label htmlFor="pancasilaDesc">Deskripsi Pancasila</label>
        <RichEditor value={formData.pancasilaDesc} onEditorChange={(content) => handleEditorChange("pancasilaDesc", content)} placeholder="Deskripsi Pancasila" disabled={!formData.conceptMap} />
        <label htmlFor="facilityDesc">Deskripsi Sarana dan Prasarana</label>
        <RichEditor value={formData.facilityDesc} onEditorChange={(content) => handleEditorChange("facilityDesc", content)} placeholder="Deskripsi Sarana dan Prasarana" disabled={!formData.conceptMap} />
        <label htmlFor="semesterId">Semester</label>
        <select name="semesterId" value={formData.semesterId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded text-black" required disabled={!formData.conceptMap}>
          <option value="">Pilih Semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id} className="text-black">
              Semester {semester.number}
            </option>
          ))}
        </select>
        <Button type="submit" className="bg-primary text-white" disabled={!formData.conceptMap}>
          {isEdit ? "Update Modul Ajar" : "Tambah Modul Ajar"}
        </Button>
      </form>

      <h2 className="text-2xl font-bold mt-8">Daftar Modul Ajar</h2>
      <div className="flex flex-col gap-4 mt-4">
        {learningModules.map((module) => (
          <div key={module.id} className="p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-bold">{module.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: module.description }} />
            {module.conceptMap && (
              <img
                src={getCldImageUrl({
                  src: module.conceptMap,
                  width: 1920,
                  height: 360,
                  crop: "fill",
                  sizes: "30vw",
                })}
                alt={module.title}
                className="mt-2 w-full h-auto"
              />
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={() => handleEdit(module)} className="bg-blue-500 text-white">
                Edit
              </Button>
              <Button onClick={() => handleDelete(module.id)} className="bg-red-500 text-white">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
