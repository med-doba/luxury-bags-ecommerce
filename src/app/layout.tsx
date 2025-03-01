// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Moi&Toi - Where Art Meets Functionality",
//   description:
//     "Discover our exquisite collection of handcrafted luxury bags, where timeless elegance meets modern design.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Header />
//         <main className="pt-16">
//           {" "}
//           {/* Add padding-top to account for fixed header */}
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

import type React from "react";
import { Inter } from "next/font/google";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luxury Bags E-commerce",
  description: "Shop for luxury bags and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
