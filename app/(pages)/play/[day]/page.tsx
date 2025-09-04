import Play from "@/app/components/game/play/Play"; // adjust path if needed

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
