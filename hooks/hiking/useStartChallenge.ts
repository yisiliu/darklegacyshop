import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  HIKING_CONTRACT_ADDRESS,
  HIKING_CONTRACT_ABI,
} from "@/lib/contractInfo";
import { useCallback } from "react";

export const useStartChallenge = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const startChallenge = useCallback(
    async (challengeId: bigint) => {
      const result = await writeContract({
        address: HIKING_CONTRACT_ADDRESS,
        abi: HIKING_CONTRACT_ABI,
        functionName: "startChallenge",
        args: [challengeId],
      });
      return result;
    },
    [writeContract],
  );

  return { startChallenge, isConfirming, isConfirmed, error };
};
