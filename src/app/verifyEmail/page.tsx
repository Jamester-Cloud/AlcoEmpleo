"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
export default function VerifyEmailPage(props: any) {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async (email: string = "") => {
    try {
      await axios.post("api/users/passwordRecovery", { email: email });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    //We extract the url with the token
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // useEffect(() => {
  //   if (token.length > 0) verifyUserEmail();
  // }, [token]);

  const sendData = async(data:any) => {
    console.log(console.log(data));
    try {
      await verifyUserEmail(data.email)
      toast.success('Revise su correo electronico')
    } catch (error) {
      toast.error('Ha ocurrido un error con el envio, intentelo mas tarde..')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4">Recuperacíon de contraseña</h1>
      <p>
        Ingrese su correo electronico, para enviarle un email de recuperacíon
      </p>
      {/* <h2 className="p-2 bg-info">{token ? `${token}` : "no token"}</h2> */}
      <form onSubmit={handleSubmit(sendData)}>
        <label htmlFor="email">Email de usuario</label>
        <input
          className="form-control"
          id="email"
          type="text"
          {...register("email")}
        />
        <div className="container">
          <div className="row justify-content-center mt-3">
            <button className="btn btn-primary btn-round" type="submit">
              {" "}
              Enviar
            </button>
          </div>
        </div>
      </form>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified succesfully</h2>
          <a className="text-blue-500">Login</a>
        </div>
      )}

      {error && (
        <div className="text-2xl">
          <h2 className="text-2xl bg-red">Error</h2>
        </div>
      )}
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}
