import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { IconArrowUp } from "@tabler/icons-react";

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
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} relative`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <div className=" fixed bottom-5 right-5  w-10 h-10 flex items-center justify-center z-100 transition cursor-pointer bg-gray-700 opacity-40 p-2 hover:opacity-60">
            <IconArrowUp width={16} color="#fff" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
