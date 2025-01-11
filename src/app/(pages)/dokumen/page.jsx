"use client"

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GaleriKegiatan from "./components/GaleriKegiatan";
import DaftarMenuKegiatan from "./components/DaftarMenuKegiatan";

export default function Page() {
  return (
    <div className="">
      <Tabs defaultValue="Galeri Kegiatan" className="w-full">
        <TabsList className="bg-transparent gap-2 flex">
          <TabsTrigger value="Galeri Kegiatan" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Galeri Kegiatan
          </TabsTrigger>
          <TabsTrigger value="Daftar Menu Makan" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Daftar Menu Makan
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Galeri Kegiatan">
            <GaleriKegiatan />
        </TabsContent>
        <TabsContent value="Daftar Menu Makan">
          <DaftarMenuKegiatan />
        </TabsContent>
      </Tabs>
    </div>
  );
}
