"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footprints, Clock, Trophy } from "lucide-react";
import { useStartChallenge } from "@/hooks/hiking/useStartChallenge";
import { useCheckin } from "@/hooks/hiking/useCheckin";
import { useAccount } from "wagmi";

export function TaskDetails() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const {
    startChallenge,
    isConfirming: isStartingChallenge,
    isConfirmed: isStartedChallenge,
    error: startChallengeError,
  } = useStartChallenge();

  const handleStartChallenge = async (challengeId: bigint) => {
    try {
      await startChallenge(challengeId);
    } catch (error) {
      console.error(error);
    }
    return (
      <>
        <Button className="w-full bg-red-900 hover:bg-red-800 text-amber-300 border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105">
          Begin Journey
        </Button>
        {isStartingChallenge && <p>Starting challenge...</p>}
        {isStartedChallenge && <p>Challenge started!</p>}
        {startChallengeError && (
          <p>Error starting challenge: {startChallengeError?.message}</p>
        )}
      </>
    );
  };

  return (
    <Card
      className={`bg-gray-800 border-2 bg-white border-gray-700 relative overflow-hidden`}
    >
      <CardHeader>
        <RouteMap />
      </CardHeader>
      <CardContent className="space-y-4">
        <h1 className="text-xl md:text-5xl font-extrabold text-amber-500 mb-4 text-gray-700">
          Route 1: Cross the River
        </h1>
        <div className="flex items-center text-gray-500 space-x-2">
          <BadgeCheck className="h-5 w-5" />
          <span>Easy - For novice adventurers</span>
        </div>
        <div className="flex items-center text-gray-500 space-x-2">
          <Footprints className="h-5 w-5" />
          <span>Distance: 2.5 miles</span>
        </div>
        <div className="flex items-center text-gray-500 space-x-2">
          <Clock className="h-5 w-5" />
          <span>Estimated Time: 1.5 hours</span>
        </div>
        <div className="flex items-center text-gray-500 space-x-2">
          <Trophy className="h-5 w-5" />
          <span>Reward: 100 Gold Coins</span>
        </div>
        <p className="text-sm">
          Your first challenge is to cross the treacherous river that separates
          the village from the ancient forest. Navigate through shallow waters,
          hop across stepping stones, and use a rickety bridge to reach the
          other side.
        </p>
        <Button className="w-full text-lg py-8 bg-pink-300 hover:bg-pink-200 text-gray-800 rounded-full transform transition-all duration-200 hover:scale-105">
          Begin Journey
        </Button>
        <div className="bg-pink-300 rounded-lg p-4 text-center">
          <h2 className="text-lg font-bold mb-2">Next Location</h2>
          <p>Block 123, Yishun Street 11, #08-456, Singapore 760123</p>
        </div>
      </CardContent>
    </Card>
  );
}
