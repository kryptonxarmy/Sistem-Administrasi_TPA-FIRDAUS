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
  const [semesters, setSemesters] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
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
    semesterId: "",
    academicYearId: "",
  });

  useEffect(() => {
    fetchProgressByChildId(id);
    fetchSemesters();
    fetchAcademicYears();
  }, [id]);

  const fetchProgressByChildId = async (childId) => {
    try {
      const res = await fetch(`/api/admin/laporan/laporanPerkembangan?childId=${childId}`);
      const data = await res.json();
      if (data.success) {
        setProgress(data.progress);
      } else {
        console.error("Failed to fetch progress:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await fetch("/api/semester");
      const data = await response.json();
      if (data.success) {
        setSemesters(data.semesters);
      }
    } catch (error) {
      console.error("Failed to fetch semesters:", error);
    }
  };

  const fetchAcademicYears = async () => {
    try {
      const response = await fetch("/api/academicYear");
      const data = await response.json();
      if (data.success) {
        setAcademicYears(data.academicYears);
      }
    } catch (error) {
      console.error("Failed to fetch academic years:", error);
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
        body: JSON.stringify({
          ...formData,
          semesterId: selectedSemester,
          academicYearId: selectedAcademicYear,
        }),
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/laporan/laporanPerkembangan", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          semesterId: selectedSemester,
          academicYearId: selectedAcademicYear,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProgressByChildId(id);
        setIsDialogOpen(false);
      } else {
        console.error("Failed to update progress:", data.message);
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleDelete = async (progressId) => {
    try {
      const res = await fetch("/api/admin/laporan/laporanPerkembangan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: progressId }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProgressByChildId(id);
      } else {
        console.error("Failed to delete progress:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete progress:", error);
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
                <div>
                  <Label htmlFor="semesterId">Semester</Label>
                  <select id="semesterId" name="semesterId" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="border border-gray-300 rounded-md p-2" required>
                    <option value="">Pilih Semester</option>
                    {semesters.map((semester) => (
                      <option key={semester.id} value={semester.id}>
                        Semester {semester.number}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="academicYearId">Tahun Ajar</Label>
                  <select id="academicYearId" name="academicYearId" value={selectedAcademicYear} onChange={(e) => setSelectedAcademicYear(e.target.value)} className="border border-gray-300 rounded-md p-2" required>
                    <option value="">Pilih Tahun Ajar</option>
                    {academicYears.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.year}
                      </option>
                    ))}
                  </select>
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
      <div>
      <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Child Information</h2>
      <table className="w-full mt-4">
          <tbody>
            <tr>
              <td className="font-medium">Name</td>
              <td className="font-bold">{progress[0]?.child.name || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-medium">Student ID</td>
              <td className="font-bold">{progress[0]?.child.studentId || "N/A"}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
      </div>
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
          <div className="md:col-span-2 flex justify-end gap-4">
            <Button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white">Delete</Button>
            <Button onClick={() => {
              setFormData({
                id: item.id,
                date: item.date,
                moralValue: item.moralValue,
                motorGross: item.motorGross,
                motorFine: item.motorFine,
                cognitive: item.cognitive,
                language: item.language,
                social: item.social,
                reflection: item.reflection,
                comments: item.comments,
                childId: item.childId,
                semesterId: item.semesterId,
                academicYearId: item.academicYearId,
              });
              setSelectedSemester(item.semesterId);
              setSelectedAcademicYear(item.academicYearId);
              setIsDialogOpen(true);
            }} className="bg-primary text-white">Edit</Button>
          </div>
        </div>
      ))}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Progress</DialogTitle>
            <DialogDescription>Update the form below to edit the progress report.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
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
              <div>
                <Label htmlFor="semesterId">Semester</Label>
                <select id="semesterId" name="semesterId" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="border border-gray-300 rounded-md p-2" required>
                  <option value="">Pilih Semester</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      Semester {semester.number}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="academicYearId">Tahun Ajar</Label>
                <select id="academicYearId" name="academicYearId" value={selectedAcademicYear} onChange={(e) => setSelectedAcademicYear(e.target.value)} className="border border-gray-300 rounded-md p-2" required>
                  <option value="">Pilih Tahun Ajar</option>
                  {academicYears.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LaporanPerkembangan;