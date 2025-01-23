import React from "react";

export default function TujuanKegiatan({ data }) {
  return (
    <div>
      <h1 className="text-xl font-bold my-6">Tujuan Kegiatan</h1>
      <div className="flex w-full flex-col gap-8">
        <div className="bg-[#E2D4F780] w-full p-6 rounded-xl shadow-xl">
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      </div>
    </div>
  );
}
