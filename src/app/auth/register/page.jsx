import React from "react";
import RegisterForm from "./_partials/RegisterForm";

export default function Page() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col bg-black justify-center items-center w-1/2 p-8">
        <RegisterForm />
      </div>
      <div className="flex justify-center flex-col items-center w-1/2 text-white bg-primary">
        <div>
          <h1 className="text-6xl">Selamat Datang</h1>
          <h3 className="text-2xl font-light">Di LearnWithFirdaus.com</h3>
          <p>Daftar untuk mengakses akun anda</p>
        </div>
        <img src="/assets/auth/loginImage.svg" alt="Welcome" className="max-w-full h-1/2" />
      </div>
    </div>
  );
}