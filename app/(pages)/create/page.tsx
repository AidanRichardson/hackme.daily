"use client";

import { useState } from "react";
import CreateForm from "../../components/create/createform";

export default function Page() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("Invalid password");

      await res.json();
      setIsAuthed(true);
    } catch (err) {
      alert("Access denied: " + err);
    }
  };

  if (!isAuthed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <form
          onSubmit={handleLogin}
          className="p-6 bg-black shadow-md rounded space-y-4"
        >
          <h2 className="text-xl font-bold">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border rounded p-2 w-full"
          />
          <button type="submit"></button>
        </form>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <CreateForm />
    </main>
  );
}
