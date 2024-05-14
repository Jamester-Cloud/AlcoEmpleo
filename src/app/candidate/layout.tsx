import React from "react"
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
            <SidebarCandidate>
                {children}
            </SidebarCandidate>
            <Footer />
        </>

    )
}