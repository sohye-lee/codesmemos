// 'use client';
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/ui/headers/header";
import Footer from "@/components/ui/footer";
// import { IconArrowUp } from '@tabler/icons-react';
// import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pockets for Your Codes",
  description: "Developed by Sohye",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [visible, setVisible] = useState(false);
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };
  // useEffect(() => {
  //   const handleVisible = () => {
  //     window.scrollY > 300 ? setVisible(true) : setVisible(false);
  //   };

  //   window.addEventListener('scroll', handleVisible);
  //   return () => {
  //     window.removeEventListener('scroll', handleVisible);
  //   };
  // }, []);
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#0652e9"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${spaceGrotesk.className} relative min-h-screen`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          {/* 
          {visible && (
            <div
              onClick={scrollToTop}
              className=" fixed bottom-5 right-5  w-10 h-10 flex items-center justify-center z-40 transition cursor-pointer bg-gray-700 opacity-40 p-2 hover:opacity-60"
            >
              <IconArrowUp width={16} color="#fff" />
            </div>
          )} */}
        </Providers>
      </body>
    </html>
  );
}
