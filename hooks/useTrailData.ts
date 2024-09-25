import { useState } from "react";
import { TrailData, Difficulty } from "@/types/trailTypes";

export function useTrailData() {
  const [TrailData, setTrailData] = useState<TrailData>({
    locations: [[0, 0]],
    blockLimits: [BigInt(0)],
    publicKeys: ["0x"],
    difficulty: "Easy",
  });

  const addLocation = () => {
    setTrailData((prev) => ({
      ...prev,
      locations: [...prev.locations, [0, 0]],
      blockLimits: [...prev.blockLimits, BigInt(0)],
      publicKeys: [...prev.publicKeys, "0x"],
    }));
  };

  const removeLocation = (index: number) => {
    setTrailData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
      blockLimits: prev.blockLimits.filter((_, i) => i !== index),
      publicKeys: prev.publicKeys.filter((_, i) => i !== index),
    }));
  };

  const updateLocation = (index: number, axis: "x" | "y", value: string) => {
    const newValue = parseInt(value) || 0;
    setTrailData((prev) => ({
      ...prev,
      locations: prev.locations.map((loc, i) =>
        i === index
          ? axis === "x"
            ? [newValue, loc[1]]
            : [loc[0], newValue]
          : loc,
      ),
    }));
  };

  const updateBlockLimit = (index: number, value: string) => {
    setTrailData((prev) => ({
      ...prev,
      blockLimits: prev.blockLimits.map((limit, i) =>
        i === index ? BigInt(value || 0) : limit,
      ),
    }));
  };

  const updatePublicKey = (index: number, value: string) => {
    setTrailData((prev) => ({
      ...prev,
      publicKeys: prev.publicKeys.map((key, i) =>
        i === index ? (value as `0x${string}`) : key,
      ),
    }));
  };

  const setDifficulty = (value: Difficulty) => {
    setTrailData((prev) => ({ ...prev, difficulty: value }));
  };

  return {
    TrailData,
    addLocation,
    removeLocation,
    updateLocation,
    updateBlockLimit,
    updatePublicKey,
    setDifficulty,
  };
}
