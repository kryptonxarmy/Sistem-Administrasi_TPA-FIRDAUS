'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import SubKategoriPerkembangan from './SubKategoriPerkembangan';
import useUser from "@/hooks/useUser";

export default function DetailPerkembangan() {
  const { user, children } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [category, setCategory] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    if (user && children.length > 0) {
      children.forEach(child => fetchSubCategories(child.id)); // Mengambil detail perkembangan berdasarkan childId setiap anak
    }
  }, [user, children]);

  const fetchSubCategories = async (childId) => {
    try {
      const res = await fetch(`/api/admin/laporan/getProgressByChildId?childId=${childId}`);
      const data = await res.json();
      if (data.success) {
        setCategory(prevCategory => [...prevCategory, { childId, progressDetails: data.progressDetails }]);
      } else {
        console.error("Failed to fetch progress details:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch progress details:", error);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Detail Perkembangan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {children.map((child) => (
          <div key={child.id}>
            <h2 className="text-md font-bold text-secondary mb-2">{child.name}</h2>
            {category
              .filter((item) => item.childId === child.id)
              .flatMap((item) => item.progressDetails)
              .map((detail, i) => (
                <div key={detail.id - Math.random()} className="bg-purple-200 flex gap-4 mb-4 rounded-xl p-4">
                  <div className="my-auto">
                    <p className="text-primary text-xl font-bold">{i+1}. {detail.category}</p>
                    {detail.subDetails.map((subDetail) => (
                      <div key={subDetail.id - Math.random()} className="ml-4">
                        <p className="text-gray-700 font-bold">{subDetail.subCategory}</p>
                        <p className="text-gray-500">{subDetail.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      {selectedDetail && <SubKategoriPerkembangan detail={selectedDetail} />}
    </div>
  );
}