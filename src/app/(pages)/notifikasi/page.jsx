"use client";

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";
import useUser from "@/hooks/useUser";

export default function Notifikasi() {
  const { user, role } = useUser(); // Menggunakan hook untuk mendapatkan informasi pengguna
  const [messages, setMessages] = useState([]);
  const [replyData, setReplyData] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSendForm, setShowSendForm] = useState(false);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMessages();
      if (role === "ADMIN") {
        fetchParents();
      }
    }
  }, [user, role]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/notifikasi");
      const data = await res.json();
      if (data.success) {
        // Filter pesan berdasarkan ID pengguna sebagai penerima
        const filteredMessages = data.messages.filter((msg) => msg.receiverId === user.id);
        setMessages(filteredMessages);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParents = async () => {
    try {
      const res = await fetch("/api/parent");
      const data = await res.json();
      if (data.success) {
        setParents(data.parents);
      } else {
        console.error("Failed to fetch parents:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch parents:", error);
    }
  };

  const handleReply = (data) => {
    setReplyData(data);
    setShowReplyForm(true);
  };

  const handleSend = () => {
    setShowSendForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/notifikasi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        fetchMessages(); // Refresh data after save
        setShowReplyForm(false);
        setShowSendForm(false);
      } else {
        console.error("Failed to save message data:", data.message);
      }
    } catch (error) {
      console.error("Failed to save message data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notifikasi`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchMessages(); // Refresh data after delete
      } else {
        console.error("Failed to delete message data:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete message data:", error);
    }
  };

  const handleKembali = () => {
    setShowReplyForm(false);
    setShowSendForm(false);
  };

  return (
    <div className="p-6">
      <Dialog open={showReplyForm} onOpenChange={setShowReplyForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Balas Pesan</DialogTitle>
          </DialogHeader>
          <SendForm onSubmit={handleFormSubmit} initialData={replyData} user={user} parents={parents} role={role} />
          <DialogFooter>
            <Button onClick={handleKembali} className="btn btn-secondary">
              Kembali
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showSendForm} onOpenChange={setShowSendForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kirim Pesan</DialogTitle>
          </DialogHeader>
          <SendForm onSubmit={handleFormSubmit} user={user} parents={parents} role={role} />
          <DialogFooter>
            <Button onClick={handleKembali} className="btn btn-secondary">
              Kembali
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-lg font-bold text-primary mb-4 mt-8">Pesan</h1>
      <Button onClick={handleSend} className="btn btn-primary mb-4">
        Kirim Pesan
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Nama Pengirim</TableHead>
            <TableHead className="text-center">Pesan</TableHead>
            <TableHead className="text-center">Waktu</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((msg) => (
            <TableRow key={msg.id}>
              <TableCell className="text-center">{format(parseISO(msg.date), "dd/MM/yyyy")}</TableCell>
              <TableCell className="text-center">{msg.sender.name}</TableCell>
              <TableCell className="text-center">{msg.content}</TableCell>
              <TableCell className="text-center">{format(parseISO(msg.date), "HH:mm")}</TableCell>
              <TableCell className="text-center">
                <Button onClick={() => handleReply(msg)} className="bg-primary text-white font-semibold rounded-xl px-4">
                  Balas
                </Button>
                <Button onClick={() => handleDelete(msg.id)} className="bg-red-500 text-white font-semibold rounded-xl px-4 ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SendForm({ onSubmit, initialData, parents, role, user }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10),
    content: "",
    senderId: role === "PARENT" ? user.id : 1, // ID admin jika role adalah ADMIN
    receiverId: role === "PARENT" ? 1 : "", // ID admin jika role adalah parent
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: new Date().toISOString().substring(0, 10),
        content: "",
        senderId: user.id,
        receiverId: initialData.senderId,
      });
    }
  }, [initialData, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      receiverId: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.receiverId) {
      console.error("Receiver ID is required");
      return;
    }
    onSubmit(formData);
    setFormData({
      date: new Date().toISOString().substring(0, 10),
      content: "",
      senderId: role === "PARENT" ? user.id : 1, // ID admin jika role adalah ADMIN
      receiverId: role === "PARENT" ? 1 : "", // ID admin jika role adalah parent
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border-2 border-primary rounded-xl">
      {role === "ADMIN" && (
        <>
          <label className="font-semibold">Pilih Orang Tua</label>
          <select value={formData.receiverId} onChange={(e) => handleSelectChange(e.target.value)} className="w-full border-2 border-primary rounded-xl h-10">
            <option value="" disabled>
              Pilih Orang Tua
            </option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.userId.toString()}>
                {parent.user.name}
              </option>
            ))}
          </select>
        </>
      )}

      <label className="font-semibold">Pesan</label>
      <Input type="text" name="content" value={formData.content} onChange={handleChange} placeholder="Pesan" className="border-2 border-primary rounded-xl" />

      <Button type="submit" className="bg-primary text-white font-semibold rounded-xl px-4">
        {initialData ? "Balas" : "Kirim"}
      </Button>
    </form>
  );
}