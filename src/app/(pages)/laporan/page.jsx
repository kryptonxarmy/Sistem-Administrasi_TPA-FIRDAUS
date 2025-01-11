"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { NotebookPen, PencilRuler } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [children, setChildren] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/admin/child");
      const data = await res.json();
      if (data.success) {
        setChildren(data.children);
      } else {
        console.error("Failed to fetch children:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch children:", error);
    }
  };

  const handleDetail = (id) => () => {
    router.push(`/laporan/detail/${
        id
        }`)};

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="p-6">
      <div className="flex justify-around w-full mb-8">
        <Card className="w-1/3 p-4 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl text-center font-bold">Presensi Anak</CardTitle>
          </CardHeader>
          <CardContent>
            <PencilRuler className="h-24 w-24 mx-auto text-primary mb-4" />
            <Link href="/laporan/presensi-anak">
              <Button className="bg-primary text-white w-full" onClick={() => handleNavigate("/presensi-anak")}>
                Input Data
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-1/3 p-4 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl text-center font-bold">Presensi Guru</CardTitle>
          </CardHeader>
          <CardContent>
            <NotebookPen className="h-24 w-24 mx-auto text-primary mb-4" />
            <Link href="/laporan/presensi-guru">
              <Button className="bg-primary text-white w-full" onClick={() => handleNavigate("/presensi-guru")}>
                Input Data
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Laporan Perkembangan Anak</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama Anak</TableHead>
            <TableHead>Kelompok</TableHead>
            <TableHead>Nomor Induk</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {children.map((child, index) => (
            <TableRow key={child.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{child.name}</TableCell>
              <TableCell>{child.class.name}</TableCell>
              <TableCell>{child.studentId}</TableCell>
              <TableCell>
                <Button onClick={handleDetail(child.id)} className="bg-primary text-white">Detail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
