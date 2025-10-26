import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chá de Bebê - Baby Monteiro Delboni",
  description: "Você está convidado para o chá de bebê do Baby Monteiro Delboni! 👶🏻 Descubra o que você vai trazer. 16/11 às 14h no Condomínio San Filippo.",
  openGraph: {
    title: "Chá de Bebê - Baby Monteiro Delboni 👶🏻",
    description: "Você está convidado para o chá de bebê! Descubra o que você vai trazer. 16/11 às 14h.",
    url: "https://projects.wisesolutions.uk/cha-de-bebe-felipe/",
    siteName: "Chá de Bebê",
    images: [
      {
        url: "https://wisesolutions-projects.github.io/cha-de-bebe-felipe/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chá de Bebê - Baby Monteiro Delboni",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chá de Bebê - Baby Monteiro Delboni 👶🏻",
    description: "Você está convidado para o chá de bebê! Descubra o que você vai trazer. 16/11 às 14h.",
    images: ["https://wisesolutions-projects.github.io/cha-de-bebe-felipe/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
