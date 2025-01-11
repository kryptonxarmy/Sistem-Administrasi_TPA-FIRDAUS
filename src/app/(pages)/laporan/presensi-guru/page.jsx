"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RiwayatPresensiGuru() {
  const [attendance, setAttendance] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    type: "teacher",
    teacherId: "",
    status: "",
    arrivalTime: "",
    departureTime: "",
    remarks: "",
  });

  useEffect(() => {
    fetchAttendance();
    fetchTeachers();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`/api/admin/laporan/presensi`);
      const data = await res.json();
      if (data.success) {
        const teacherAttendance = data.attendance.filter(item => item.teacherId !== null);
        setAttendance(teacherAttendance);
      } else {
        console.error("Failed to fetch attendance:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`/api/admin/teacher`);
      const data = await res.json();
      if (data.success) {
        setTeachers(data.teachers);
      } else {
        console.error("Failed to fetch teachers:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { arrivalTime, departureTime, ...rest } = formData;
    const validArrivalTime = arrivalTime ? new Date(arrivalTime) : null;
    const validDepartureTime = departureTime ? new Date(departureTime) : null;

    try {
      const res = await fetch(`/api/admin/laporan/presensi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...rest, arrivalTime: validArrivalTime, departureTime: validDepartureTime }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAttendance();
      } else {
        console.error("Failed to add attendance:", data.message);
      }
    } catch (error) {
      console.error("Failed to add attendance:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Riwayat Presensi Guru</h1>
      <Dialog>
        <DialogTrigger asChild>
          <button className="btn btn-primary mb-4">Tambah Presensi</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Presensi</DialogTitle>
            <DialogDescription>Isi form berikut untuk menambahkan data presensi.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nama Guru</label>
              <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Pilih Guru</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="present">Hadir</option>
                <option value="excused">Sakit</option>
                <option value="absent">Alpa</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Jam Datang</label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Jam Pulang</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Keterangan</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <DialogFooter>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Nama Guru</TableHead>
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
              <TableCell className="text-center">{item.teacher.name}</TableCell>
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
              <TableCell className="text-center">{item.arrivalTime ? new Date(item.arrivalTime).toLocaleTimeString() : "-"}</TableCell>
              <TableCell className="text-center">{item.departureTime ? new Date(item.departureTime).toLocaleTimeString() : "-"}</TableCell>
              <TableCell className="text-center">{item.remarks || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}