"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
        return; // Hentikan eksekusi jika terjadi kesalahan
      } else {
        localStorage.setItem("token", data.token);
        toast.success("Berhasil login");
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Failed to login");
      toast.error("Failed to login");
    }
  };

  return (
    <div className="w-full text-white max-w-sm">
      <Toaster />
      <form onSubmit={handleSubmit} className="w-full text-white max-w-sm">
        {/* {error && <Toaster className="text-red-500">{error}</Toaster>} */}
        <div className="mb-4 text-white">
          <h1 className="text-4xl font-bold">Masuk</h1>
          <p>Masukkan Detail akun anda</p>
          <Label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </Label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 bg-white text-black" required />
        </div>
        <div className="mb-4 text-white relative">
          <Label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </Label>
          <Input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-white text-black"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
        </div>
        <Button type="submit" className="w-full bg-primary p-2 rounded">
          Masuk
        </Button>
        <div className="mt-6">
          <p>Belum memiliki akun ?</p>
          <Link href="/auth/register">
            <Button className="w-full bg-primary p-2 rounded">Register</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
