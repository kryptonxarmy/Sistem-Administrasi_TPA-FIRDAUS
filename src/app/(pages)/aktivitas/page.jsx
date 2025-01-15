"use client";

import DropZone from "@/components/DropZone";
import { ArrowRight, School, Timer, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Detail from "./components/Detail";

export default function page() {
  const [isSelengkapnyaClicked, setIsSelengkapnyaClicked] = useState(false);
  const [learningModules, setLearningModules] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    durationWeeks: '',
    pancasilaDesc: '',
    facilityDesc: '',
    conceptMap: '',
    semesterId: '',
  });
 

  useEffect(() => {
    fetchLearningModule();
  }, []);

  const fetchLearningModule = async () => {
    try {
      const res = await fetch("/api/learningModule");
      const data = await res.json();
      if (data.success) {
        setLearningModules(data.learningModules);
      } else {
        console.error("Failed to fetch Learning Module:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch Learning Module:", error);
    }
  };

  const items = [
    {
      title: "Modul Ajar",
      desc: learningModules.length > 0 ? learningModules[0].title : "Tidak ada data",
      icon: User,
    },
    {
      title: "Alokasi Waktu",
      desc: learningModules.length > 0 ? `${learningModules[0].durationWeeks} minggu` : "Tidak ada data",
      icon: Timer,
    },
    {
      title: "Semester",
      desc: learningModules.length > 0 ? `Semester ${learningModules[0].semester.number}` : "Tidak ada data",
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
         <Detail data={learningModules[0]} />
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
                <p>{learningModules.length > 0 ? learningModules[0].pancasilaDesc : "Tuliskan Deskripsi..."}</p>
              </div>
              <div className="flex flex-col p-4 2xl:flex-1 2xl:h-96 2xl:p-10 gap-4 bg-[#E2D4F780] rounded-xl">
                <h1 className="text-lg text-primary font-semibold 2xl:text-2xl text-center">SARANA DAN PRASARANA</h1>
                <p>{learningModules.length > 0 ? learningModules[0].facilityDesc : "Tuliskan Deskripsi..."}</p>
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
