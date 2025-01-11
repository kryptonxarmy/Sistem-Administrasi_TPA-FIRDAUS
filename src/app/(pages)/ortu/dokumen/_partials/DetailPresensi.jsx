import { Input } from "@/components/ui/input";
import React from "react";

export default function DetailPresensi({ data }) {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Detail Presensi</h1>
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="namaAnak" className="block text-sm font-medium text-gray-700">
              Nama Anak
            </label>
            <Input type="text" name="namaAnak" id="namaAnak" value={data.nama} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <Input type="date" name="tanggal" id="tanggal" value={data.tanggal} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="kehadiran" className="block text-sm font-medium text-gray-700">
              Kehadiran
            </label>
            <Input type="text" name="kehadiran" id="kehadiran" value={data.kehadiran} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
              Keterangan
            </label>
            <Input type="text" name="keterangan" id="keterangan" value={data.keterangan} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-purple-200 p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Pengantar</h2>
                <div className="flex justify-between">
                    <span className="font-medium">Nama Pengantar:</span>
                    <span>{'samsull'}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium">Jam Pengantaran:</span>
                    <span>{'18:30'}</span>
                </div>
            </div>
            <div className="bg-purple-200 p-4 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Penjemput</h2>
                <div className="flex justify-between">
                    <span className="font-medium">Nama Penjemput:</span>
                    <span>{'samsull'}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-medium">Jam Penjemputan:</span>
                    <span>{'20:30'}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}