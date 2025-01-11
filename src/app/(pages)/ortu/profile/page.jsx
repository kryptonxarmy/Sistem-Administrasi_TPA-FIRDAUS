import React from "react";
import { LogOut } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-purple-200 rounded-xl p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-6 w-full max-w-md">
        <h1 className="text-primary font-bold text-2xl">Profile</h1>
        <div className="rounded-full p-4 border-2 h-48 w-48 border-primary shadow-2xl overflow-hidden">
          <img className="object-cover h-full w-full" src="/assets/person.jpg" alt="person" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-bold">John Doe</h1>
          <p className="text-gray-500">Orang Tua</p>
        </div>
        <button className="bg-red-600 flex justify-center items-center w-16 h-16 rounded-full shadow-lg">
          <LogOut className="text-white text-3xl" />
        </button>
      </div>
    </div>
  );
}
