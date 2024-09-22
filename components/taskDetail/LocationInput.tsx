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
      {/* ... Input fields for location, block limit, and public key ... */}
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
d;
