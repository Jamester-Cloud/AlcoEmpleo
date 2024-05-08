import React from "react"
import HeaderEnterprise from "../components/Headers/HeaderEnterprise"
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
        <Spinner/>
            <HeaderEnterprise />
            {children}
            <Footer />
        </>

    )
}