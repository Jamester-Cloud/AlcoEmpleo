"use client";
import React from "react";
import SignUpForm from "../../components/Forms/SignUp";

export default function SignUpPage() {
    const empresaData = {
        razonSocial:'',
        rif:'',
        email:'',
        password:'',
        telefono:'',
        direccion:''
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignUpForm type="Empresas" data={empresaData}></SignUpForm>
        </div>
    )
}