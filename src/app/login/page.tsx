"use client";
import React from "react";
import LogInForm from "./loginForm/LogInForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center bg-[url('/bgLogin.png')]">
      <LogInForm />
    </div>
  );
}
