import React from "react"
import CabeceraEmpresa from "../components/cabeceras/cabeceraEmpresa";
import Footer from "../components/Footer/footer";
import "./css/styles.css"
import Spinner from "../components/Spinner/Spinner";
import Contact from "../components/Contact/Contact";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Spinner />
            {children}
            <Contact />
            <Footer />
        </>

    )
}