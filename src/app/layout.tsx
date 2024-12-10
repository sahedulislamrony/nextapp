import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className=" bg-slate-200 text-gray-950 dark:bg-gray-950 dark:text-slate-100 flex justify-center items-start">
        <main className="w-full">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
