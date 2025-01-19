import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NerdPad - Share, Run, and Collaborate on Code Instantly",
  description: "Nerd Pad is your ultimate platform for sharing, running, and collaborating on code snippets effortlessly. Ideal for developers, teams, and coding enthusiasts looking to streamline their workflow.",
  icons: [
    { rel: "icon", href: "/favicon.ico" , url : "https://nerdpad.pro/favicon.ico" },
   
  ],
  openGraph: {
    title: "Nerd Pad - Share, Run, and Collaborate on Code Instantly",
    description: "Share, run, and collaborate on code snippets with ease using NerdPad. A platform built for developers and teams to quickly prototype and collaborate on code.",
    url: "https://nerdpad.pro", 
    siteName: "NerdPad",
  },
  twitter: {
    card: "summary_large_image", 
    site: "@NerdPad", 
    title: "NerdPad - Share, Run, and Collaborate on Code Instantly",
    description: "Effortlessly share and run code snippets. Collaborate with your team in real-time with Nerd Pad, designed for developers and coding enthusiasts.",
  },
  robots: "index, follow",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
        >
          <ConvexClientProvider>
            {children}
            <Analytics/>
          </ConvexClientProvider>

          <Footer />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

// https://emkc.org/api/v2/piston/runtimes
