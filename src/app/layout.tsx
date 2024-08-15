import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Open vault",
  description: "Rotate to open the safe: 1, 2, 3... 💣",
  openGraph: {
    title: "Open vault",
    description: "Rotate to open the safe: 1, 2, 3... 💣",
    url: "",
    siteName: "Open vault",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "Otoniel Emanuel",
    "Animation",
    "Exploring ",
    "Frontend",
    "Open vault",
    "Framer motion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
