import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ModalKegiatan({ isOpen, onClose, isEdit, editData, handleInputChange, handleSave }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Kegiatan" : "Tambah Kegiatan"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <select name="day" value={editData.day} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
            <option value="">Pilih Hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
          </select>
          <input type="text" name="title" value={editData.title} onChange={handleInputChange} placeholder="Aktivitas" className="border border-gray-300 rounded-md p-2" />
          <input type="text" name="description" value={editData.description} onChange={handleInputChange} placeholder="Deskripsi" className="border border-gray-300 rounded-md p-2" />
          <select name="completed" value={editData.completed ? "true" : "false"} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
            <option value="false">Belum</option>
            <option value="true">Selesai</option>
          </select>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>{isEdit ? "Simpan Perubahan" : "Tambah Kegiatan"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}