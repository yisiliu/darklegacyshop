import { useReadContract } from "wagmi";
import { HIKING_CONTRACT_ADDRESS, HIKING_CONTRACT_ABI } from "@/constants";

export const useGetUserChallenge = (userAddress: `0x${string}`) => {
  const { data, isLoading, error, refetch } = useReadContract({
    address: HIKING_CONTRACT_ADDRESS,
    abi: HIKING_CONTRACT_ABI,
    functionName: "userChallenge",
    args: [userAddress],
  });

  const challenge = data
    ? {
        challengeId: data[0],
        routeId: data[1],
        startBlock: data[2],
        currentCheckpoint: data[3],
        isActive: data[4],
        stakedAmount: data[5],
      }
    : null;

  return { challenge, isLoading, error, refetch };
};

export const useGetRoute = (routeId: bigint) => {
  const { data, isLoading, error } = useReadContract({
    address: HIKING_CONTRACT_ADDRESS,
    abi: HIKING_CONTRACT_ABI,
    functionName: "routes",
    args: [routeId],
  });

  return {
    route: data,
    isLoading,
    error,
  };
};

export const useGetKeyMetadata = (tokenId: bigint) => {
  const { data, isLoading, error } = useReadContract({
    address: HIKING_CONTRACT_ADDRESS,
    abi: HIKING_CONTRACT_ABI,
    functionName: "getKeyMetadata",
    args: [tokenId],
  });

  return {
    keyMetadata: data,
    isLoading,
    error,
  };
};
