import Play from "../../../components/game/play"; // adjust path if needed

export default async function Page({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;

  return (
    <Play
      date={day === "today" ? new Date().toISOString().split("T")[0] : day}
    />
  );
}
