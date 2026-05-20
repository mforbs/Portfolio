import type { Metadata } from "next";
import { DM_Serif_Text, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";
import React from "react";

export const metadata: Metadata = {
  title: "Max Forbes | Software Developer",
  description: "My personal portfolio site",
};

const dmSerif = DM_Serif_Text({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const funkieOutline = localFont({
  src: "../../public/fonts/funkie-retro.outline.otf",
});
const funkieRegular = localFont({
  src: "../../public/fonts/funkie-retro.regular.otf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--funkie-filled-family": funkieRegular.style.fontFamily,
            "--funkie-outline-family": funkieOutline.style.fontFamily,
            "--dm-serif-family": dmSerif.style.fontFamily,
            "--montserrat-family": montserrat.style.fontFamily,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
