"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Footprints, Clock, Trophy, BadgeCheck } from "lucide-react";
import { useStartChallenge } from "@/hooks/hiking/useStartChallenge";

import { RouteMap } from "@/components/taskDetail/RouteMapCard";

export function TaskDetails() {
  const [isStartingChallenge, setIsStartingChallenge] = useState(false);
  const [isStartedChallenge, setIsStartedChallenge] = useState(false);
  const [startChallengeError, setStartChallengeError] = useState<Error | null>(
    null,
  );

  const { startChallenge } = useStartChallenge();

  const handleStartChallenge = () => {
    setIsStartingChallenge(true);
    setStartChallengeError(null);

    startChallenge(BigInt(1))
      .then(() => {
        setIsStartedChallenge(true);
      })
      .catch((error) => {
        setStartChallengeError(error);
      })
      .finally(() => {
        setIsStartingChallenge(false);
      });
  };

  return (
    <Card className="bg-gray-800 border-2 bg-white border-gray-700 relative overflow-hidden">
      <CardHeader>
        <RouteMap progress={2} />
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
        <Button
          onClick={handleStartChallenge}
          disabled={isStartingChallenge}
          className="w-full text-lg py-8 bg-pink-300 hover:bg-pink-200 text-gray-800 rounded-full transform transition-all duration-200 hover:scale-105"
        >
          {isStartingChallenge ? "Starting..." : "Begin Journey"}
        </Button>
        {isStartedChallenge && <p>Challenge started!</p>}
        {startChallengeError && (
          <p>Error starting challenge: {startChallengeError.message}</p>
        )}
        <div className="bg-pink-300 rounded-lg p-4 text-center">
          <h2 className="text-lg font-bold mb-2">Next Location</h2>
          <p>Block 123, Yishun Street 11, #08-456, Singapore 760123</p>
        </div>
      </CardContent>
    </Card>
  );
}
