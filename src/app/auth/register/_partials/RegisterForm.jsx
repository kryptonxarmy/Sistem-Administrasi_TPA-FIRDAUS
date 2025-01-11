"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";
import Link from "next/link";
import { toast } from "sonner";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, role: "PARENT" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success("Berhasil register");
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
      setError("Failed to register");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-white max-w-sm">
      <Toaster />
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div className="mb-4 text-white">
        <h1 className="text-4xl font-bold">Daftar</h1>
        <p>Masukkan Detail akun anda</p>
        <Label className="block text-sm font-bold mb-2" htmlFor="name">
          Nama
        </Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-white mb-4 text-black" required />
      </div>
      <div className="mb-4 text-white">
        <Label className="block text-sm font-bold mb-2" htmlFor="email">
          Email
        </Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 bg-white text-black" required />
      </div>
      <div className="mb-4 text-white">
        <Label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </Label>
        <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 bg-white text-black" required />
      </div>
      <Button type="submit" className="w-full bg-primary p-2 rounded">
        Daftar
      </Button>
      <div className="mt-6">
        <p>Sudah Punya Akun ?</p>
        <Link href="/auth/login">
          <Button className="w-full bg-primary p-2 rounded">Login</Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
