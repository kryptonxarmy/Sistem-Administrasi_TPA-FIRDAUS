import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CapaianPembelajaran from "./_partials/CapaianPembelajaran";
import TujuanKegiatan from "./_partials/TujuanKegiatan";
import KegiatanInti from "./_partials/KegiatanInti";

export default function Detail({ activityId }) {
  return (
    <div className="">
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
          <CapaianPembelajaran activityId={activityId}/>
        </TabsContent>
        <TabsContent value="Tujuan Kegiatan">
          <TujuanKegiatan  activityId={activityId}/>
        </TabsContent>
        <TabsContent value="Kegiatan Inti">
          <KegiatanInti activityId={activityId}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
