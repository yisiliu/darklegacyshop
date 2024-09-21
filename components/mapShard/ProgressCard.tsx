import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  unlockedShards: number;
  totalShards: number;
}

export function ProgressCard({
  unlockedShards,
  totalShards,
}: ProgressCardProps) {
  const progress = (unlockedShards / totalShards) * 100;

  return (
    <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Level 1 Progress</CardTitle>
        <CardDescription className="text-amber-400">
          Unlock all {totalShards} shards to reveal the full map
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2 bg-gray-700" />
        <p className="mt-2 text-right">
          {unlockedShards} / {totalShards} Shards Unlocked
        </p>
      </CardContent>
    </Card>
  );
}
