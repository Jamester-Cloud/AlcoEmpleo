import React from "react"
import Footer from "../../components/Footer/footer";
import Spinner from "@/app/components/Spinner/Spinner";
import Cabecera from "@/app/components/cabeceras/cabecera";
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