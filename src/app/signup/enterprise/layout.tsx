import React from "react"
import Header from "../../components/Headers/Header"
import Footer from "../../components/Footer/footer";
import SidebarCandidate from "@/app/components/Sidebar/SidebarCandidate";
import SidebarEnterprise from "@/app/components/Sidebar/SidebarEnterprise";



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