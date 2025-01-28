import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "Marcaê",
  description: "Landing Page template using NextJs 14, NextUI, TailwindCSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <link rel="icon" href="/favicon.ico" />
         <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
      </head>
      <body
       
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
