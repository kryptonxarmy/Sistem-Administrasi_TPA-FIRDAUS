"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartPie, User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DetailPresensi from "./DetailPresensi";
import useUser from "@/hooks/useUser";

const data = [
  { no: 1, nama: "Rafka", kehadiran: "Hadir", keterangan: "-", tanggal: "21 Oktober 2024" },
  { no: 2, nama: "Rafka", kehadiran: "Hadir", keterangan: "-", tanggal: "22 Oktober 2024" },
  { no: 3, nama: "Rafka", kehadiran: "Hadir", keterangan: "-", tanggal: "22 Oktober 2024" },
  { no: 4, nama: "Rafka", kehadiran: "Hadir", keterangan: "-", tanggal: "22 Oktober 2024" },
  // Add more data as needed
];

export default function RiwayatPresensi({ onBackToList }) {
  const [selectedData, setSelectedData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = (item) => {
    setSelectedData(item);
    setShowDetail(true);
  };

  if (showDetail) {
    return (
      <div>
        <Button onClick={() => setShowDetail(false)} className="mb-4">
          Back to List
        </Button>
        <DetailPresensi data={selectedData} />
      </div>
    );
  }

  const { user, children } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (user && children.length > 0) {
      fetchAttendance(children[0].id); // Mengambil data presensi berdasarkan childId anak pertama
    }
  }, [user, children]);

  const fetchAttendance = async (childId) => {
    try {
      const res = await fetch(`/api/admin/getPresensiByChildId?childId=${childId}`);
      const data = await res.json();
      if (data.success) {
        setAttendance(data.attendance);
      } else {
        console.error("Failed to fetch attendance:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold">Keterangan</h1>
          <div className="flex justify-around w-full">
            <div className="flex flex-col w-[50%] justify-around p-4 gap-4 rounded-xl bg-purple-300/30 shadow-lg">
              <div>
                <p className="text-gray-400">Nama Anak</p>
                <p className="text-primary font-bold">{children.length > 0 ? children[0].name : "Nama Anak"}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400">Kelompok Usia</p>
                  <p className="text-primary font-bold">{children.length > 0 ? children[0].class.ageGroup : "Kelompok Usia"}</p>
                </div>
                <div>
                  <p className="text-gray-400">Semester</p>
                  <p className="text-primary font-bold">1</p>
                </div>
              </div>
              <h1 className="text-primary font-bold text-2xl">TPA DUTA FIRDAUS</h1>
            </div>
            {/* <div className="flex flex-col w-[30%] justify-around p-4 gap-4 rounded-xl bg-purple-300/30 shadow-lg">
              <div>
                <ChartPie className="w-12 h-12 text-primary" />
              </div>
              <div className="flex gap-4 justify-center">
                <p>Hadir</p>
                <p>Tidak hadir</p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-lg font-bold text-primary mb-4 mt-8">Riwayat Presensi</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Tanggal</TableHead>
                <TableHead className="text-center">Nama Anak</TableHead>
                <TableHead className="text-center">Kehadiran</TableHead>
                <TableHead className="text-center">Jam Datang</TableHead>
                <TableHead className="text-center">Jam Pulang</TableHead>
                <TableHead className="text-center">Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{item.child.name}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`badge ${
                        item.status === "present"
                          ? "bg-green-500 px-4 py-2 rounded-lg text-white shadow-lg"
                          : item.status === "excused"
                          ? "bg-yellow-500 px-4 py-2 rounded-lg text-white shadow-lg"
                          : "bg-red-500 px-4 py-2 rounded-lg text-white shadow-lg"
                      }`}
                    >
                      {item.status === "present" ? "Hadir" : item.status === "excused" ? "Sakit" : "Alpa"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{new Date(item.arrivalTime).toLocaleTimeString()}</TableCell>
                  <TableCell className="text-center">{new Date(item.departureTime).toLocaleTimeString()}</TableCell>
                  <TableCell className="text-center">{item.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
