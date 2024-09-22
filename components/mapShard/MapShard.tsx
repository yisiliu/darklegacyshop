import { MapPin, Lock } from "lucide-react";

interface MapShardProps {
  index: number;
  isUnlocked: boolean;
  onClick: () => void;
}

export function MapShard({ index, isUnlocked, onClick }: MapShardProps) {
  return (
    <div
      className={`cursor-pointer transition-all duration-300 relative`}
      onClick={onClick}
    >
      <div className={`w-full h-full flex items-center justify-center`}>
        <div
          className={`absolute inset-0 bg-gradient-radial from-gray-600/80 via-gray-700/60 to-transparent backdrop-blur-[8px] transition-opacity duration-500 ${
            isUnlocked ? "opacity-0" : "opacity-100"
          }`}
        />
        {isUnlocked ? (
          <MapPin className="h-12 w-12 text-pink-500 animate-pulse z-10" />
        ) : (
          <Lock className="h-12 w-12 text-gray-300 z-10" />
        )}
      </div>
    </div>
  );
}
