import NavBar from "./components/navbar";
import "./globals.css";

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
      </body>
    </html>
  );
}
