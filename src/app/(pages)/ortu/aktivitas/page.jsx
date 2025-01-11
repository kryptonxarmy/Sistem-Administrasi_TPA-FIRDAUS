"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

export default function KegiatanInti() {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    week: "",
    day: "",
    activity: "",
    remarks: "",
    classId: "",
    teacherId: "",
    completed: false,
  });
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    fetchKegiatanInti();
  }, []);

  const fetchKegiatanInti = async () => {
    try {
      const res = await fetch("/api/admin/aktivitas/kegiatanInti");
      const data = await res.json();
      if (data.success) {
        setTableData(data.coreActivities);
      } else {
        console.error("Failed to fetch kegiatan inti:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch kegiatan inti:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editData,
        classId: parseInt(editData.classId),
        teacherId: parseInt(editData.teacherId),
        completed: editData.completed === "true",
      };

      const res = await fetch(`/api/admin/aktivitas/kegiatanInti/${isEdit ? "updateKegiatan" : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Data tersimpan:", data.coreActivity);
        fetchKegiatanInti(); // Refresh data after save
        setIsModalOpen(false);
      } else {
        console.error("Failed to save kegiatan inti:", data.message);
      }
    } catch (error) {
      console.error("Failed to save kegiatan inti:", error);
    }
  };

  const getActivityForDay = (week, day) => {
    const activity = tableData.find((item) => item.week === week && item.day === day);
    return activity ? activity.activity : "";
  };

  const getStatusForDay = (week, day) => {
    const activity = tableData.find((item) => item.week === week && item.day === day);
    return activity ? activity.completed : false;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-6">Aktivitas</h1>
      <div className="mb-4">
        <label htmlFor="week" className="mr-2">
          Pilih Minggu:
        </label>
        <select id="week" value={selectedWeek} onChange={(e) => setSelectedWeek(parseInt(e.target.value))} className="border border-gray-300 rounded-md p-2">
          {[...Array(16).keys()].map((week) => (
            <option key={week + 1} value={week + 1}>
              Minggu {week + 1}
            </option>
          ))}
        </select>
      </div>
      {tableData.length === 0 ? (
        <div className="flex justify-center items-center">
          <p>Belum ada Aktifitas</p>
        </div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivitas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => (
              <tr key={day}>
                <td className="border px-4 py-2">{day}</td>
                <td className="border px-4 py-2">{getActivityForDay(selectedWeek, day)}</td>
                <td className="border px-4 py-2">{tableData.find((item) => item.week === selectedWeek && item.day === day)?.remarks || ""}</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 rounded-full ${getStatusForDay(selectedWeek, day) ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{getStatusForDay(selectedWeek, day) ? "Selesai" : "Belum"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
