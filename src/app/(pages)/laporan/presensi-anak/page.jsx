"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [attendance, setAttendance] = useState([]);
  const [children, setChildren] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    type: "child",
    childId: "",
    status: "present",
    arrivalTime: "",
    departureTime: "",
    remarks: "",
    penjemput: "",
    pengantar: "",
    semesterId: "",
    academicYearId: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchAttendance();
    fetchChildren();
    fetchSemesters();
    fetchAcademicYears();
  }, [selectedSemester, selectedAcademicYear]);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`/api/admin/laporan/presensi?semesterId=${selectedSemester}&academicYearId=${selectedAcademicYear}`);
      const data = await res.json();
      if (data.success) {
        const filteredAttendance = data.attendance.filter((item) => item.type === "child");
        setAttendance(filteredAttendance);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/laporan/presensi", {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          semesterId: selectedSemester,
          academicYearId: selectedAcademicYear,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAttendance();
        setIsDialogOpen(false);
        setIsEditMode(false);
        setFormData({
          id: "",
          date: "",
          type: "child",
          childId: "",
          status: "present",
          arrivalTime: "",
          departureTime: "",
          remarks: "",
          penjemput: "",
          pengantar: "",
          semesterId: "",
          academicYearId: "",
        });
      } else {
        console.error("Failed to add/update attendance:", data.message);
      }
    } catch (error) {
      console.error("Failed to add/update attendance:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      date: item.date.split("T")[0],
      type: item.type,
      childId: item.childId,
      status: item.status,
      arrivalTime: item.arrivalTime ? item.arrivalTime.split("T")[1].substring(0, 5) : "",
      departureTime: item.departureTime ? item.departureTime.split("T")[1].substring(0, 5) : "",
      remarks: item.remarks,
      penjemput: item.penjemput,
      pengantar: item.pengantar,
      semesterId: item.semesterId,
      academicYearId: item.academicYearId,
    });
    setSelectedSemester(item.semesterId);
    setSelectedAcademicYear(item.academicYearId);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch("/api/admin/laporan/presensi", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAttendance();
      } else {
        console.error("Failed to delete attendance:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete attendance:", error);
    }
  };

  const handleFilterChange = async () => {
    fetchAttendance();
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Riwayat Presensi</h1>
      <div className="flex gap-4 mt-4">
        <select value={selectedAcademicYear} onChange={(e) => setSelectedAcademicYear(e.target.value)} className="input">
          <option value="">Pilih Tahun Ajar</option>
          {academicYears.map((year) => (
            <option key={year.id} value={year.id}>
              {year.year}
            </option>
          ))}
        </select>
        <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="input">
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>Tambah Presensi</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Presensi" : "Tambah Presensi"}</DialogTitle>
            <DialogDescription>Isi form berikut untuk {isEditMode ? "mengedit" : "menambahkan"} data presensi.</DialogDescription>
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
              {formData.status === "present" && (
                <>
                  <div>
                    <Label htmlFor="arrivalTime">Jam Datang</Label>
                    <Input id="arrivalTime" name="arrivalTime" type="time" value={formData.arrivalTime} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="departureTime">Jam Pulang</Label>
                    <Input id="departureTime" name="departureTime" type="time" value={formData.departureTime} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="penjemput">Penjemput</Label>
                    <Input id="penjemput" name="penjemput" type="text" value={formData.penjemput} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="pengantar">Pengantar</Label>
                    <Input id="pengantar" name="pengantar" type="text" value={formData.pengantar} onChange={handleInputChange} />
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="remarks">Keterangan</Label>
                <Input id="remarks" name="remarks" type="text" value={formData.remarks} onChange={handleInputChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{isEditMode ? "Update" : "Simpan"}</Button>
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
            <TableHead className="text-center">Pengantar</TableHead>
            <TableHead className="text-center">Jam Datang</TableHead>
            <TableHead className="text-center">Jam Pulang</TableHead>
            <TableHead className="text-center">Penjemput</TableHead>
            <TableHead className="text-center">Kehadiran</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-center">{item.child ? item.child.name : "-"}</TableCell>
              <TableCell className="text-center">{item.status === "present" ? item.pengantar : "-"}</TableCell>
              <TableCell className="text-center">{item.status === "present" && item.arrivalTime ? new Date(item.arrivalTime).toLocaleTimeString() : "-"}</TableCell>
              <TableCell className="text-center">{item.status === "present" && item.departureTime ? new Date(item.departureTime).toLocaleTimeString() : "-"}</TableCell>
              <TableCell className="text-center">{item.status === "present" ? item.penjemput : "-"}</TableCell>
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
              <TableCell className="text-center">
                <Button className="mr-2" onClick={() => handleEdit(item)}>Edit</Button>
                <Button className="bg-red-500 text-white" onClick={() => handleDelete(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex justify-end mt-8">
        <Link href={"/laporan"}>
          <Button className="bg-primary px-4 rounded-lg">Kembali</Button>
        </Link>
      </div>
    </div>
  );
}