import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Masukan dan Saran</h1>
      <div className="mt-8">
        <label>Untuk masukan dan saran silahkan mengisi form dibawah:</label>
        <Textarea className="block w-full mt-2 h-32 p-2 border border-gray-300 rounded"></Textarea>
        <div className="w-full flex justify-end">
          <Button className="mt-8 px-6 bg-primary text-white">Kirim</Button>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Kontak</h1>
        <div className="w-full flex gap-4 items-center mt-2 bg-gray-200/40 p-4 rounded-xl">
          <div className="bg-primary rounded-full p-3">
            <PhoneCall className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-300">Telepon</p>
            <p className="font-bold">081359357517</p>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center mt-2 bg-gray-200/40 p-4 rounded-xl">
          <div className="bg-primary rounded-full p-3">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-300">Telepon</p>
            <p className="font-bold">dutadongengokey@gmail.com</p>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center mt-2 bg-gray-200/40 p-4 rounded-xl">
          <div className="bg-primary rounded-full p-3">
            <MapPinHouse className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-300">Alamat</p>
            <p className="font-bold">Jl Kanayakan Dalam No. 06 Bandung 40135</p>
          </div>
        </div>
      </div>
    </div>
  );
}
