'use client';

import React, { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";

export default function DetailPerkembangan() {
  const { user, children } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [progress, setProgress] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (children && children.length > 0) {
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
      const res = await fetch(`/api/admin/laporan/getProgressByChildId?childId=${childId}`);
      const data = await res.json();
      if (data.success && data.progress) {
        setProgress(data.progress);
      } else {
        console.error("Failed to fetch progress details:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch progress details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detail Perkembangan</h1>
      <div className="mb-4">
        <label htmlFor="child" className="block text-sm font-medium text-gray-700">
          Pilih Anak
        </label>
        <select
          id="child"
          name="child"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          {children && children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {progress.length === 0 ? (
            <div>Anak ini belum memiliki laporan</div>
          ) : (
            progress.map((item) => (
              <div key={item.id} className="mb-4">
                <h2 className="text-xl font-bold mb-2">{item.child.name}</h2>
                <p className="text-sm text-gray-600">Tanggal: {new Date(item.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Semester: {item.semester.number}</p>
                <p className="text-sm text-gray-600">Tahun Ajar: {item.academicYear.year}</p>
                {item.details.map((detail) => (
                  <Accordion key={detail.id} title={detail.category}>
                    {detail.subDetails.map((subDetail) => (
                      <div key={subDetail.id} className="p-2 border-b">
                        <p className="text-sm font-medium text-gray-700">{subDetail.subCategory}</p>
                        <p className="text-sm text-gray-600">{subDetail.status}</p>
                      </div>
                    ))}
                  </Accordion>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
      >
        {title}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}