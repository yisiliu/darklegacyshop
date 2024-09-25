import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/trailManagement/StatusBadge";
import { Trail } from "@/types/trailTypes";

interface TrailsTableProps {
  initialTrails: Trail[];
}

export function TrailsTable({ initialTrails }: TrailsTableProps) {
  const [Trails, setTrails] = useState<Trail[]>(initialTrails);

  const handleStartChallenge = (id: string) => {
    setTrails(
      Trails.map((Trail) =>
        Trail.id === id ? { ...Trail, status: "In Progress" as const } : Trail,
      ),
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-amber-400">Name</TableHead>
          <TableHead className="text-amber-400">Difficulty</TableHead>
          <TableHead className="text-amber-400">Locations</TableHead>
          <TableHead className="text-amber-400">Status</TableHead>
          <TableHead className="text-amber-400">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Trails.map((Trail) => (
          <TableRow key={Trail.id}>
            <TableCell className="font-medium">{Trail.name}</TableCell>
            <TableCell>{Trail.difficulty}</TableCell>
            <TableCell>{Trail.locations.length}</TableCell>
            <TableCell>
              <StatusBadge status={Trail.status} />
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900"
                onClick={() => handleStartChallenge(Trail.id)}
                disabled={Trail.status !== "Not Started"}
              >
                Start Challenge
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
