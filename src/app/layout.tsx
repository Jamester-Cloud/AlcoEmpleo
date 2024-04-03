import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css';
// import Header from "./components/headers/headerCandidate";
import Footer from "./components/Footer/footer";

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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="  crossOrigin="anonymous" />
      <body className={inter.className}>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
