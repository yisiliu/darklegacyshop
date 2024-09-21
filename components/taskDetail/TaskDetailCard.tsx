"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footprints, Clock, Trophy } from "lucide-react";

export function TaskDetails() {
  return (
    <Card className="bg-gray-800 border-amber-500 text-amber-300">
      <CardHeader>
        <CardTitle className="text-2xl">Task Details</CardTitle>
        <CardDescription className="text-amber-400">
          Easy - For novice adventurers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Footprints className="h-5 w-5" />
          <span>Distance: 2.5 miles</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Estimated Time: 1.5 hours</span>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span>Reward: 100 Gold Coins</span>
        </div>
        <p className="text-sm">
          Your first challenge is to cross the treacherous river that separates
          the village from the ancient forest. Navigate through shallow waters,
          hop across stepping stones, and use a rickety bridge to reach the
          other side.
        </p>
        <Button className="w-full bg-red-900 hover:bg-red-800 text-amber-300 border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105">
          Begin Journey
        </Button>
      </CardContent>
    </Card>
  );
}
