import React from "react"
import Header from "../components/Headers/header"
import Footer from "../components/Footer/footer";
import "./css/styles.css"
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>

    )
}