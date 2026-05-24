import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { CompareBar } from "@/components/compare-bar";
import { CompareProvider } from "@/lib/use-compare";
import { FavoritesProvider } from "@/lib/use-favorites";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Прайм Прайс — честные цены на автомобили",
  description: "Каталог автомобилей с прозрачными ценами. Сумма в карточке = сумма в кассе. Без «уточняйте в салоне».",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <FavoritesProvider>
            <CompareProvider>
              {children}
              <CompareBar />
            </CompareProvider>
          </FavoritesProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
