"use client";

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";
import { School, User } from "lucide-react";

export default function DaftarMenuMakanan() {
  const [menus, setMenus] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");

  useEffect(() => {
    fetchMenus();
    fetchSemesters();
    fetchAcademicYears();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch(`/api/admin/document/menuMakanan?semesterId=${selectedSemester}&academicYearId=${selectedAcademicYear}`);
      const data = await res.json();
      if (data.success) {
        setMenus(data.documents);
      } else {
        console.error("Failed to fetch menus:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch menus:", error);
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
    try {
      const res = await fetch(`/api/admin/document/menuMakanan`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        fetchMenus(); // Refresh data after save
        setShowForm(false);
      } else {
        console.error("Failed to save menu data:", data.message);
      }
    } catch (error) {
      console.error("Failed to save menu data:", error);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/document/menuMakanan`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchMenus(); // Refresh data after delete
      } else {
        console.error("Failed to delete menu data:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete menu data:", error);
    }
  };

  const handleTambah = () => {
    setEditData(null);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleKembali = () => {
    setShowForm(false);
  };

  const handleFilterChange = async () => {
    fetchMenus();
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
       <div className="flex mb-6 justify-around">
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
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogTrigger asChild>
          <Button onClick={handleTambah} className="btn btn-primary mb-4">
            Tambah Menu
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Update Data" : "Form Menu"}</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} selectedSemester={selectedSemester} selectedAcademicYear={selectedAcademicYear} />
          <DialogFooter>
            <Button onClick={handleKembali} className="btn btn-secondary">
              Kembali
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Daftar Menu Makanan</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Hari</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Menu</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map((menu, index) => (
            <TableRow key={menu.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{menu.day}</TableCell>
              <TableCell className="text-center">{format(parseISO(menu.date), "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-center">{menu.menu}</TableCell>
              <TableCell className="text-center">
                <Button onClick={() => handleEdit(menu)} className="bg-primary text-white font-semibold rounded-xl px-4">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(menu.id)} className="bg-red-500 text-white font-semibold rounded-xl px-4 ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Form({ onSubmit, initialData, isEdit, selectedSemester, selectedAcademicYear }) {
  const [formData, setFormData] = useState({
    id: "",
    day: "",
    date: "",
    menu: "",
    semesterId: selectedSemester || "",
    academicYearId: selectedAcademicYear || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        day: initialData.day || "",
        date: initialData.date ? new Date(initialData.date).toISOString().substring(0, 10) : "",
        menu: initialData.menu || "",
        semesterId: selectedSemester || initialData.semesterId,
        academicYearId: selectedAcademicYear || initialData.academicYearId,
      });
    }
  }, [initialData, selectedSemester, selectedAcademicYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const date = new Date(value);
    const day = format(date, "EEEE");
    setFormData((prevData) => ({
      ...prevData,
      date: value,
      day,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: "",
      day: "",
      date: "",
      menu: "",
      semesterId: selectedSemester,
      academicYearId: selectedAcademicYear,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border-2 border-primary rounded-xl">
      <label className="font-semibold">Hari</label>
      <Input type="text" name="day" value={formData.day} onChange={handleChange} placeholder="Hari" className="border-2 border-primary rounded-xl" disabled />

      <label className="font-semibold">Tanggal</label>
      <Input type="date" name="date" value={formData.date} onChange={handleDateChange} placeholder="Tanggal" className="border-2 border-primary rounded-xl" />

      <label className="font-semibold">Menu</label>
      <Input type="text" name="menu" value={formData.menu} onChange={handleChange} placeholder="Menu" className="border-2 border-primary rounded-xl" />

      <Button type="submit" className="bg-primary text-white font-semibold rounded-xl px-4">
        {isEdit ? "Update Data" : "Submit"}
      </Button>
    </form>
  );
}