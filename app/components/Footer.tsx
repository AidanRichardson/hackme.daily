import Link from "next/link";
import { FaInfoCircle, FaRegCopyright } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";
import { SiBuymeacoffee } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-green-500/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4 text-gray-300">
        {/* Left side - branding / copyright */}
        <div className="mb-2 md:mb-0 flex items-center gap-1 text-sm text-gray-400">
          <FaRegCopyright className="text-xs" />
          <span>{new Date().getFullYear()} HackMe Daily</span>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/AidanRichardson"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300"
          >
            <GrGithub className="text-2xl" />
          </a>
          <Link
            href="/about"
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300"
          >
            <FaInfoCircle className="text-2xl" />
          </Link>
          <a
            href="https://buymeacoffee.com/aidanrichardson"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300"
          >
            <SiBuymeacoffee className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
