interface ProgressCardProps {
  unlockedShards: number;
  totalShards: number;
}

export function ProgressCard({
  unlockedShards,
  totalShards,
}: ProgressCardProps) {
  return (
    <div className="text-center text-white absolute top-40 left-0 right-0 z-50 pointer-events-none">
      <h3
        className="font-bold text-shadow"
        style={{ textShadow: "0 0 6px rgba(0, 0, 0, 0.5)" }}
      >
        Pick a Shard to Explore
      </h3>
      <h2
        className="text-2xl font-bold text-shadow"
        style={{ textShadow: "0 0 6px rgba(0, 0, 0, 0.5)" }}
      >
        Level 1
      </h2>
      <p
        className="text-3xl font-bold text-shadow"
        style={{ textShadow: "0 0 6px rgba(0, 0, 0, 0.5)" }}
      >
        {unlockedShards} / {totalShards}
      </p>
    </div>
  );
}
