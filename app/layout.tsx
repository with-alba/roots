import "./globals.css";

import { headers } from "next/headers";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { GoogleMapsAPIProvider } from "~/components/shared/maps/api-provider";
import { TRPCReactProvider } from "~/lib/trpc/react";
import { Navbar } from "./_shared/navbar";

export const metadata: Metadata = {
  title: "Roots",
  description:
    "Encontrá tu próximo hogar en Argentina. Buscá propiedades en venta y alquiler.",
  openGraph: {
    title: "Roots",
    images: "https://i.imgur.com/fMR2vxZ.png",
    description:
      "Encontrá tu próximo hogar en Argentina. Buscá propiedades en venta y alquiler.",
  },
  twitter: {
    title: "Roots",
    card: "summary_large_image",
    images: "https://i.imgur.com/fMR2vxZ.png",
    description:
      "Encontrá tu próximo hogar en Argentina. Buscá propiedades en venta y alquiler.",
  },
};

const interFont = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={interFont.className}>
        <div className="flex h-screen w-screen flex-col bg-zinc-50 px-1.5 pb-1.5 sm:px-4 sm:pb-4">
          <TRPCReactProvider headers={headers()}>
            <GoogleMapsAPIProvider>
              <Toaster />
              <Navbar />
              <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0px_3px_10px_rgba(24,_24,_27,_0.05),_0px_0px_0px_1px_rgba(24,_24,_27,_0.02)]">
                {children}
              </div>
            </GoogleMapsAPIProvider>
          </TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
