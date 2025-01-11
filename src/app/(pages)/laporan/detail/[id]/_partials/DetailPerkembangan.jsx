'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import SubKategoriPerkembangan from './SubKategoriPerkembangan';
import { useParams } from 'next/navigation';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function DetailPerkembangan() {
  const { id } = useParams();
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [progressDetails, setProgressDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    subDetails: [{ subCategory: "", status: "" }],
  });

  useEffect(() => {
    fetchSubCategories();
  }, [id]);

  const fetchSubCategories = async () => {
    try {
      const res = await fetch(`/api/admin/laporan/detailPerkembangan`);
      const data = await res.json();
      if (data.success) {
        const filteredProgressDetails = data.progressDetails.filter(detail => detail.progress.childId === parseInt(id));
        setProgressDetails(filteredProgressDetails);
      } else {
        console.error('Failed to fetch progress details:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch progress details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("subCategory") || name.startsWith("status")) {
      const subDetails = [...formData.subDetails];
      subDetails[index][name] = value;
      setFormData({ ...formData, subDetails });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSubDetail = () => {
    setFormData({
      ...formData,
      subDetails: [...formData.subDetails, { subCategory: "", status: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/laporan/detailPerkembangan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, progressId: parseInt(id) }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSubCategories();
        setIsDialogOpen(false);
      } else {
        console.error('Failed to add progress detail:', data.message);
      }
    } catch (error) {
      console.error('Failed to add progress detail:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!progressDetails || progressDetails.length === 0) {
    return (
      <div>
        <div>No progress details found for the given child ID.</div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">Add Progress Detail</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Progress Detail</DialogTitle>
              <DialogDescription>Fill in the form below to add a new progress detail.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kepekaan Panca Indra">Kepekaan Panca Indra</SelectItem>
                      <SelectItem value="Motorik Kasar">Motorik Kasar</SelectItem>
                      <SelectItem value="Motorik Halus">Motorik Halus</SelectItem>
                      <SelectItem value="Kemampuan Berkomunikasi">Kemampuan Berkomunikasi</SelectItem>
                      <SelectItem value="Reaksi Emosi dan Interaksi Sosial">Reaksi Emosi dan Interaksi Sosial</SelectItem>
                      <SelectItem value="Kemampuan Kognitif">Kemampuan Kognitif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.subDetails.map((subDetail, index) => (
                  <div key={index} className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor={`subCategory-${index}`}>Sub Category</Label>
                      <Input id={`subCategory-${index}`} name="subCategory" type="text" value={subDetail.subCategory} onChange={(e) => handleInputChange(e, index)} required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold text-lg" htmlFor={`status-${index}`}>Status</Label>
                      <Select name="status" value={subDetail.status} onValueChange={(value) => handleInputChange({ target: { name: "status", value } }, index)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Belum Berkembang">Belum Berkembang</SelectItem>
                          <SelectItem value="Sedang Berkembang">Sedang Berkembang</SelectItem>
                          <SelectItem value="Berkembang Baik">Berkembang Baik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={handleAddSubDetail} className="mt-2">Add Sub Detail</Button>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 flex flex-col gap-6">
        <h1 className="text-xl font-bold">Detail Perkembangan</h1>
        {progressDetails && progressDetails.length > 0 ? (
          progressDetails.map((item) => (
            <div key={item.id} className="flex justify-between items-center w-full">
              <h1 className="text-bold text-xl">{item.category}</h1>
              <Button onClick={() => setSelectedDetail(item)} className="bg-primary text-white px-6 rounded-xl">
                Lihat Detail
              </Button>
            </div>
          ))
        ) : (
          <p>No details available</p>
        )}
      </div>
      {selectedDetail && <SubKategoriPerkembangan detail={selectedDetail} />}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Progress Detail</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Progress Detail</DialogTitle>
            <DialogDescription>Fill in the form below to add a new progress detail.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kepekaan Panca Indra">Kepekaan Panca Indra</SelectItem>
                    <SelectItem value="Motorik Kasar">Motorik Kasar</SelectItem>
                    <SelectItem value="Motorik Halus">Motorik Halus</SelectItem>
                    <SelectItem value="Kemampuan Berkomunikasi">Kemampuan Berkomunikasi</SelectItem>
                    <SelectItem value="Reaksi Emosi dan Interaksi Sosial">Reaksi Emosi dan Interaksi Sosial</SelectItem>
                    <SelectItem value="Kemampuan Kognitif">Kemampuan Kognitif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.subDetails.map((subDetail, index) => (
                <div key={index} className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor={`subCategory-${index}`}>Sub Category</Label>
                    <Input id={`subCategory-${index}`} name="subCategory" type="text" value={subDetail.subCategory} onChange={(e) => handleInputChange(e, index)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold text-lg" htmlFor={`status-${index}`}>Status</Label>
                    <Select name="status" value={subDetail.status} onValueChange={(value) => handleInputChange({ target: { name: "status", value } }, index)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Belum Berkembang">Belum Berkembang</SelectItem>
                        <SelectItem value="Sedang Berkembang">Sedang Berkembang</SelectItem>
                        <SelectItem value="Berkembang Baik">Berkembang Baik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              <Button type="button" onClick={handleAddSubDetail} className="mt-2">Add Sub Detail</Button>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}