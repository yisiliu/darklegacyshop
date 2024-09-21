"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TaskProgress() {
  return (
    <Card className="bg-gray-800 border-amber-500 text-amber-300">
      <CardHeader>
        <CardTitle className="text-2xl">Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Current Progress</span>
          <span>25%</span>
        </div>
        <Progress value={25} className="h-2 bg-gray-700" />
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-amber-500 mr-2"></span>
            Reach the river bank
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
            Cross the stepping stones
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
            Navigate the rickety bridge
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
            Arrive at the ancient forest
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
