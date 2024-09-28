import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import LocationInput from "@/components/manageTrail/LocationInput";
import DifficultySelector from "@/components/manageTrail/DifficultySelector";
import { TrailData, Difficulty } from "@/types/trailTypes";

interface TrailFormProps {
  TrailData: TrailData;
  addLocation: () => void;
  removeLocation: (index: number) => void;
  updateLocation: (index: number, axis: "x" | "y", value: string) => void;
  updateBlockLimit: (index: number, value: string) => void;
  updatePublicKey: (index: number, value: string) => void;
  setDifficulty: (value: Difficulty) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function TrailForm({
  TrailData,
  addLocation,
  removeLocation,
  updateLocation,
  updateBlockLimit,
  updatePublicKey,
  setDifficulty,
  handleSubmit,
}: TrailFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Trail Details</CardTitle>
          <CardDescription className="text-amber-400">
            Define the locations, block limits, and public keys for your Trail
          </CardDescription>
        </CardHeader>
        <CardContent>
          {TrailData.locations.map((_, index) => (
            <LocationInput
              key={index}
              index={index}
              location={TrailData.locations[index]}
              blockLimit={TrailData.blockLimits[index]}
              publicKey={TrailData.publicKeys[index]}
              updateLocation={updateLocation}
              updateBlockLimit={updateBlockLimit}
              updatePublicKey={updatePublicKey}
              removeLocation={removeLocation}
              isRemovable={index > 0}
            />
          ))}
          <Button
            type="button"
            onClick={addLocation}
            variant="outline"
            className="mt-4 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </CardContent>
      </Card>

      <DifficultySelector
        difficulty={TrailData.difficulty}
        setDifficulty={setDifficulty}
      />

      <Button
        type="submit"
        className="w-full bg-amber-500 text-gray-900 hover:bg-amber-600"
      >
        Create Trail
      </Button>
    </form>
  );
}
