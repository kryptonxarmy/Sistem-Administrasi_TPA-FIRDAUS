import React, { useEffect, useState } from "react";

export default function CapaianPembelajaran({ data }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("capaian pembelajaran : ", data);
  }, [data]);

  return (
    <div>
      <h1 className="text-xl font-bold my-6">Capaian Pembelajaran</h1>
      {loading && <div className="loader"></div>}
      {/* {
        data.length === 0 && !loading && <p>Belum ada capaian pembelajaran</p>
      } */}
      <div className="flex w-full flex-col gap-8">
        {data.learningGoals.map((goal) => (
          <div key={goal.id} className="bg-[#E2D4F780] w-full p-6 rounded-xl shadow-xl">
            <h1 className="text-xl font-semibold text-primary">Capaian Pembelajaran {goal.name}</h1>
            <p className="ml-10 mt-6">{goal.description}</p>
          </div>
        ))}
        <div  className="bg-[#E2D4F780] w-full p-6 rounded-xl shadow-xl">
          <h1 className="text-xl font-semibold text-primary">Capaian Pembelajaran {data.learningGoals.name}</h1>
          <p className="ml-10 mt-6">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
