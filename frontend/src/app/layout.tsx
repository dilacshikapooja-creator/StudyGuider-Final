import type { Metadata } from "next";
import "./globals.scss";
import Providers from "@/components/providers/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Study Guider",
  description: "AI study assistant for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}  
        </Providers>
      </body>
    </html>
  );
}