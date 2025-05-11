import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono"; // Removed as it caused an error and is not explicitly used
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "N.Y_GROUP_PVL - Ваш партнер по организации мероприятий",
  description: "N.Y_GROUP_PVL - Планирование и организация мероприятий.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${GeistSans.variable}`}>
      <body className="antialiased flex flex-col min-h-screen font-sans">
        <AuthProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
