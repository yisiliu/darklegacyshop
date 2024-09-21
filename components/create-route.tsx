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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skull, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

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
            Back to Game
          </Button>
        </nav>
      </header>

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
                <div
                  key={index}
                  className="mb-6 p-4 border border-amber-500 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label
                        htmlFor={`location-x-${index}`}
                        className="text-amber-400"
                      >
                        Location X
                      </Label>
                      <Input
                        id={`location-x-${index}`}
                        type="number"
                        value={routeData.locations[index][0]}
                        onChange={(e) =>
                          updateLocation(index, "x", e.target.value)
                        }
                        className="bg-gray-700 text-amber-300 border-amber-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`location-y-${index}`}
                        className="text-amber-400"
                      >
                        Location Y
                      </Label>
                      <Input
                        id={`location-y-${index}`}
                        type="number"
                        value={routeData.locations[index][1]}
                        onChange={(e) =>
                          updateLocation(index, "y", e.target.value)
                        }
                        className="bg-gray-700 text-amber-300 border-amber-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`block-limit-${index}`}
                        className="text-amber-400"
                      >
                        Block Limit
                      </Label>
                      <Input
                        id={`block-limit-${index}`}
                        type="number"
                        value={routeData.blockLimits[index].toString()}
                        onChange={(e) =>
                          updateBlockLimit(index, e.target.value)
                        }
                        className="bg-gray-700 text-amber-300 border-amber-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor={`public-key-${index}`}
                      className="text-amber-400"
                    >
                      Public Key
                    </Label>
                    <Input
                      id={`public-key-${index}`}
                      type="text"
                      value={routeData.publicKeys[index]}
                      onChange={(e) => updatePublicKey(index, e.target.value)}
                      className="bg-gray-700 text-amber-300 border-amber-500"
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => removeLocation(index)}
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Location
                    </Button>
                  )}
                </div>
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

          <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Difficulty</CardTitle>
              <CardDescription className="text-amber-400">
                Select the difficulty level for this route
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={routeData.difficulty}
                onValueChange={(value: Difficulty) =>
                  setRouteData((prev) => ({ ...prev, difficulty: value }))
                }
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Easy"
                    id="difficulty-easy"
                    className="text-amber-500"
                  />
                  <Label htmlFor="difficulty-easy">Easy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Medium"
                    id="difficulty-medium"
                    className="text-amber-500"
                  />
                  <Label htmlFor="difficulty-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Hard"
                    id="difficulty-hard"
                    className="text-amber-500"
                  />
                  <Label htmlFor="difficulty-hard">Hard</Label>
                </div>
              </RadioGroup>
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
