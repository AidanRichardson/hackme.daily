export default function Failure({
  setSuccess,
}: {
  setSuccess: (val: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4 text-red-800 animate-pulse">
          --LOGIN FAILED--
        </h1>

        <button
          onClick={() => setSuccess("")}
          className="w-full py-2 px-4 text-2xl font-bold text-green-400 border border-green-500 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out
                   hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.8)]
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          [TRY AGAIN]
        </button>
      </div>
    </div>
  );
}
