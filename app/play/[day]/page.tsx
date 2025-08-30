import Play from "./play"; // adjust path if needed

export default function PlayWrapper({ params }: { params: { day: string } }) {
  const { day } = params;

  return (
    <Play
      date={day === "today" ? new Date().toISOString().split("T")[0] : day}
    />
  );
}
