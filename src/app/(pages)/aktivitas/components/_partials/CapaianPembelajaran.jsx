import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CapaianPembelajaran({ data }) {
  const [loading, setLoading] = useState(false);
  const [learningGoals, setLearningGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ name: "", description: "" });
  const [editGoal, setEditGoal] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log("capaian pembelajaran : ", data);
    fetchLearningGoals();
  }, [data]);

  const fetchLearningGoals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/learningModule/learningGoals?moduleId=${data.id}`);
      const result = await res.json();
      if (result.success) {
        setLearningGoals(result.learningGoals);
      } else {
        console.error("Failed to fetch learning goals:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch learning goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/learningModule/learningGoals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newGoal, moduleId: data.id }),
      });
      const result = await res.json();
      if (result.success) {
        setLearningGoals([...learningGoals, result.learningGoal]);
        setNewGoal({ name: "", description: "" });
        setIsDialogOpen(false);
      } else {
        console.error("Failed to add learning goal:", result.error);
      }
    } catch (error) {
      console.error("Failed to add learning goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGoal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/learningModule/learningGoals`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editGoal, moduleId: data.id }),
      });
      const result = await res.json();
      if (result.success) {
        setLearningGoals(
          learningGoals.map((goal) =>
            goal.id === editGoal.id ? result.learningGoal : goal
          )
        );
        setEditGoal(null);
      } else {
        console.error("Failed to update learning goal:", result.error);
      }
    } catch (error) {
      console.error("Failed to update learning goal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold my-6">Capaian Pembelajaran</h1>
      {loading && <div className="loader"></div>}
      {learningGoals.length === 0 && !loading && <p>Belum ada capaian pembelajaran</p>}
      <div className="flex w-full flex-col gap-8">
        {learningGoals.map((goal) => (
          <div key={goal.id} className="bg-[#E2D4F780] w-full p-6 rounded-xl shadow-xl">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-xl font-semibold text-primary">Capaian Pembelajaran : {goal.name}</h1>
              <button className="bg-primary text-white p-2 rounded mt-2" onClick={() => setEditGoal(goal)}>Edit</button>
            </div>
            <p className="mt-4">{goal.description}</p>
          </div>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary text-white p-2 rounded mt-6">Tambah Capaian Pembelajaran</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Capaian Pembelajaran</DialogTitle>
            <DialogDescription>Masukkan nama dan deskripsi capaian pembelajaran baru.</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Nama"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <textarea
              placeholder="Deskripsi"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="p-2 border rounded mt-2 w-full"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddGoal} className="bg-primary text-white p-2 rounded mt-2">
              Tambah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {editGoal && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Edit Capaian Pembelajaran</h2>
          <Input
            type="text"
            placeholder="Nama"
            value={editGoal.name}
            onChange={(e) => setEditGoal({ ...editGoal, name: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <textarea
            placeholder="Deskripsi"
            value={editGoal.description}
            onChange={(e) => setEditGoal({ ...editGoal, description: e.target.value })}
            className="p-2 border rounded mt-2 w-full"
          />
          <Button onClick={handleEditGoal} className="bg-primary text-white p-2 rounded mt-2">
            Update
          </Button>
        </div>
      )}
    </div>
  );
}