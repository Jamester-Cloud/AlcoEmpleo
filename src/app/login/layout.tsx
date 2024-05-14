import React from "react"
import Footer from "../components/Footer/footer";
import Spinner from "../components/Spinner/Spinner";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            
            <Spinner />
            {children}
            <Footer />
        </div>

    )
}