"use client";

import { FormEvent, useEffect, useState } from "react";
import { GameData } from "../types";

export default function CreateForm() {
  const [formData, setFormData] = useState<GameData>({
    Date: "",
    Target: "",
    Info: "",
    Username: "",
    PasswordHint: "",
    Password: "",
    SecurityQ: "",
    SecurityQAnswer: "",
    TwoFACode: "",
  });

  const fetchData = async (date: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/games/${date}`
      );
      const gameData: GameData = await res.json();
      if (res.ok) {
        setFormData(gameData);
      }
    } catch (err) {
      console.error("Failed to fetch game data:", err);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    fetchData(value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, Date: date }));

    fetchData(date);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    await res.json();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <div>
        <label
          htmlFor="Date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          name="Date"
          id="Date"
          value={formData.Date}
          onChange={handleDateChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="Target"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Target
        </label>
        <input
          type="text"
          name="Target"
          id="Target"
          value={formData.Target}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="Info"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Info
        </label>
        <textarea
          name="Info"
          id="Info"
          value={formData.Info}
          onChange={handleChange}
          rows={2}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="Username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          name="Username"
          id="Username"
          value={formData.Username}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="Password Hint"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password Hint
        </label>
        <input
          type="text"
          name="PasswordHint"
          id="PasswordHint"
          value={formData.PasswordHint}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="text"
          name="Password"
          id="Password"
          value={formData.Password}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="Security Question"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Security Question
        </label>
        <input
          type="text"
          name="SecurityQ"
          id="SecurityQ"
          value={formData.SecurityQ}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="Security Question Answer"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Security Question Answer
        </label>
        <input
          type="text"
          name="SecurityQAnswer"
          id="SecurityQAnswer"
          value={formData.SecurityQAnswer}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="2FA Code"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          2FA Code
        </label>
        <input
          type="text"
          name="TwoFACode"
          id="TwoFACode"
          value={formData.TwoFACode}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-xl shadow hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
}
