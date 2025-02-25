import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moi&Toi - Where Art Meets Functionality",
  description:
    "Discover our exquisite collection of handcrafted luxury bags, where timeless elegance meets modern design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {" "}
          {/* Add padding-top to account for fixed header */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
