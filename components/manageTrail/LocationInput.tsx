import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface LocationInputProps {
  index: number;
  location: [number, number];
  blockLimit: bigint;
  publicKey: `0x${string}`;
  updateLocation: (index: number, axis: "x" | "y", value: string) => void;
  updateBlockLimit: (index: number, value: string) => void;
  updatePublicKey: (index: number, value: string) => void;
  removeLocation: (index: number) => void;
  isRemovable: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({
  index,
  location,
  blockLimit,
  publicKey,
  updateLocation,
  updateBlockLimit,
  updatePublicKey,
  removeLocation,
  isRemovable,
}) => {
  return (
    <div className="mb-6 p-4 border border-amber-500 rounded-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor={`x-${index}`}>X Coordinate</Label>
          <Input
            id={`x-${index}`}
            type="number"
            value={location[0]}
            onChange={(e) => updateLocation(index, "x", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor={`y-${index}`}>Y Coordinate</Label>
          <Input
            id={`y-${index}`}
            type="number"
            value={location[1]}
            onChange={(e) => updateLocation(index, "y", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor={`blockLimit-${index}`}>Block Limit</Label>
        <Input
          id={`blockLimit-${index}`}
          type="number"
          value={blockLimit.toString()}
          onChange={(e) => updateBlockLimit(index, e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor={`publicKey-${index}`}>Public Key</Label>
        <Input
          id={`publicKey-${index}`}
          type="text"
          value={publicKey}
          onChange={(e) => updatePublicKey(index, e.target.value)}
          className="mt-1"
        />
      </div>
      {isRemovable && (
        <Button
          type="button"
          onClick={() => removeLocation(index)}
          variant="destructive"
          size="sm"
          className="mt-2"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Location
        </Button>
      )}
    </div>
  );
};

export default LocationInput;
