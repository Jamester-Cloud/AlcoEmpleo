import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React,{ useState } from "react";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/headers/headerCandidate";
import Footer from "./components/headers/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlcoEmpleo",
  description: "Encuentra tu proximo candidato ideal!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
