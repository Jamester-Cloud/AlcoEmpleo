import React from "react"
import Header from "../../components/headers/Header";
import Footer from "../../components/Footer/footer";
import Spinner from "@/app/components/Spinner/Spinner";
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Header />
            <Spinner/>
            {children}
            <Footer/>
        </div>

    )
}