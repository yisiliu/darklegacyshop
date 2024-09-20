"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skull, MapPin, Footprints, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function EasyTaskDetail() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <header className="sticky top-0 z-10 bg-black/70 border-b border-amber-900/50">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-amber-500 text-xl font-bold flex items-center"
          >
            <Skull className="mr-2 h-6 w-6" />
            DarkLegacyShop
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900"
          >
            Back to Routes
          </Button>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
          Route 1: Cross the River
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
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
                Your first challenge is to cross the treacherous river that
                separates the village from the ancient forest. Navigate through
                shallow waters, hop across stepping stones, and use a rickety
                bridge to reach the other side.
              </p>
              <Button className="w-full bg-red-900 hover:bg-red-800 text-amber-300 border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105">
                Begin Journey
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-gray-800 border-amber-500 text-amber-300">
              <CardHeader>
                <CardTitle className="text-2xl">Route Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Map of Route 1: Cross the River"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-amber-500 text-amber-300">
              <CardHeader>
                <CardTitle className="text-2xl">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Current Progress</span>
                  <span>25%</span>
                </div>
                <Progress
                  value={25}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-amber-500"
                />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-amber-500 mr-2"></span>
                    Reach the river bank
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
                    Cross the stepping stones
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
                    Navigate the rickety bridge
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
                    Arrive at the ancient forest
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-black/70 border-t border-amber-900/50 text-amber-500 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} DarkLegacyShop. All souls
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
