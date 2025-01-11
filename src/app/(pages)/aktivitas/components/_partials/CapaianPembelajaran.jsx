import React, { useEffect, useState } from "react";

export default function CapaianPembelajaran({ activityId }) {
  const [capaianPembelajaran, setCapaianPembelajaran] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCapaianPembelajaran();
  }, []);

  const fetchCapaianPembelajaran = async () => {
    try {
      const res = await fetch(`/api/admin/aktivitas/capaianPembelajaran?activityId=${activityId}`);
      const data = await res.json();
      if (data.success) {
        setCapaianPembelajaran(data.capaianPembelajaran);
      } 
    } catch (error) {
      console.error("Failed to fetch capaian pembelajaran:", error);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <h1 className="text-xl font-bold my-6">Capaian Pembelajaran</h1>
      {
        loading && <div className="loader"></div>
      }
      {
        capaianPembelajaran.length === 0 && !loading && <p>Belum ada capaian pembelajaran</p>
      }
      <div className="flex w-full flex-col gap-8">
        {capaianPembelajaran.map((item) => (
          <div key={item.id} className="bg-[#E2D4F780] w-full p-6 rounded-xl shadow-xl">
            <h1 className="text-xl font-semibold text-primary">Capaian Pembelajaran: {item.name}</h1>
            <p className="ml-10 mt-6">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
