import React from "react"
import HeaderCandidate from "../components/headers/headerCandidate";
import SidebarCandidate from "../components/Sidebar/SidebarCandidate";
import Footer from "../components/Footer/footer";
//import "./css/styles.css"

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderCandidate />
            <SidebarCandidate>
                {children}
            </SidebarCandidate>
            <Footer />
        </>

    )
}