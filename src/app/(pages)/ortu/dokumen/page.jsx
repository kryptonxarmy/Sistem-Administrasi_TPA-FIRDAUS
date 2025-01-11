import React from "react";
import GaleriKegiatan from "./_partials/GaleriKegiatan";
import RiwayatPresensi from "./_partials/RiwayatPresensi";
import DaftarMenuMakan from "./_partials/DaftarMenuMakan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div>
      <Tabs defaultValue="Galeri Kegiatan" className="w-full">
        <TabsList className="bg-transparent gap-2 flex">
          <TabsTrigger value="Galeri Kegiatan" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Galeri Kegiatan
          </TabsTrigger>
          <TabsTrigger value="Riwayat Presensi" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Riwayat Presensi
          </TabsTrigger>
          <TabsTrigger value="Daftar Menu Makan" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Daftar Menu Makan
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Galeri Kegiatan">
          <GaleriKegiatan />
        </TabsContent>
        <TabsContent value="Riwayat Presensi">
          <RiwayatPresensi />
        </TabsContent>
        <TabsContent value="Daftar Menu Makan">
          <DaftarMenuMakan />
        </TabsContent>
      </Tabs>
    </div>
  );
}
