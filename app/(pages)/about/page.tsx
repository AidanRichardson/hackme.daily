"use client";

import Link from "next/link";
import { FaBookOpen, FaBug, FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-green-400">
      <main className="relative z-10 flex flex-col items-center justify-center gap-8 p-4">
        <div className="w-full max-w-xl sm:max-w-4xl p-6 sm:p-8 bg-black bg-opacity-70 rounded-2xl border border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.4)] space-y-8 text-center">
          <h1 className="hidden sm:block sm:text-4xl font-bold animate-pulse tracking-widest">
            -- ABOUT HACKME.DAILY --
          </h1>
          <h1 className="text-4xl sm:hidden font-bold animate-pulse tracking-widest">
            -- ABOUT --
          </h1>

          <section className="space-y-4 text-left">
            <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
              <FaBookOpen className="text-green-400" />
              About the Game
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              HackMe.Daily is an{" "}
              <span className="font-semibold text-green-300">
                interactive daily web game
              </span>{" "}
              designed to challenge your{" "}
              <span className="font-semibold">general knowledge</span> and{" "}
              <span className="font-semibold">problem-solving skills</span>.
              <br />
              <br />
              Each day, a new target becomes available. Use the hints and
              information provided to solve challenges.
            </p>

            <Link
              href="https://github.com/AidanRichardson/hackme.daily"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-xl bg-green-500/20 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition font-bold"
            >
              <FaGithub className="text-xl" />
              Source Code on GitHub
            </Link>
          </section>

          <section className="space-y-4 text-left">
            <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
              <FaBug className="text-green-400" />
              Issues & Feature Requests
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              Found a bug or have an idea for improvement? Contribute by
              reporting issues or suggesting features.
            </p>

            <Link
              href="https://github.com/AidanRichardson/hackme.daily/issues"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-xl bg-green-500/20 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition font-bold"
            >
              <FaBug className="text-xl" />
              Report Issues / Request Features
            </Link>
          </section>

          <section className="space-y-4 text-left">
            <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
              <FaGithub className="text-green-400" />
              My Links
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              Check out more of my work and repositories on GitHub.
            </p>
            <div className="flex gap-2">
              <Link
                href="https://github.com/AidanRichardson"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-xl bg-green-500/20 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition font-bold"
              >
                <FaGithub className="text-xl" />
                My GitHub
              </Link>
              <Link
                href="https://buymeacoffee.com/aidanrichardson"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-xl bg-green-500/20 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition font-bold"
              >
                <SiBuymeacoffee className="text-xl" />
                Support Me
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
