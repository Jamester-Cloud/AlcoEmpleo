import React from "react"
import Header from "../components/Headers/header";
import Footer from "../components/Footer/footer";
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Header />
            {children}
            <Footer/>
        </div>

    )
}