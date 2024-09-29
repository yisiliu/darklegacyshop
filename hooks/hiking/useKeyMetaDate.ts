"use client";

import { useState, useEffect } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { Address, getContract } from "viem";
import { publicClient } from "@/lib/client";

import {
  HIKING_CONTRACT_ADDRESS,
  HIKING_CONTRACT_ABI,
} from "@/lib/contractInfo";

import { KeyMetadata } from "@/types/trailTypes";

const contract = getContract({
  address: HIKING_CONTRACT_ADDRESS as Address,
  abi: HIKING_CONTRACT_ABI,
  client: publicClient,
});

export function useKeyMetadata() {
  const [keyMetadata, setKeyMetadata] = useState<KeyMetadata[]>([]);
  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfo[]>([]);
  const [trailInfo, setTrailInfo] = useState<TrailInfo[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { address } = useAccount();
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchKeyMetadata = async () => {
      if (!address) return;

      try {
        const totalKeys = await contract.read.getTotalKeysMinted();
        const metadata: KeyMetadata[] = [];

        for (let i = 0; i < Number(totalKeys); i++) {
          const tokenId = BigInt(i + 1); // Assuming token IDs start from 1

          const keyData = await contract.read.getKeyMetadata([tokenId]);
          if (Array.isArray(keyData) && keyData.length >= 2) {
            const trailId = keyData[1].toString();

            const trailInfo = await contract.read.getTrailInfo(trailId);
            console.log("Trail Info for Trail ID:", trailId, trailInfo);

            metadata.push({
              challengeId: keyData[0].toString(),
              trailId: keyData[1].toString(),
              completionBlock: keyData[2],
              difficulty: Number(keyData[3]),
            });
          }
        }

        setKeyMetadata(metadata);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeyMetadata();
  }, [address, publicClient]);

  return { keyMetadata, isLoading, error };
}
