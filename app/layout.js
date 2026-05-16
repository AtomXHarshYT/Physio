import "./globals.css";

import { Inter } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {

  title:
    "PhysioX | Premium Physiotherapy & Recovery",

  description:
    "Luxury physiotherapy and performance recovery platform focused on rehabilitation, mobility, strength, and athlete optimization.",

  keywords: [
    "Physiotherapy",
    "Recovery",
    "Sports Rehab",
    "Performance",
    "Mobility",
    "PhysioX",
  ],

  authors: [
    {
      name: "PhysioX",
    },
  ],

  openGraph: {

    title:
      "PhysioX | Premium Physiotherapy & Recovery",

    description:
      "Advanced physiotherapy and recovery platform for athletes and recovery-focused clients.",

    url:
      "https://yourdomain.com",

    siteName:
      "PhysioX",

    locale:
      "en_US",

    type:
      "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Added for better mobile responsiveness
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: '14px',
              maxWidth: '90vw',
            },
            mobile: {
              style: {
                fontSize: '12px',
                padding: '10px',
              },
            },
          }}
        />
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}