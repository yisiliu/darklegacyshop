import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swords, Shield, Option, Scroll } from "lucide-react";

export default function LegacyStorageCard() {
  return (
    <Card className="md:col-span-2 bg-gray-800 border-amber-500 text-amber-300">
      <CardHeader>
        <CardTitle className="text-2xl">Legacy Storage</CardTitle>
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
              <Option className="mr-2 h-4 w-4" />
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
  );
}
