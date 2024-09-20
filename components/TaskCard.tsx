import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mountain, Lock } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  buttonText: string;
  isLocked: boolean;
}

export default function TaskCard({
  title,
  description,
  buttonText,
  isLocked,
}: TaskCardProps) {
  return (
    <Card
      className={`bg-gray-800 ${isLocked ? "border-gray-700 text-gray-400" : "border-amber-500 text-amber-300"} relative overflow-hidden`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-black/70 flex flex-col space-y-3 items-center justify-center z-10">
          <Lock className="h-16 w-16 text-gray-500" />
          <p className="text-gray-500 text-xl font-bold">Coming Soon</p>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          {title} <Mountain className="h-6 w-6" />
        </CardTitle>
        <CardDescription
          className={isLocked ? "text-gray-500" : "text-amber-400"}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className={
            isLocked
              ? "w-full bg-gray-700 text-gray-500 cursor-not-allowed"
              : "w-full bg-red-900 hover:bg-red-800 text-amber-300 border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105"
          }
          disabled={isLocked}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
