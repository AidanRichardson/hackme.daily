import { newplayerresponse } from "@/app/types";

export async function getOrCreatePlayerId(): Promise<string | null> {
  let playerId: string | null = localStorage.getItem("playerId");

  try {
    let checkOk = false;

    if (playerId) {
      const check = await fetch(`/api/checkplayer/${playerId}`);
      if (check.status === 200) {
        checkOk = true;
      }
    }

    if (!playerId || !checkOk) {
      const res = await fetch("/api/createplayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to create player");
      }

      const data: newplayerresponse = await res.json();
      playerId = data.id;
      localStorage.setItem("playerId", playerId);
    }
  } catch (err) {
    console.error("Network error:", err);
    playerId = null;
  }

  return playerId;
}

export async function postAttempts(
  id: string | null,
  date: string,
  section: string,
  attempts: number
) {
  const res = await fetch(`/api/attempt/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: date,
      section: section + "_attempts",
      attempts: attempts,
    }),
  });
  await res.json();
}
