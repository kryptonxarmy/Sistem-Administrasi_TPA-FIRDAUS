import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import ModalKegiatan from "./ModalKegiatan";

export default function KegiatanInti() {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    week: "",
    day: "",
    activity: "",
    remarks: "",
    classId: 1, // Default classId
    teacherId: 1, // Default teacherId
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
        week: parseInt(selectedWeek), // Ambil week dari filter
        classId: parseInt(editData.classId) || 1, // Default classId
        teacherId: parseInt(editData.teacherId) || 1, // Default teacherId
        completed: editData.completed === "true",
      };

      const res = await fetch(`/api/admin/aktivitas/kegiatanInti${isEdit ? "/updateKegiatan" : ""}`, {
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

  const handleEdit = (data) => {
    setEditData({
      ...data,
      week: data.week.toString(), // Konversi week menjadi string untuk input form
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleTambah = () => {
    setEditData({
      week: selectedWeek.toString(), // Set default week value
      day: "",
      activity: "",
      remarks: "",
      classId: 1, // Default classId
      teacherId: 1, // Default teacherId
      completed: false,
    });
    setIsEdit(false);
    setIsModalOpen(true);
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
      <h1 className="text-xl font-bold my-6">Kegiatan Inti</h1>
      <Button onClick={handleTambah} className="bg-primary text-white font-semibold rounded-xl px-4 mb-4">
        Tambah Kegiatan
      </Button>
      <div className="mb-4">
        <label htmlFor="week" className="mr-2">Pilih Minggu:</label>
        <select id="week" value={selectedWeek} onChange={(e) => setSelectedWeek(parseInt(e.target.value))} className="border border-gray-300 rounded-md p-2">
          {[...Array(16).keys()].map((week) => (
            <option key={week + 1} value={week + 1}>
              Minggu {week + 1}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivitas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => (
            <tr key={day}>
              <td className="border px-4 py-2">{day}</td>
              <td className="border px-4 py-2">{getActivityForDay(selectedWeek, day)}</td>
              <td className="border px-4 py-2">{tableData.find((item) => item.week === selectedWeek && item.day === day)?.remarks || ""}</td>
              <td className="border px-4 py-2">
                <span className={`px-2 py-1 rounded-full ${getStatusForDay(selectedWeek, day) ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {getStatusForDay(selectedWeek, day) ? "Selesai" : "Belum"}
                </span>
              </td>
              <td className="border px-4 py-2">
                <Button onClick={() => handleEdit(tableData.find((item) => item.week === selectedWeek && item.day === day))} className="bg-blue-500 text-white font-semibold rounded-xl px-4">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalKegiatan
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEdit={isEdit}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </div>
  );
}