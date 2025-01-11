import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import LaporanPerkembangan from "./[id]/_partials/LaporanPerkembangan";
import DetailPerkembangan from "./[id]/_partials/DetailPerkembangan";

export default function page() {
  return (
    <div>
      <div className="">
        <Tabs defaultValue="Laporan Perkembangan Anak" className="w-full">
          <TabsList className="bg-transparent gap-2 flex">
            <TabsTrigger value="Laporan Perkembangan Anak" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Laporan Perkembangan Anak
            </TabsTrigger>
            <TabsTrigger value="Detail Perkembangan" className="focus:border-b-2 focus:border-primary font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Detail Perkembangan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Laporan Perkembangan Anak">
            <LaporanPerkembangan />
          </TabsContent>
          <TabsContent value="Detail Perkembangan">
            <DetailPerkembangan    />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
