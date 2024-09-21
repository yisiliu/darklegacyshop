"use client";

import { useState } from "react";
import { ProgressCard } from "./ProgressCard";
import { MapShard } from "./MapShard";
import { CongratsCard } from "./CongratsCard";

const totalShards = 6;

export function MapShardSelection() {
  const [unlockedShards, setUnlockedShards] = useState<number[]>([]);

  const handleShardClick = (index: number) => {
    if (!unlockedShards.includes(index)) {
      setUnlockedShards([...unlockedShards, index]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
          Unlock the Ancient Forest Map
        </h1>

        <ProgressCard
          unlockedShards={unlockedShards.length}
          totalShards={totalShards}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(totalShards)].map((_, index) => (
            <MapShard
              key={index}
              index={index}
              isUnlocked={unlockedShards.includes(index)}
              onClick={() => handleShardClick(index)}
            />
          ))}
        </div>

        {unlockedShards.length === totalShards && <CongratsCard />}
      </main>
    </div>
  );
}
