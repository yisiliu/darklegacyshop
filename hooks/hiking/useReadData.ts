import { useReadContract } from "wagmi";
import {
  HIKING_CONTRACT_ADDRESS,
  HIKING_CONTRACT_ABI,
} from "@/lib/contractInfo";

export const useGetUserChallenge = (userAddress: `0x${string}`) => {
  const { data, isLoading, error, refetch } = useReadContract({
    address: HIKING_CONTRACT_ADDRESS,
    abi: HIKING_CONTRACT_ABI,
    functionName: "userChallenge",
    args: [userAddress],
  });

  const challenge = data ? data : null;

  return { challenge, isLoading, error, refetch };
};

export const useGetRoute = (routeId: bigint) => {
  const { data, isLoading, error } = useReadContract({
    address: HIKING_CONTRACT_ADDRESS,
    abi: HIKING_CONTRACT_ABI,
    functionName: "trails",
    args: [routeId],
  });

  return {
    trails: data,
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
