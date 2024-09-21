"use client";

import { useState } from "react";
import { ProgressCard } from "@/components/mapShard/ProgressCard";
import { MapShard } from "@/components/mapShard/MapShard";
import { CongratsCard } from "@/components/mapShard/CongratsCard";

const totalShards = 6;

export function MapShardSelection() {
  const [unlockedShards, setUnlockedShards] = useState<number[]>([]);

  const handleShardClick = (index: number) => {
    if (!unlockedShards.includes(index)) {
      setUnlockedShards([...unlockedShards, index]);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[url('/images/map1.png')] bg-cover">
      <div className="flex-shrink-0">
        <ProgressCard
          unlockedShards={unlockedShards.length}
          totalShards={totalShards}
        />
      </div>

      <div className="flex-grow overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 h-full">
          {[...Array(totalShards)].map((_, index) => (
            <MapShard
              key={index}
              index={index}
              isUnlocked={unlockedShards.includes(index)}
              onClick={() => handleShardClick(index)}
            />
          ))}
        </div>
      </div>

      {unlockedShards.length === totalShards && (
        <div className="flex-shrink-0">
          <CongratsCard />
        </div>
      )}
    </div>
  );
}
