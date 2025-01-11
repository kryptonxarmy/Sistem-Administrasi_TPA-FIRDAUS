"use client";

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";

export default function DaftarMenuKegiatan() {
  const [menus, setMenus] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/admin/document/menuMakanan");
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

  const handleFormSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/admin/document/menuMakanan/${isEdit ? "updateMenuMakanan" : ""}`, {
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
          <Form onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} />
          <DialogFooter>
            <Button onClick={handleKembali} className="btn btn-secondary">
              Kembali
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Daftar Menu Kegiatan</h1>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Form({ onSubmit, initialData, isEdit }) {
  const [formData, setFormData] = useState({
    id: "",
    day: "",
    date: "",
    menu: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        day: initialData.day || "",
        date: initialData.date ? new Date(initialData.date).toISOString().substring(0, 10) : "",
        menu: initialData.menu || "",
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
