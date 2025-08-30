"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaBars,
  FaCalendarDay,
  FaFolderOpen,
  FaHome,
  FaTimes,
} from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition ${
      pathname === path
        ? "bg-green-500 text-black font-bold"
        : "text-green-400 hover:bg-green-500 hover:text-black"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-400 tracking-widest">
          HACKME.DAILY
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className={linkClasses("/")}>
            <FaHome /> Home
          </Link>
          <Link href="/play/today" className={linkClasses("/play/today")}>
            <FaCalendarDay /> Today
          </Link>
          <Link href="/archive" className={linkClasses("/archive")}>
            <FaFolderOpen /> Archive
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-green-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black border-t border-green-500/50 py-4">
          <Link
            href="/"
            className={linkClasses("/")}
            onClick={() => setMenuOpen(false)}
          >
            <FaHome /> Home
          </Link>
          <Link
            href="/play/today"
            className={linkClasses("/play/today")}
            onClick={() => setMenuOpen(false)}
          >
            <FaCalendarDay /> Today
          </Link>
          <Link
            href="/archive"
            className={linkClasses("/archive")}
            onClick={() => setMenuOpen(false)}
          >
            <FaFolderOpen /> Archive
          </Link>
        </div>
      )}
    </nav>
  );
}
