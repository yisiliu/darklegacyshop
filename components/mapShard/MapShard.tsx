import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Lock } from "lucide-react";
import Image from "next/image";

interface MapShardProps {
  index: number;
  isUnlocked: boolean;
  onClick: () => void;
}

export function MapShard({ index, isUnlocked, onClick }: MapShardProps) {
  return (
    <Card
      className={`bg-gray-800 border-2 ${
        isUnlocked ? "border-amber-500" : "border-gray-700"
      } cursor-pointer transition-all duration-300 hover:scale-105`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden">
          <Image
            src={`/placeholder.svg?text=Shard ${index + 1}&width=200&height=200`}
            alt={`Map Shard ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={isUnlocked ? "filter-none" : "filter blur-sm"}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isUnlocked ? (
              <MapPin className="h-12 w-12 text-red-500 animate-pulse" />
            ) : (
              <Lock className="h-12 w-12 text-gray-500" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
