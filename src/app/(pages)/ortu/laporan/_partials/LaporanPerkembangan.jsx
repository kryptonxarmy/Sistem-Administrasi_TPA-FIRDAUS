'use client';

import React, { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import CardLaporan from "./CardLaporan";

export default function LaporanPerkembangan() {
  const { user, children } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && children.length > 0) {
      children.forEach(child => fetchProgress(child.id)); // Mengambil laporan perkembangan berdasarkan childId setiap anak
    }
  }, [user, children]);

  const fetchProgress = async (childId) => {
    try {
      const res = await fetch(`/api/admin/laporan/getProgressByChildId?childId=${childId}`);
      const data = await res.json();
      if (data.success) {
        setProgress(prevProgress => [...prevProgress, { childId, progress: data.progress }]);
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
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Laporan Perkembangan</h1>
      {loading ? (
        <div className="flex justify-center h-screen items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {children.map((child) => (
            <div key={child.id}>
              <h2 className="text-md font-bold text-secondary mb-2">{child.name}</h2>
              {progress
                .filter((item) => item.childId === child.id)
                .flatMap((item) => item.progress)
                .map((item) => (
                  <React.Fragment key={`${child.id}-${item.id}-${Math.random()}`}>
                    <div className="flex flex-col gap-4 ">
                      <CardLaporan title="Nilai Moral dan Agama" desc={item.moralValue} />
                      <CardLaporan title="Motorik Kasar" desc={item.motorGross} />
                      <CardLaporan title="Motorik Halus" desc={item.motorFine} />
                      <CardLaporan title="Kognitif" desc={item.cognitive} />
                      <CardLaporan title="Bahasa" desc={item.language} />
                      <CardLaporan title="Sosial" desc={item.social} />
                      <CardLaporan title="Refleksi" desc={item.reflection} />
                    </div>
                  </React.Fragment>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}