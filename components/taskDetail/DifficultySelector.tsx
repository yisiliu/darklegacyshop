import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Difficulty</CardTitle>
        <CardDescription className="text-amber-400">
          Select the difficulty level for your route
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={difficulty}
          onValueChange={(value) => setDifficulty(value as Difficulty)}
          className="flex space-x-4"
        >
          {["easy", "medium", "hard"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem
                value={level}
                id={`difficulty-${level}`}
                className="border-amber-500 text-amber-500"
              />
              <Label
                htmlFor={`difficulty-${level}`}
                className="text-amber-300 capitalize"
              >
                {level}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default DifficultySelector;
