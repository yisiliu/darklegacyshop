"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskProgress({
  progress,
  checkpoints,
}: {
  progress: number;
  checkpoints: string[];
}) {
  return (
    <Card className="bg-gray-800 border-amber-500 text-amber-300">
      <CardHeader>
        <CardTitle className="text-2xl">Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Current Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-700" />
        <ul className="space-y-2 text-sm">
          {checkpoints.map((checkpoint, index) => (
            <li key={index} className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-amber-500 mr-2"></span>
              {checkpoint}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
