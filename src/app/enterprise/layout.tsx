import React from "react"
import CabeceraEmpresa from "../components/cabeceras/cabeceraEmpresa";
import Footer from "../components/Footer/footer";
import "./css/styles.css"
import Spinner from "../components/Spinner/Spinner";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <CabeceraEmpresa />
            <Spinner />
            {children}
            <Footer />
        </>

    )
}