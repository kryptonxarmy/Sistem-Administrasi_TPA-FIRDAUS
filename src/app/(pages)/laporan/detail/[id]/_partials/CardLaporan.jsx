import { Paperclip } from "lucide-react";
import React from "react";

export default function CardLaporan({ title, desc }) {
  return (
    <div className="flex flex-col min-h-[40vh] items-center justify-center shadow-xl gap-4 p-4 rounded-xl bg-purple-200">
      <div className="p-2 bg-primary rounded-lg">
        <Paperclip className="text-white" />
      </div>
      <h1 className="text-primary text-center text-2xl font-normal">{title}</h1>
      <p className="text-center">{desc}</p>
    </div>
  );
}