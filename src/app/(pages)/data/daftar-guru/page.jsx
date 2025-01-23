"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import FormGuru from "./FormGuru"; // Pastikan Anda mengimpor komponen FormGuru
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; // Pastikan Anda mengimpor komponen Table
import { BookAudioIcon, CalendarCheck, GraduationCap, User } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [isTambahGuru, setIsTambahGuru] = useState(false);
  const [jumlahGuru, setJumlahGuru] = useState(0);
  const [isEditGuru, setIsEditGuru] = useState(false);
  const [editData, setEditData] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch("/api/admin/teacher");
      const data = await res.json();
      setTeachers(data.teachers);
      setJumlahGuru(data.teachers.length);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsEditGuru(true);
  };

  const handleTambah = () => {
    setIsTambahGuru(true);
  };

  const handleKembali = () => {
    setIsTambahGuru(false);
    setIsEditGuru(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/teacher`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchTeachers(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete teacher:", data.error);
      }
    } catch (error) {
      console.error("Failed to delete teacher:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex justify-between bg-primary text-primary-foreground rounded-xl shadow-lg p-8">
        <div>
          <h1 className="font-bold text-4xl">Data Guru</h1>
          <p>Informasi terbaru di LearnWithFirdaus.com</p>
        </div>
      </div>

      <div className="flex justify-around">
        <div className="flex gap-4 items-center">
          <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
            <User className="text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-300">Jumlah Guru</p>
            <p className="font-bold text-lg">{teachers.length}</p>
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

      {isTambahGuru || isEditGuru ? (
        <FormGuru status={isEditGuru ? "edit" : "tambah"} data={editData} onKembali={handleKembali} fetchTeachers={fetchTeachers} />
      ) : (
        <>
          <h1 className="text-xl font-bold">Daftar Guru</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Guru</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>No Telp</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Tanggal Lahir</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>{teacher.nip}</TableCell>
                  <TableCell>{new Date(teacher.birthDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(teacher)} className="bg-primary text-white font-semibold rounded-xl px-4">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(teacher.id)} className="bg-red-500 text-white font-semibold rounded-xl px-4 ml-2">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-4 justify-end items-center">
            <Button onClick={handleTambah} className="bg-primary text-white font-semibold rounded-xl px-4">
              Tambah Guru
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