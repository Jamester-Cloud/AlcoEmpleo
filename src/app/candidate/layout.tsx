import React from "react"
import HeaderCandidate from "../components/Headers/headerCandidate"
import Footer from "../components/Footer/footer";
import "./css/styles.css"

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderCandidate />
            {children}
            <Footer />
        </>

    )
}