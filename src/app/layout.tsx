import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "../components/ui/tooltip";
import { Toaster } from "sonner";
import ThemeSwitcher from "@/components/templates/ThemeSwitcher/ThemeSwitcher";
import Provider from "./providers/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grupo AG Capital",
  description: "Aplicativo interno para uso corporativo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <TooltipProvider>
            <div className="fixed bottom-3 right-3 z-50">
              <ThemeSwitcher />
            </div>
            {children}
          </TooltipProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
