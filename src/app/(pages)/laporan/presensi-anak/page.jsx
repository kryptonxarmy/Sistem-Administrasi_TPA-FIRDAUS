'use client'

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [attendance, setAttendance] = useState([]);
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    type: "child",
    childId: "",
    teacherId: "",
    status: "",
    arrivalTime: "",
    departureTime: "",
    remarks: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAttendance();
    fetchChildren();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await fetch("/api/admin/laporan/presensi");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/laporan/presensi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fetchAttendance();
        setIsDialogOpen(false);
      } else {
        console.error("Failed to add attendance:", data.message);
      }
    } catch (error) {
      console.error("Failed to add attendance:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Riwayat Presensi</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Tambah Presensi</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Presensi</DialogTitle>
            <DialogDescription>Isi form berikut untuk menambahkan data presensi.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="date">Tanggal</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="childId">Nama Anak</Label>
                <select id="childId" name="childId" value={formData.childId} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2" required>
                  <option value="">Pilih Anak</option>
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2" required>
                  <option value="present">Hadir</option>
                  <option value="excused">Sakit</option>
                  <option value="absent">Alpa</option>
                </select>
              </div>
              <div>
                <Label htmlFor="arrivalTime">Jam Datang</Label>
                <Input id="arrivalTime" name="arrivalTime" type="time" value={formData.arrivalTime} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="departureTime">Jam Pulang</Label>
                <Input id="departureTime" name="departureTime" type="time" value={formData.departureTime} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="remarks">Keterangan</Label>
                <Input id="remarks" name="remarks" type="text" value={formData.remarks} onChange={handleInputChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
              <TableCell className="text-center">{item.child ? item.child.name : item.teacher.name}</TableCell>
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
              <TableCell className="text-center">{item.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}