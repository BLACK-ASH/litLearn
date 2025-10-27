import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/features/app/components/Navbar";
import Footer from "@/features/app/components/Footer";
import { Toaster } from "sonner";
import NoiseBackground from "@/components/FadeBackground";
import { Suspense } from "react";

const baloo = Baloo_2({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lit Learn",
  description: "Lit Learn - A learning platform for literature enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${baloo.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <NoiseBackground>
            <main className="py-12">{children}</main>
          </NoiseBackground>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
