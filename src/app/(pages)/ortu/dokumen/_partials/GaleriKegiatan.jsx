"use client";

import React, { useState, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { ArrowRight, Image } from "lucide-react";
import Link from "next/link";

export default function GaleriKegiatan() {
  const [documents, setDocuments] = useState([]);

  const ensureUrlHasScheme = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/admin/document/galeriKegiatan");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      } else {
        console.error("Failed to fetch documents:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Galeri Kegiatan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 max-w-xl h-[50vh] shadow-2xl rounded-xl">
            <div className="flex flex-col gap-4">
              <div className="p-2 rounded-full size-14 flex justify-center items-center shadow-xl bg-primary">
                <Image className="text-white" />
              </div>
              <div>
                <Separator orientation="vertical" />
                <h1 className="text-xl font-semibold">{doc.title}</h1>
              </div>
              <div className="flex gap-4 text-primary items-center">
                <a href={ensureUrlHasScheme(doc.link)} target="_blank" rel="noopener noreferrer" className="text-primary">
                  <p className="font-semibold">Lihat Selengkapnya</p>
                </a>
                <ArrowRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
