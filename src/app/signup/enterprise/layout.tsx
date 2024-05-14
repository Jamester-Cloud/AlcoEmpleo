import React from "react"
import Footer from "../../components/Footer/footer";
import Spinner from "@/app/components/Spinner/Spinner";
import HeaderTest from "@/app/components/Headers/headerTest";
export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Spinner/>
            {children}
            <Footer/>
        </div>

    )
}