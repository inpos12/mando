"use client";

import "./globals.css";

import StyledComponentsRegistry from "./lib/registry";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/app/Components/common/header"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Components/common/footer"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav>
          <Header />
        </nav>

        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
