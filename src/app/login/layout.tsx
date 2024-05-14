import React from "react"
import Header from "@/app/components/Headers/Header";
import Footer from "../components/Footer/footer";
import Spinner from "../components/Spinner/Spinner";



export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
          <Spinner/>
            <Header />
            
            {children}
            <Footer/>
        </div>

    )
}