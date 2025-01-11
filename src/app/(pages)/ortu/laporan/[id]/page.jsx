"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Stepper from "./Stepper";

const steps = ["Belum Tampak Berkembang", "Sedang Berkembang", "Berkembang Baik"];

export default function page() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr className="w-1/2">
              <td>
                <h1 className="font-bold text-xl py-auto mb-4">Nama Anak</h1>
              </td>
              <td>
                <Input placeholder="Nama Anak" className="ml-4 rounded-xl border-primary" />
              </td>
            </tr>
            <tr className="w-1/2">
              <td>
                <h1 className="font-bold text-xl mb-4">Kelompok Usia/Semester</h1>
              </td>
              <td>
                <Input placeholder="1 - 2 Tahun / 1 (satu)" className="ml-4 rounded-xl border-primary" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-xl">Kepekaan Panca Indra</h1>
        <div className="p-6 border border-gray-200 rounded-xl">
          <h1 className="font-bold text-xl">Penglihatan</h1>
          <div className="mt-4">
            <Stepper steps={steps} currentStep={2} />
          </div>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl">
          <h1 className="font-bold text-xl">Menunjukkan reaksi terhadap cahaya/warna (penglihatan)</h1>
          <div className="mt-4">
            <Stepper steps={steps} currentStep={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
