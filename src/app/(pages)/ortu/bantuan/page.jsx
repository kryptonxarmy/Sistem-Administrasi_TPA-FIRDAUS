"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";
import { Toaster, toast } from "sonner";
import React from "react";

export default function Page() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, parentId: 1 }), // Sesuaikan parentId sesuai kebutuhan
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Feedback berhasil dikirim!");
        setContent("");
        toast.success("Feedback berhasil dikirim!", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      } else {
        setMessage("Gagal mengirim feedback: " + result.error);
        toast.error("Gagal mengirim feedback: " + result.error, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } catch (error) {
      setMessage("Terjadi kesalahan: " + error.message);
      toast.error("Terjadi kesalahan: " + error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold">Masukan dan Saran</h1>
      <div className="mt-8">
        <label>Untuk masukan dan saran silahkan mengisi form dibawah:</label>
        <Textarea className="block w-full mt-2 h-32 p-2 border border-gray-300 rounded" value={content} onChange={(e) => setContent(e.target.value)}></Textarea>
        <div className="w-full flex justify-end">
          <Button className="mt-8 px-6 bg-primary text-white" onClick={handleSubmit}>
            Kirim
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Kontak</h1>
        <div className="w-full flex gap-4 items-center mt-2 bg-gray-200/40 p-4 rounded-xl">
          <div className="bg-primary rounded-full p-3">
            <Mail className="text-white" />
          </div>
          <div>
            <p className="test-gray-200">Email</p>
            <p className="font-semibold">dutadongengokey@gmail.com</p>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center mt-2 bg-gray-200/40 p-4 rounded-xl">
          <div className="bg-primary rounded-full p-3">
            <PhoneCall className="text-white" />
          </div>
          <div>
            <p className="test-gray-200">Telepon</p>
            <p className="font-semibold">022-2512386</p>
          </div>
        </div>
        <div className="w-full flex gap-4 items-center mt-2 bg-gray-200/40 p-4 rounded-xl">
          <div className="bg-primary rounded-full p-3">
            <MapPinHouse className="text-white" />
          </div>
          <div>
            <p className="test-gray-200">Alamat</p>
            <p className="font-semibold">Jl Kanayakan Dalam No. 06 Bandung 40135</p>
          </div>
        </div>
      </div>
    </div>
  );
}
