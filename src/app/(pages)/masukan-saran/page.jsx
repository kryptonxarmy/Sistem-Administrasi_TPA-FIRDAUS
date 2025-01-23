"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Trash, Trash2 } from "lucide-react";
import React from "react";

export default function Page() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedback", {
          method: "GET",
        });
        const result = await response.json();
        if (result.success) {
          setFeedbacks(result.feedbacks);
        } else {
          toast.error("Gagal mengambil data feedback: " + result.error, {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        }
      } catch (error) {
        toast.error("Terjadi kesalahan: " + error.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/feedback?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
        toast.success("Feedback berhasil dihapus!", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      } else {
        toast.error("Gagal menghapus feedback: " + result.error, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan: " + error.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold">Masukan dan Saran</h1>
      <table className="min-w-full bg-white border border-gray-300 mt-8">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b">Nama Orang Tua</th>
            <th className="py-2 px-4 border-b">Nama Anak</th>
            <th className="py-2 px-4 border-b">Kelas</th>
            <th className="py-2 px-4 border-b">Masukan dan Saran</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td className="py-2 px-4 border-b">{feedback.parent.user.name}</td>
              <td className="py-2 px-4 border-b">{feedback.parent.child.map(child => child.name).join(", ")}</td>
              <td className="py-2 px-4 border-b">{feedback.parent.child.map(child => child.class.name).join(", ")}</td>
              <td className="py-2 px-4 border-b">{feedback.content}</td>
              <td className="py-2 px-4 border-b">
                <Button className="bg-red-600 text-white" onClick={() => handleDelete(feedback.id)}>
                  <Trash2 className="text-white" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}