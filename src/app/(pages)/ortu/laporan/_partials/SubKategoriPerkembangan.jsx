'use client';

import React from 'react';

export default function SubKategoriPerkembangan({ detail }) {
  return (
    <div>
      <h1 className="text-xl font-bold my-6">{detail.category}</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Kategori</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {detail.subDetails.map((subCategory) => (
            <tr key={subCategory.id}>
              <td className="border px-4 py-2">{subCategory.subCategory}</td>
              <td className="border px-4 py-2">
                <span className={`px-2 py-1 rounded-full ${subCategory.status === "Sudah Berkembang" ? "bg-green-200 text-green-800" : subCategory.status === "Sedang Berkembang" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                  {subCategory.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}