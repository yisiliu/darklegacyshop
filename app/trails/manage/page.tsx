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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skull, Plus } from "lucide-react";
import Link from "next/link";

type Coordinate = [number, number];
type Difficulty = "Easy" | "Medium" | "Hard";
type Status = "Not Started" | "In Progress" | "Completed";

interface Route {
  id: string;
  name: string;
  locations: Coordinate[];
  blockLimits: bigint[];
  publicKeys: `0x${string}`[];
  difficulty: Difficulty;
  status: Status;
}

// Mock data for demonstration
const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Forest Path",
    locations: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    blockLimits: [BigInt(100), BigInt(200), BigInt(300)],
    publicKeys: ["0x123", "0x456", "0x789"],
    difficulty: "Easy",
    status: "Not Started",
  },
  {
    id: "2",
    name: "Mountain Trail",
    locations: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    blockLimits: [BigInt(150), BigInt(250), BigInt(350), BigInt(450)],
    publicKeys: ["0xabc", "0xdef", "0xghi", "0xjkl"],
    difficulty: "Medium",
    status: "In Progress",
  },
  {
    id: "3",
    name: "Dungeon Maze",
    locations: [
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [9, 9],
    ],
    blockLimits: [
      BigInt(200),
      BigInt(300),
      BigInt(400),
      BigInt(500),
      BigInt(600),
    ],
    publicKeys: ["0xmno", "0xpqr", "0xstu", "0xvwx", "0xyz"],
    difficulty: "Hard",
    status: "Completed",
  },
];

export default function ManageRoutesComponent() {
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);

  const handleStartChallenge = (id: string) => {
    setRoutes(
      routes.map((route) =>
        route.id === id ? { ...route, status: "In Progress" as Status } : route,
      ),
    );
  };

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "Not Started":
        return <Badge className="bg-gray-500 text-white">Not Started</Badge>;
      case "In Progress":
        return <Badge className="bg-green-500 text-white">In Progress</Badge>;
      case "Completed":
        return <Badge className="bg-blue-500 text-white">Completed</Badge>;
      default:
        return null;
    }
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
          Manage Routes
        </h1>

        <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Your Routes</CardTitle>
              <CardDescription className="text-amber-400">
                View your created routes and start challenges
              </CardDescription>
            </div>
            <Link href="/Trails/create" passHref>
              <Button
                variant="outline"
                size="sm"
                className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Route
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-amber-400">Name</TableHead>
                  <TableHead className="text-amber-400">Difficulty</TableHead>
                  <TableHead className="text-amber-400">Locations</TableHead>
                  <TableHead className="text-amber-400">Status</TableHead>
                  <TableHead className="text-amber-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>{route.difficulty}</TableCell>
                    <TableCell>{route.locations.length}</TableCell>
                    <TableCell>{getStatusBadge(route.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900"
                        onClick={() => handleStartChallenge(route.id)}
                        disabled={route.status !== "Not Started"}
                      >
                        Start Challenge
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
