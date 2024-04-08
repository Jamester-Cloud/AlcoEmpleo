"use client";
import React from "react";
import SignUpForm from "../../components/Forms/SignUp";

export default function SignUpPage() {

    const candidatoData = {
        nombres:'',
        apellidos:'',
        cedula:'',
        email:'',
        password:'',
        telefono:'',
        direccion:''
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignUpForm type="Candidatos" data={candidatoData}></SignUpForm>
        </div>
    )
}