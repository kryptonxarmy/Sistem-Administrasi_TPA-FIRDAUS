"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image, School, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function GaleriKegiatan() {
  const [documents, setDocuments] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSemesters();
    fetchAcademicYears();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/admin/document/galeriKegiatan");
      const data = await response.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await fetch("/api/semester");
      const data = await response.json();
      if (data.success) {
        setSemesters(data.semesters);
      }
    } catch (error) {
      console.error("Failed to fetch semesters:", error);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const response = await fetch("/api/academicYear");
      const data = await response.json();
      if (data.success) {
        setAcademicYears(data.academicYears);
      }
    } catch (error) {
      console.error("Failed to fetch academic years:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (!selectedAcademicYear || !selectedSemester) {
      setError("Please select both academic year and semester.");
      return;
    }

    try {
      const response = await fetch("/api/admin/document/galeriKegiatan", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        fetchDocuments();
        setShowForm(false);
        setEditData(null);
        setIsEdit(false);
        setError("");
      } else {
        console.error("Failed to save document:", data.error);
      }
    } catch (error) {
      console.error("Failed to save document:", error);
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
    setEditData(null);
    setIsEdit(false);
  };

  const handleFilterChange = async () => {
    if (!selectedAcademicYear || !selectedSemester) {
      setError("Please select both academic year and semester.");
      return;
    }

    try {
      const response = await fetch(`/api/admin/document/galeriKegiatan?semesterId=${selectedSemester}&academicYearId=${selectedAcademicYear}`);
      const data = await response.json();
      if (data.success) {
        setDocuments(data.documents);
        setError("");
      }
    } catch (error) {
      console.error("Failed to fetch filtered documents:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/document/galeriKegiatan?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchDocuments();
      } else {
        console.error("Failed to delete document:", data.error);
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const selectedAcademicYearObj = academicYears.find(year => year.id === parseInt(selectedAcademicYear));
  const selectedSemesterObj = semesters.find(semester => semester.id === parseInt(selectedSemester));

  const items = [
    {
      title: "Tahun Ajar",
      desc: selectedAcademicYearObj ? selectedAcademicYearObj.year : "Tidak ada data",
      icon: User,
    },
    {
      title: "Semester",
      desc: selectedSemesterObj ? `Semester ${selectedSemesterObj.number}` : "Tidak ada data",
      icon: School,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-around">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
              <item.icon className="text-2xl" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-300">{item.title}</p>
              <p className="font-bold text-lg">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <select
          value={selectedAcademicYear}
          onChange={(e) => setSelectedAcademicYear(e.target.value)}
          className="input"
        >
          <option value="">Pilih Tahun Ajar</option>
          {academicYears.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="input"
        >
          <option value="">Pilih Semester</option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              Semester {semester.number}
            </option>
          ))}
        </select>
        <Button onClick={handleFilterChange} className="btn btn-primary">
          Filter
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {!selectedAcademicYear || !selectedSemester ? (
        <p className="text-center text-gray-500 mt-4">Harap memilih tahun ajar dan semester dahulu untuk menampilkan kegiatan.</p>
      ) : (
        <>
          {showForm ? (
            <div className="flex flex-col gap-4">
              <Button onClick={handleKembali} className="btn btn-secondary self-start">
                Kembali
              </Button>
              <Form onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} selectedSemester={selectedSemester} selectedAcademicYear={selectedAcademicYear} />
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
                      <div className="flex flex-col gap-4">
                        <Button onClick={() => handleEdit(doc)} className="bg-primary text-white font-semibold rounded-xl px-4">
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(doc.id)} className="bg-red-500 text-white font-semibold rounded-xl px-4">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function Form({ onSubmit, initialData, isEdit, selectedSemester, selectedAcademicYear }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    title: initialData?.title || "",
    link: initialData?.link || "",
    semesterId: parseInt(selectedSemester) || initialData?.semesterId || "",
    academicYearId: parseInt(selectedAcademicYear) || initialData?.academicYearId || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        link: initialData.link,
        semesterId: selectedSemester || initialData.semesterId,
        academicYearId: selectedAcademicYear || initialData.academicYearId,
      });
    }
  }, [initialData, selectedSemester, selectedAcademicYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="input"
      />
      <input
        type="text"
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="Link"
        className="input"
      />
      <input
        type="hidden"
        name="semesterId"
        value={formData.semesterId}
        onChange={handleChange}
      />
      <input
        type="hidden"
        name="academicYearId"
        value={formData.academicYearId}
        onChange={handleChange}
      />
      <Button type="submit" className="btn btn-primary">
        {isEdit ? "Update" : "Submit"}
      </Button>
    </form>
  );
}