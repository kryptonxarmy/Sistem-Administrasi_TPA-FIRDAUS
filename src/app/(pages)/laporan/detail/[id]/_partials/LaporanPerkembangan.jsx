"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const LaporanPerkembangan = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    moralValue: "",
    motorGross: "",
    motorFine: "",
    cognitive: "",
    language: "",
    social: "",
    reflection: "",
    comments: "",
    childId: parseInt(id),
  });

  useEffect(() => {
    fetchProgressByChildId(id);
  }, [id]);

  const fetchProgressByChildId = async (childId) => {
    try {
      const res = await fetch("/api/admin/laporan/laporanPerkembangan");
      const data = await res.json();
      if (data.success) {
        const filteredProgress = data.progress.filter((item) => item.childId === parseInt(childId));
        setProgress(filteredProgress);
      } else {
        console.error("Failed to fetch progress:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/laporan/laporanPerkembangan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fetchProgressByChildId(id);
        setIsDialogOpen(false);
      } else {
        console.error("Failed to add progress:", data.message);
      }
    } catch (error) {
      console.error("Failed to add progress:", error);
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!progress || progress.length === 0) {
    return (
      <div>
        <div>No progress data found for the given child ID.</div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">Add Progress</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Progress</DialogTitle>
              <DialogDescription>Fill in the form below to add a new progress report.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 max-h-[60vh] overflow-scroll gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="moralValue">Moral Value</Label>
                  <Input id="moralValue" name="moralValue" type="text" value={formData.moralValue} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="motorGross">Motor Gross</Label>
                  <Input id="motorGross" name="motorGross" type="text" value={formData.motorGross} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="motorFine">Motor Fine</Label>
                  <Input id="motorFine" name="motorFine" type="text" value={formData.motorFine} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="cognitive">Cognitive</Label>
                  <Input id="cognitive" name="cognitive" type="text" value={formData.cognitive} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" name="language" type="text" value={formData.language} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="social">Social</Label>
                  <Input id="social" name="social" type="text" value={formData.social} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="reflection">Reflection</Label>
                  <Input id="reflection" name="reflection" type="text" value={formData.reflection} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Input id="comments" name="comments" type="text" value={formData.comments} onChange={handleInputChange} required />
                </div>
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
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Detail Page</h1>
      {progress.map((item) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`date-${item.id}`}>Date</Label>
            <Input id={`date-${item.id}`} type="text" value={new Date(item.date).toLocaleDateString()} readOnly />
          </div>
          <div>
            <Label htmlFor={`moralValue-${item.id}`}>Moral Value</Label>
            <Input id={`moralValue-${item.id}`} type="text" value={item.moralValue} readOnly />
          </div>
          <div>
            <Label htmlFor={`motorGross-${item.id}`}>Motor Gross</Label>
            <Input id={`motorGross-${item.id}`} type="text" value={item.motorGross} readOnly />
          </div>
          <div>
            <Label htmlFor={`motorFine-${item.id}`}>Motor Fine</Label>
            <Input id={`motorFine-${item.id}`} type="text" value={item.motorFine} readOnly />
          </div>
          <div>
            <Label htmlFor={`cognitive-${item.id}`}>Cognitive</Label>
            <Input id={`cognitive-${item.id}`} type="text" value={item.cognitive} readOnly />
          </div>
          <div>
            <Label htmlFor={`language-${item.id}`}>Language</Label>
            <Input id={`language-${item.id}`} type="text" value={item.language} readOnly />
          </div>
          <div>
            <Label htmlFor={`social-${item.id}`}>Social</Label>
            <Input id={`social-${item.id}`} type="text" value={item.social} readOnly />
          </div>
          <div>
            <Label htmlFor={`reflection-${item.id}`}>Reflection</Label>
            <Input id={`reflection-${item.id}`} type="text" value={item.reflection} readOnly />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor={`comments-${item.id}`}>Comments</Label>
            <Input id={`comments-${item.id}`} type="text" value={item.comments} readOnly />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaporanPerkembangan;
