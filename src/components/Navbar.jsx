// app/_partials/Navbar.jsx
"use client";

import React from "react";
import { Separator } from "./ui/separator";
import { Bell } from "lucide-react";
import { Switch } from "./ui/switch";
import useUser from "../hooks/useUser";
import Link from "next/link";

export default function Navbar() {
  const { name, role, profilePict } = useUser();

  return (
    <div className="w-full flex justify-end p-4">
      <div className="flex gap-4">
        <Link href="/profile">
        <img className="object-cover size-14 shadow-lg border-4 border-primary rounded-full" src={profilePict ? `https://res.cloudinary.com/dsp8lxkqu/image/upload/v1737181752/${profilePict}.jpg` : `https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg`} alt="person" />
        
        </Link>
        <div className="flex flex-col justify-center">
          <p className="font-bold">{name}</p>
          <p className="text-gray-300">{role}</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex gap-4 items-center justify-center">
          <Link href="/notifikasi" className="text-primary">
            <Bell size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
