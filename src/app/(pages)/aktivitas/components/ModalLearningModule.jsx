// components/ModalLearningModule.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RichEditor from "@/components/RichEditor";
import { CldUploadWidget } from 'next-cloudinary';

export default function ModalLearningModule({ onAdd, onUpdate, module }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationWeeks, setDurationWeeks] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [conceptMapUrl, setConceptMapUrl] = useState(null);
  const [pancasilaDesc, setPancasilaDesc] = useState("");
  const [facilityDesc, setFacilityDesc] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (module) {
      setTitle(module.title);
      setDescription(module.description);
      setDurationWeeks(module.durationWeeks);
      setSemesterId(module.semesterId);
      setConceptMapUrl(module.conceptMap);
      setPancasilaDesc(module.pancasilaDesc);
      setFacilityDesc(module.facilityDesc);
      setIsUpdate(true);
    }
  }, [module]);

  const handleUploadSuccess = (result) => {
    setConceptMapUrl(result.info.secure_url);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("durationWeeks", durationWeeks);
    formData.append("semesterId", semesterId);
    formData.append("conceptMap", conceptMapUrl);
    formData.append("pancasilaDesc", pancasilaDesc);
    formData.append("facilityDesc", facilityDesc);

    try {
      const response = await fetch("/api/learningModule", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        onAdd(result.learningModule);
      } else {
        console.error("Failed to add learning module:", result.error);
      }
    } catch (error) {
      console.error("Failed to add learning module:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("durationWeeks", durationWeeks);
    formData.append("semesterId", semesterId);
    formData.append("conceptMap", conceptMapUrl);
    formData.append("pancasilaDesc", pancasilaDesc);
    formData.append("facilityDesc", facilityDesc);

    try {
      const response = await fetch(`/api/learningModule/${module.id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        onUpdate(result.learningModule);
      } else {
        console.error("Failed to update learning module:", result.error);
      }
    } catch (error) {
      console.error("Failed to update learning module:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white">{isUpdate ? "Update Modul Ajar" : "Tambah Modul Ajar"}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Update Modul Ajar" : "Tambah Modul Ajar"}</DialogTitle>
          <DialogDescription>Isi form berikut untuk {isUpdate ? "mengupdate" : "menambahkan"} modul ajar.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input type="text" placeholder="Modul Ajar" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
          <RichEditor value={description} onEditorChange={(content) => setDescription(content)} />
          <input type="text" placeholder="Alokasi Waktu (minggu)" value={durationWeeks} onChange={(e) => setDurationWeeks(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" placeholder="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
          <CldUploadWidget uploadPreset="tpa_firdaus" onSuccess={handleUploadSuccess}>
            {({ open }) => (
              <Button onClick={() => open()} className="w-full p-2 border border-gray-300 rounded">
                Upload Concept Map
              </Button>
            )}
          </CldUploadWidget>
          <RichEditor value={pancasilaDesc} onEditorChange={(content) => setPancasilaDesc(content)} />
          <RichEditor value={facilityDesc} onEditorChange={(content) => setFacilityDesc(content)} />
        </div>
        <DialogFooter>
          <Button className="bg-primary text-white" onClick={isUpdate ? handleUpdate : handleSubmit} disabled={isLoading}>
            {isUpdate ? "Update" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}