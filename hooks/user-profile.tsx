import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skull, Swords, Shield, Potion, Scroll, Coins } from "lucide-react";
import Link from "next/link";

export default function Component() {
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
          Adventurer's Profile
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1 bg-gray-800 border-amber-500 text-amber-300">
            <CardHeader>
              <CardTitle className="text-2xl">User Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src="/placeholder.svg?text=User&width=96&height=96"
                    alt="User Avatar"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">Unnamed Hero</h2>
                <p className="text-amber-400">Level 5 Adventurer</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Experience</span>
                  <span>2500 / 5000</span>
                </div>
                <Progress
                  value={50}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-amber-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Coins className="mr-2 h-5 w-5 text-yellow-500" />
                  Gold
                </span>
                <span>1,250</span>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-gray-800 border-amber-500 text-amber-300">
            <CardHeader>
              <CardTitle className="text-2xl">Inventory</CardTitle>
              <CardDescription className="text-amber-400">
                Your collected items and treasures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weapons" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                  <TabsTrigger
                    value="weapons"
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                  >
                    <Swords className="mr-2 h-4 w-4" />
                    Weapons
                  </TabsTrigger>
                  <TabsTrigger
                    value="armor"
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Armor
                  </TabsTrigger>
                  <TabsTrigger
                    value="potions"
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                  >
                    <Potion className="mr-2 h-4 w-4" />
                    Potions
                  </TabsTrigger>
                  <TabsTrigger
                    value="scrolls"
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-gray-900"
                  >
                    <Scroll className="mr-2 h-4 w-4" />
                    Scrolls
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="weapons" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Rusty Sword</span>
                      <span className="text-gray-400">Damage: 5-10</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Wooden Bow</span>
                      <span className="text-gray-400">Damage: 3-7</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="armor" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Leather Armor</span>
                      <span className="text-gray-400">Defense: 5</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Wooden Shield</span>
                      <span className="text-gray-400">Defense: 3</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="potions" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Health Potion</span>
                      <span className="text-gray-400">Restores 50 HP</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Mana Potion</span>
                      <span className="text-gray-400">Restores 30 MP</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="scrolls" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Scroll of Identify</span>
                      <span className="text-gray-400">Identifies an item</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Scroll of Teleport</span>
                      <span className="text-gray-400">Teleports to town</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
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
