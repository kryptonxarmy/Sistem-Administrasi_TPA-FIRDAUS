"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import FormAnak from "./FormAnak"; // Pastikan Anda mengimpor komponen FormAnak
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; // Pastikan Anda mengimpor komponen Table
import { BookAudioIcon, CalendarCheck, GraduationCap, User } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [isTambahAnak, setIsTambahAnak] = useState(false);
  const [jumlahAnak, setJumlahAnak] = useState(0);
  const [isEditAnak, setIsEditAnak] = useState(false);
  const [editData, setEditData] = useState(null);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/admin/child");
      const data = await res.json();
      setChildren(data.children);
      setJumlahAnak(data.children.length)
    } catch (error) {
      console.error("Failed to fetch children:", error);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsEditAnak(true);
  };

  const handleTambah = () => {
    setIsTambahAnak(true);
  };

  const handleKembali = () => {
    setIsTambahAnak(false);
    setIsEditAnak(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/child`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchChildren(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete child:", data.error);
      }
    } catch (error) {
      console.error("Failed to delete child:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex justify-between bg-primary text-primary-foreground rounded-xl shadow-lg p-8">
        <div>
          <h1 className="font-bold text-4xl">Data Anak</h1>
          <p>Informasi terbaru di LearnWithFirdaus.com</p>
        </div>
      </div>

      <div className="flex justify-around">
        <div className="flex gap-4 items-center">
          <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
            <User className="text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-300">Jumlah Anak</p>
            <p className="font-bold text-lg">{children.length}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
            <CalendarCheck className="text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-300">Semester</p>
            <p className="font-bold text-lg">1</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
            <GraduationCap className="text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-300">Tahun Ajar</p>
            <p className="font-bold text-lg">2024</p>
          </div>
        </div>
      </div>

      {isTambahAnak || isEditAnak ? (
        <FormAnak status={isEditAnak ? "edit" : "tambah"} data={editData} onKembali={handleKembali} fetchChildren={fetchChildren} />
      ) : (
        <>
          <h1 className="text-xl font-bold">Daftar Anak</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Anak</TableHead>
                <TableHead>Nama Orang Tua</TableHead>
                <TableHead>Nomor Induk</TableHead>
                <TableHead>Tanggal Lahir</TableHead>
                <TableHead>Kelompok Usia</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {children.map((child) => (
                <TableRow key={child.id}>
                  <TableCell>{child.name}</TableCell>
                  <TableCell>{child.parent.user.name}</TableCell>
                  <TableCell>{child.studentId}</TableCell>
                  <TableCell>{new Date(child.birthDate).toLocaleDateString()}</TableCell>
                  <TableCell>{child.class.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(child)} className="bg-primary text-white font-semibold rounded-xl px-4">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(child.id)} className="bg-red-500 text-white font-semibold rounded-xl px-4 ml-2">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-4 justify-end items-center">
            <Button onClick={handleTambah} className="bg-primary text-white font-semibold rounded-xl px-4">
              Tambah Anak
            </Button>
            <Link href={"/data"}>
              <Button className="bg-primary text-white font-semibold rounded-xl px-4">KEMBALI</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}