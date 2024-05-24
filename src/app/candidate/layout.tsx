import React from "react"
import SidebarCandidate from "../components/Sidebar/SidebarCandidate";
import CabeceraCandidato from "../components/cabeceras/cabeceraCandidato";
import Footer from "../components/Footer/footer";
//import "./css/styles.css"

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <CabeceraCandidato />
            <SidebarCandidate>
                {children}
            </SidebarCandidate>
            <Footer />
        </>

    )
}
export const dynamic = 'force-dynamic'