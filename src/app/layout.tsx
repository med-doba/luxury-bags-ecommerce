// import type React from "react";
// import { Inter } from "next/font/google";
// import { CartProvider } from "./contexts/CartContext";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import "./globals.css";
// import WhatsAppButton from "./components/WhatsAppButton";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Luxury Bags E-commerce",
//   description: "Shop for luxury bags and accessories",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className} suppressHydrationWarning>
//         <CartProvider>
//           <Header />
//           <main>{children}</main>
//           <WhatsAppButton
//             phoneNumber="+212663777275" // Replace with your actual WhatsApp number
//             message="Besoin d’un sac stylé et pratique ? 👜✨ Découvrez nos modèles tendance et de qualité sur moietoi.ma! Livraison rapide & offres spéciales. 🔥"
//           />
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { CartProvider } from "@/app/contexts/CartContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Your Luxury E-commerce Store",
    template: "%s | Your Luxury E-commerce Store",
  },
  description: "Discover our exclusive collection of luxury products.",
  keywords: ["luxury", "e-commerce", "fashion", "accessories"],
  authors: [{ name: "Your Name" }],
  creator: "Your Company",
  publisher: "Your Company",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Your Luxury E-commerce Store",
    description: "Discover our exclusive collection of luxury products.",
    url: siteUrl,
    siteName: "Your Luxury E-commerce Store",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Your Luxury E-commerce Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Luxury E-commerce Store",
    description: "Discover our exclusive collection of luxury products.",
    images: [`${siteUrl}/twitter-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
          <WhatsAppButton
            // phoneNumber="+212648513169" // Replace with your actual WhatsApp number
            // message="Bonjour, j'ai une question concernant vos sacs de luxe."
            phoneNumber="+212663777275" // Replace with your actual WhatsApp number
            message="Besoin d’un sac stylé et pratique ? 👜✨ Découvrez nos modèles tendance et de qualité sur moietoi.ma! Livraison rapide & offres spéciales. 🔥"
          />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
