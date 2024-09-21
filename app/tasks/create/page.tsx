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

import LocationInput from "@/components/taskDetail/LocationInput";
import DifficultySelector from "@/components/taskDetail/DifficultySelector";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Coordinate = [number, number];
type Difficulty = "Easy" | "Medium" | "Hard";

interface RouteData {
  locations: Coordinate[];
  blockLimits: bigint[];
  publicKeys: `0x${string}`[];
  difficulty: Difficulty;
}

export function CreateRouteComponent() {
  const [routeData, setRouteData] = useState<RouteData>({
    locations: [[0, 0]],
    blockLimits: [BigInt(0)],
    publicKeys: ["0x"],
    difficulty: "Easy",
  });

  const addLocation = () => {
    setRouteData((prev) => ({
      ...prev,
      locations: [...prev.locations, [0, 0]],
      blockLimits: [...prev.blockLimits, BigInt(0)],
      publicKeys: [...prev.publicKeys, "0x"],
    }));
  };

  const removeLocation = (index: number) => {
    setRouteData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
      blockLimits: prev.blockLimits.filter((_, i) => i !== index),
      publicKeys: prev.publicKeys.filter((_, i) => i !== index),
    }));
  };

  const updateLocation = (index: number, axis: "x" | "y", value: string) => {
    const newValue = parseInt(value) || 0;
    setRouteData((prev) => ({
      ...prev,
      locations: prev.locations.map((loc, i) =>
        i === index
          ? axis === "x"
            ? [newValue, loc[1]]
            : [loc[0], newValue]
          : loc,
      ),
    }));
  };

  const updateBlockLimit = (index: number, value: string) => {
    setRouteData((prev) => ({
      ...prev,
      blockLimits: prev.blockLimits.map((limit, i) =>
        i === index ? BigInt(value || 0) : limit,
      ),
    }));
  };

  const updatePublicKey = (index: number, value: string) => {
    setRouteData((prev) => ({
      ...prev,
      publicKeys: prev.publicKeys.map((key, i) =>
        i === index ? (value as `0x${string}`) : key,
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Route Data:", routeData);
    // Here you would typically send the data to your backend or perform further actions
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
          Create New Route
        </h1>

        <form onSubmit={handleSubmit}>
          <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Route Details</CardTitle>
              <CardDescription className="text-amber-400">
                Define the locations, block limits, and public keys for your
                route
              </CardDescription>
            </CardHeader>
            <CardContent>
              {routeData.locations.map((_, index) => (
                <LocationInput
                  key={index}
                  index={index}
                  location={routeData.locations[index]}
                  blockLimit={routeData.blockLimits[index]}
                  publicKey={routeData.publicKeys[index]}
                  updateLocation={updateLocation}
                  updateBlockLimit={updateBlockLimit}
                  updatePublicKey={updatePublicKey}
                  removeLocation={removeLocation}
                  isRemovable={index > 0}
                />
              ))}
              <Button
                type="button"
                onClick={addLocation}
                variant="outline"
                className="mt-4 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </CardContent>
          </Card>
          <Button
            type="submit"
            className="w-full bg-amber-500 text-gray-900 hover:bg-amber-600"
          >
            Create Route
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
