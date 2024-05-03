import React from "react"
import HeaderEnterprise from "../components/Headers/HeaderEnterprise"
import Footer from "../components/Footer/footer";
import "./css/styles.css"

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderEnterprise />
            {children}
            <Footer />
        </>

    )
}