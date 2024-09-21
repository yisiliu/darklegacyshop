import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  HIKING_CONTRACT_ADDRESS,
  HIKING_CONTRACT_ABI,
} from "@/lib/contractInfo";
import { useCallback } from "react";

// Enum to match the contract's Difficulty enum
enum Difficulty {
  Easy,
  Medium,
  Hard,
  Expert,
}

// Interface to represent the Coordinate struct
interface Coordinate {
  latitude: bigint;
  longitude: bigint;
}

export const useCreateRoute = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const createRoute = useCallback(
    async ({
      locations,
      blockLimits,
      publicKeys,
      difficulty,
    }: {
      locations: Coordinate[];
      blockLimits: bigint[];
      publicKeys: `0x${string}`[];
      difficulty: Difficulty;
    }) => {
      try {
        const result = await writeContract({
          address: HIKING_CONTRACT_ADDRESS,
          abi: HIKING_CONTRACT_ABI,
          functionName: "createRoute",
          args: [locations, blockLimits, publicKeys, difficulty],
        });
        return result;
      } catch (error) {
        console.error("Create route error:", error);
        throw error;
      }
    },
    [writeContract],
  );

  return { createRoute, isConfirming, isConfirmed, isPending, error };
};
