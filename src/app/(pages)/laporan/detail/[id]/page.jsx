import React from "react";
import LaporanPerkembangan from "./_partials/LaporanPerkembangan";
import DetailPerkembangan from "./_partials/DetailPerkembangan";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-6">
      <Link href="/laporan">
        <Button className="mb-4 bg-primary text-white px-4">Kembali</Button>
      </Link>
      <Tabs defaultValue="laporan">
        <TabsList className="mb-4">
          <TabsTrigger value="laporan">Laporan Perkembangan Anak</TabsTrigger>
          <TabsTrigger value="detail">Detail Perkembangan</TabsTrigger>
        </TabsList>
        <TabsContent value="laporan">
          <LaporanPerkembangan />
        </TabsContent>
        <TabsContent value="detail">
          <DetailPerkembangan />
        </TabsContent>
      </Tabs>
    </div>
  );
}
