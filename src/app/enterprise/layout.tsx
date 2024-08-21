"use client";
import React, { useEffect, useState } from "react";
import CabeceraEmpresa from "../components/cabeceras/cabeceraEmpresa";
import Cabecera from "../components/cabeceras/cabecera";
import Footer from "../components/Footer/footer";
import "./css/styles.css";
import Spinner from "../components/Spinner/Spinner";
import Contact from "../components/Contact/Contact";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showCabeceraEmpresa, setShowCabeceraEmpresa] = useState(false);

  useEffect(() => {
    // Verifica si existen 'idPersona' e 'idUsuario' en el LocalStorage
    const idPersona = localStorage.getItem("idPersona");
    const idUsuario = localStorage.getItem("idUsuario");

    if (idPersona && idUsuario) {
      setShowCabeceraEmpresa(true);
    } else {
      setShowCabeceraEmpresa(false);
    }
  }, []);

  return (
    <>
      {showCabeceraEmpresa ? <CabeceraEmpresa /> : <Cabecera />}
      <Spinner />
      {children}
      <Footer />
    </>
  );
}
