export type Coordinate = [number, number];
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Status = "Not Started" | "In Progress" | "Completed";

export interface Trail {
  id: string;
  name: string;
  locations: Coordinate[];
  blockLimits: bigint[];
  publicKeys: `0x${string}`[];
  difficulty: Difficulty;
  status: Status;
}

export type TrailData = Omit<Trail, "id" | "name" | "status">;
