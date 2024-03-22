"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";
import LogInForm from "./loginForm/LogInForm";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <LogInForm/>
        </div>
    )
}


