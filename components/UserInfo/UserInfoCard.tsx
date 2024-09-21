import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Coins, Heart, Swords, Wind, Shield } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UserInfoCardProps {
  user: string;
  level: number;
  experience: number;
  gold: number;
  hitPoint: number;
  attack: number;
  speed: number;
  defence: number;
}

const UserInfoCard = () => {
  return (
    <Card className="md:col-span-1 bg-gray-800 border-2 bg-white border-gray-700">
      <CardContent className="space-y-4 mt-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="/placeholder.svg?text=User&width=96&height=96"
              alt="User Avatar"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-bold">Unnamed Hero</h2>
          <p className="text-gray-500">Level 5 Adventurer</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Experience</span>
            <span>2500 / 5000</span>
          </div>
          <Progress value={50} className="h-2 bg-gray-700" />
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <Coins className="mr-2 h-5 w-5 text-yellow-500" />
            Gold
          </span>
          <span>1,250</span>
        </div>
        <div className="space-y-2 pt-4 border-t border-gray-700">
          <h3 className="font-semibold text-lg">Status</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              <span>HitPoint: 100</span>
            </div>
            <div className="flex items-center">
              <Swords className="mr-2 h-5 w-5 text-blue-500" />
              <span>Attack: 15</span>
            </div>
            <div className="flex items-center">
              <Wind className="mr-2 h-5 w-5 text-green-500" />
              <span>Speed: 10</span>
            </div>
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-purple-500" />
              <span>Defence: 8</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
