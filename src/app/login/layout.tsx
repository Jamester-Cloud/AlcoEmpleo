import React from "react"
import Footer from "../components/Footer/footer";
import Spinner from "../components/Spinner/Spinner";
import Cabecera from "../components/cabeceras/cabecera";
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Cabecera />
            <Spinner />
            {children}
            <Footer />
        </div>

    )
}