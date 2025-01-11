"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import { LucideMessageSquareMore, MessageSquareMore, MessageSquareMoreIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { name, role } = useUser();

  const [activities, setActivities] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    fetchActivities();
    setCurrentDate(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/admin/kalenderAkademik");
      const data = await res.json();
      setActivities(data.academicCalendar);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-4">
        {/* CARD ATAS */}
        <div className="flex justify-between bg-primary text-primary-foreground rounded-xl shadow-lg">
          <div className="flex justify-between flex-col p-8">
            <p>{currentDate}</p>
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-4xl">Selamat Datang, {name} !</h1>
              <p>Dapatkan Informasi terbaru di LearnWithFirdaus.com</p>
            </div>
          </div>
          <div className="flex relative">
            <img className="h-64" src="/assets/guru/College Studentt.png" alt="backpack" />
          </div>
        </div>
        {/* CARD ATAS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KIRI */}
          <div className="col-span-2 flex flex-col gap-8">
            <div>
              <h1 className="font-bold text-xl">Aktivitas</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="p-4 shadow-lg rounded-lg">
                  <h2>Belum Selesai</h2>
                  <div>
                    <h3>Belajar React</h3>
                    <p>Belajar React di LearnWithFirdaus.com</p>
                  </div>
                </div>
                <div className="p-4 shadow-lg rounded-lg">
                  <h2>Belum Selesai</h2>
                  <div>
                    <h3>Belajar React</h3>
                    <p>Belajar React di LearnWithFirdaus.com</p>
                  </div>
                </div>
                <div className="p-4 shadow-lg rounded-lg">
                  <h2>Belum Selesai</h2>
                  <div>
                    <h3>Belajar React</h3>
                    <p>Belajar React di LearnWithFirdaus.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl">Laporan</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border-4 border-primary bg-purple-500/30 rounded-xl p-6 flex gap-6 items-center justify-between">
                  <div className="flex flex-col gap-6">
                    <p className="text-primary text-2xl font-bold">Laporan</p>
                    <Link href={role != 'ADMIN'? '/ortu/laporan' : '/laporan'}>
                    <Button className="bg-primary text-white font-semibold rounded-xl px-4">Lihat</Button>
                    </Link>
                  </div>
                  <img src="/assets/guru/icons/icon-computer.png" alt="com" />
                </div>
                <div className="border-4 border-primary bg-purple-500/30 rounded-xl p-6 flex gap-6 items-center justify-between">
                  <div className="flex flex-col gap-6">
                    <p className="text-primary text-2xl font-bold">Aktivitas</p>
                    <Link href={role != 'ADMIN'? '/ortu/aktivitas' : '/aktivitas'}>
                    <Button className="bg-primary text-white font-semibold rounded-xl px-4">Lihat</Button>
                    </Link>
                  </div>
                  <img src="/assets/guru/icons/icon-chart.png" alt="com" />
                </div>
              </div>
            </div>
          </div>
          {/* KIRI END */}

          {/* KANAN */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Pesan</h1>
                <Link href="/notifikasi">
                  <p className="text-primary font-bold">Lihat Semua</p>
                </Link>
              </div>
              <div className="flex gap-4 mt-4 items-center">
                <img src="/assets/guru/icons/icon-message.svg" className="bg-[#FFE0EB] rounded-xl p-4" alt="msg" />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Orang Tua</p>
                  <p className="text-gray-300">Pesan Baru!</p>
                </div>
                <Link href={"/notifikasi"}>
                  <Button className="bg-transparent text-primary border border-primary font-semibold rounded-full px-4">Baca</Button>
                </Link>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Kalender Akademik</h1>
                <p className="text-primary font-bold">Lihat Semua</p>
              </div>
              <div className="p-4 bg-white shadow-xl flex flex-col gap-6 rounded-xl">
                <div className="max-h-96 overflow-y-hidden flex flex-col gap-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="bg-purple-200 flex gap-4 rounded-xl p-4">
                      <div className="my-auto">
                        <p className="font-bold">
                          {new Date(activity.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-gray-700">{activity.activity}</p>
                        <p className="text-gray-500">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/kalender-akademik">
                  <h1 className="text-primary">Lihat Selengkapnya...</h1>
                </Link>
              </div>
            </div>
          </div>
          {/* KANAN END */}
        </div>
      </div>
    </>
  );
}
