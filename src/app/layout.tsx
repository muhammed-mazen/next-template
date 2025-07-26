import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "@/components/ui/toaster"

const inter = Rubik({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Chat review",
  description: "Chat review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} dir="rtl">
        <NextUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextUIProvider>
        <Toaster />
      </body>
    </html>
  );
}
