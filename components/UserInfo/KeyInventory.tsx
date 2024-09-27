import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Key, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function KeyInventoryCard() {
  const keys = [
    {
      name: "Ancient Forest Key",
      description: "Unlocks hidden paths in the ancient forest",
      color: "bg-green-600",
      href: "/maps/ancient-forest",
    },
    {
      name: "Dungeon Master Key",
      description: "Opens all doors in the forgotten dungeon",
      color: "bg-purple-600",
      href: "/maps/forgotten-dungeon",
    },
    {
      name: "Mystic Vault Key",
      description: "Grants access to the treasure vault of the ancients",
      color: "bg-blue-600",
      href: "/maps/ancient-vault",
    },
  ];

  return (
    <Card className="md:col-span-1 bg-gray-800 border-2 bg-white border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Key className="mr-2 h-6 w-6 text-pink-300" />
          Key Inventory
        </CardTitle>
        <CardDescription className="text-gray-500">
          Mystical keys you've acquired on your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {keys.map((key, index) => (
            <Link key={index} href={key.href} className="block">
              <div className="relative group cursor-pointer">
                <div
                  className={`absolute inset-0 ${key.color} rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative p-4 bg-gray-800 rounded-lg overflow-hidden group-hover:border-amber-400 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 mr-2 text-pink-300" />
                      <h3 className="text-lg font-semibold text-pink-300">
                        {key.name}
                      </h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-sm text-gray-300">{key.description}</p>
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-pink-300 rounded-tl-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
