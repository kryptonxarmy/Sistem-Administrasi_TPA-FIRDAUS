"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; // Pastikan Anda mengimpor komponen Table
import { BookAudioIcon, CalendarCheck, GraduationCap, User } from "lucide-react";
import FormGuru from "./FormGuru";
import Link from "next/link";

export default function Page() {
  const [isTambahGuru, setIsTambahGuru] = useState(false);
  const [isEditGuru, setIsEditGuru] = useState(false);
  const [editData, setEditData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [jumlahGuru, setJumlahGuru] = useState(0);

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
    setIsTambahGuru(!isTambahGuru);
  };

  const handleKembali = () => {
    setIsTambahGuru(false);
    setIsEditGuru(false);
    setEditData(null);
  };

  const items = [
    // {
    //   title: "Jumlah Anak",
    //   desc: 4,
    //   icon: User,
    // },
    {
      title: "Jumlah Guru",
      desc: jumlahGuru,
      icon: BookAudioIcon,
    },
    {
      title: "Semester",
      desc: 1,
      icon: CalendarCheck,
    },
    {
      title: "Tahun Ajar",
      desc: 2024,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
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
      {isTambahGuru || isEditGuru ? (
        <FormGuru status={isEditGuru ? "edit" : "tambah"} data={editData} onKembali={handleKembali} fetchTeachers={fetchTeachers}/>
      ) : (
        <>
          <h1 className="text-xl font-bold">Daftar Guru</h1>
          <Table>
            <TableHeader>
              <TableRow className="text-primary hover:bg-transparent">
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Nama</TableHead>
                <TableHead className="text-center">NIP</TableHead>
                <TableHead className="text-center">No Telp</TableHead>
                <TableHead className="text-center">Tanggal</TableHead>
                <TableHead className="text-center">email</TableHead>

                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={teacher.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{teacher.name}</TableCell>
                  <TableCell className="text-center">{teacher.id}</TableCell>
                  <TableCell className="text-center">{teacher.phone}</TableCell>
                  <TableCell className="text-center">{new Date(teacher.birthDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{teacher.email}</TableCell>
                  <TableCell className="text-center">
                    <Button onClick={() => handleEdit(teacher)} className="bg-blue-500 text-white font-semibold rounded-xl px-4">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full items-center gap-6 justify-end">
            <Button onClick={handleTambah} className="bg-primary text-white font-semibold rounded-xl px-4">
              INPUT DATA
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
