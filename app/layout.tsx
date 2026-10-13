import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const heading = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thời cơ và thách thức của Việt Nam trên con đường phát triển",
  description:
    "Phân tích thời cơ, thách thức và giải pháp để Việt Nam phát triển nhanh, bền vững và giữ vững định hướng xã hội chủ nghĩa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${body.variable} ${heading.variable}`}>
      <body>{children}</body>
    </html>
  );
}
