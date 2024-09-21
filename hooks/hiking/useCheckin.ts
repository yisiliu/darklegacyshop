import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import {
  HIKING_CONTRACT_ADDRESS,
  HIKING_CONTRACT_ABI,
} from "@/lib/contractInfo";
import { useCallback } from "react";

export const useCheckin = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const checkin = useCallback(
    async (signature: `0x${string}`) => {
      if (!signature) {
        throw new Error("Signature is required");
      }

      try {
        const result = await writeContract({
          address: HIKING_CONTRACT_ADDRESS,
          abi: HIKING_CONTRACT_ABI,
          functionName: "checkIn",
          args: [signature],
        });
        return result;
      } catch (error) {
        console.error("Checkin error:", error);
        throw error;
      }
    },
    [writeContract],
  );

  return {
    checkin,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    transactionHash: hash,
  };
};
