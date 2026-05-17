import "./globals.css";

import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">

      <body className={`${inter.className} overflow-x-hidden`}>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "14px",
              maxWidth: "90vw",
            },
          }}
        />

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>

    </html>
  );
}