"use client";

import DropZone from "@/components/DropZone";
import { ArrowRight, School, Timer, User } from "lucide-react";
import React, { useEffect } from "react";
import Detail from "./components/Detail";

export default function page() {
  const [isSelengkapnyaClicked, setIsSelengkapnyaClicked] = React.useState(false);
  const [activities, setActivities] = React.useState([]);
  // const items = [
  //   {
  //     title: "Modul Ajar",
  //     // desc: activities.learningModule.title,
  //     icon: User,
  //   },
  //   {
  //     title: "Alokasi Waktu",
  //     // desc: activities.allocation.duration,
  //     icon: Timer,
  //   },
  //   {
  //     title: "Kelas",
  //     // desc: activities.class.name,
  //     icon: School,
  //   },
  // ];

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/admin/aktivitas");
      const data = await res.json();
      if (data.success) {
        setActivities(data.activities);
      } else {
        console.error("Failed to fetch activities:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  const items = [
    {
      title: "Modul Ajar",
      desc: activities.length > 0 ? activities[0].learningModule.title : "Tidak ada data",
      icon: User,
    },
    {
      title: "Alokasi Waktu",
      desc: activities.length > 0 ? activities[0].allocation.duration : "Tidak ada data",
      icon: Timer,
    },
    {
      title: "Kelas",
      desc: activities.length > 0 ? activities[0].class.name : "Tidak ada data",
      icon: School,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-around">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="bg-primary size-16 flex justify-center items-center text-white rounded-full">
                <item.icon className="text-2xl" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-300">{item.title}</p>
                <p className="font-bold text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {isSelengkapnyaClicked ? (
          <Detail activityId={activities.length > 0 ? activities[0].id : null} />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Peta Konsep</h1>
              <div>
                <DropZone />
              </div>
            </div>

            <div className="flex justify-around gap-4">
              <div className="flex flex-col p-4 2xl:flex-1 2xl:h-96 2xl:p-10 gap-4 bg-[#E2D4F780] rounded-xl">
                <h1 className="text-lg text-primary font-semibold 2xl:text-2xl text-center">PROFIL PELAJAR PANCASILA YANG BERKAITAN</h1>
                <p>{activities.length > 0 ? activities[0].profilePancasilaDesc : "Tuliskan Deskripsi..."}</p>
              </div>
              <div className="flex flex-col p-4 2xl:flex-1 2xl:h-96 2xl:p-10 gap-4 bg-[#E2D4F780] rounded-xl">
                <h1 className="text-lg text-primary font-semibold 2xl:text-2xl text-center">SARANA DAN PRASARANA</h1>
                <p>{activities.length > 0 ? activities[0].facilityDesc : "Tuliskan Deskripsi..."}</p>
              </div>
            </div>
            <p onClick={() => setIsSelengkapnyaClicked(!isSelengkapnyaClicked)} className="flex self-end gap-4 text-primary font-bold hover:cursor-pointer">
              Lihat Selengkapnya <ArrowRight />{" "}
            </p>
          </>
        )}
      </div>
    </>
  );
}
