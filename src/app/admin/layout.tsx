"use client";

import React, { useState } from "react";
import CabeceraCandidato from "../components/cabeceras/cabeceraCandidato";
import Footer from "../components/Footer/footer";
import Sidebar from "../components/Sidebar/SidebarAdmin";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <CabeceraCandidato toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
