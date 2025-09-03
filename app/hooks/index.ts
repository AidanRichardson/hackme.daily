import { newplayerresponse } from "../types";

export async function getOrCreatePlayerId() {
  let playerId = localStorage.getItem("playerId");
  const check = await fetch(`/api/checkplayer/${playerId}`);
  if (!playerId || !check.ok) {
    const res = await fetch("/api/createplayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data: newplayerresponse = await res.json();
    playerId = data.id;
    localStorage.setItem("playerId", playerId);
  }
  return playerId;
}

export async function postAttempts(
  id: string,
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
