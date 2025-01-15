'use client';

import React, { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import CardLaporan from "./CardLaporan";

export default function LaporanPerkembangan() {
  const { user, children } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState("");

  useEffect(() => {
    if (children.length > 0) {
      setSelectedChild(children[0].id.toString());
    }
  }, [children]);

  useEffect(() => {
    if (selectedChild) {
      fetchProgress(selectedChild);
    }
  }, [selectedChild]);

  const fetchProgress = async (childId) => {
    try {
      const res = await fetch(`/api/admin/laporan/laporanPerkembangan?childId=${childId}`);
      const data = await res.json();
      if (data.success) {
        setProgress(data.progress);
      } else {
        console.error("Failed to fetch progress:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Laporan Perkembangan</h1>
      <div className="mb-4">
        <label htmlFor="child" className="block text-sm font-medium text-gray-700">
          Pilih Anak
        </label>
        <select
          id="child"
          name="child"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10 border-primary"
        >
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {progress.length > 0 ? (
            progress.map((item) => (
              <React.Fragment key={item.id}>
                <CardLaporan title="Nilai Moral" desc={item.moralValue || "Belum memiliki laporan"} />
                <CardLaporan title="Motorik Kasar" desc={item.motorGross || "Belum memiliki laporan"} />
                <CardLaporan title="Motorik Halus" desc={item.motorFine || "Belum memiliki laporan"} />
                <CardLaporan title="Kognitif" desc={item.cognitive || "Belum memiliki laporan"} />
                <CardLaporan title="Bahasa" desc={item.language || "Belum memiliki laporan"} />
                <CardLaporan title="Sosial" desc={item.social || "Belum memiliki laporan"} />
                <CardLaporan title="Refleksi" desc={item.reflection || "Belum memiliki laporan"} />
                <CardLaporan title="Komentar" desc={item.comments || "Belum memiliki laporan"} />
              </React.Fragment>
            ))
          ) : (
            <div>Anak ini Belum memiliki laporan</div>
          )}
        </div>
      )}
    </div>
  );
}