import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CapaianPembelajaran from "./_partials/CapaianPembelajaran";
import TujuanKegiatan from "./_partials/TujuanKegiatan";
import KegiatanInti from "./_partials/KegiatanInti";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Detail({ data }) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="">
      <Button onClick={() => window.location.reload()} className="bg-primary px-4 text-white">Kembali</Button>
      <Tabs defaultValue="Capaian Pembelajaran" className="w-full">
        <TabsList className="bg-transparent gap-2 flex">
          <TabsTrigger value="Capaian Pembelajaran" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Capaian Pembelajaran
          </TabsTrigger>
          <TabsTrigger value="Tujuan Kegiatan" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Tujuan Kegiatan
          </TabsTrigger>
          <TabsTrigger value="Kegiatan Inti" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Kegiatan Inti
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Capaian Pembelajaran">
          <CapaianPembelajaran data={data} />
        </TabsContent>
        <TabsContent value="Tujuan Kegiatan">
          <TujuanKegiatan data={data.description} />
        </TabsContent>
        <TabsContent value="Kegiatan Inti">
          <KegiatanInti data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
