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
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Daftar Menu Kegiatan</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Hari</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Menu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map((menu, index) => (
            <TableRow key={menu.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{menu.day}</TableCell>
              <TableCell className="text-center">{format(parseISO(menu.date), "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-center">{menu.menu}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

