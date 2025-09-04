import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/navbar";

import "./globals.css";

export const metadata = {
  title: "HackMe.Daily",
  description: "An interactive daily web game",
  icons: {
    icon: "../public/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono">
        <NavBar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
