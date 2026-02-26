import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "XGit - GitHub Portfolio Builder",
  description:
    "Create stunning developer portfolios from your GitHub profile. Login with GitHub, customize your portfolio, and showcase your work to the world.",
  keywords: ["github", "portfolio", "developer", "showcase", "projects"],
  authors: [{ name: "XGit" }],
  openGraph: {
    title: "XGit - GitHub Portfolio Builder",
    description:
      "Create stunning developer portfolios from your GitHub profile.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
