import { Trail } from "@/types/trailTypes";

export const mockTrails: Trail[] = [
  {
    id: "1",
    name: "Forest Path",
    locations: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    blockLimits: [BigInt(100), BigInt(200), BigInt(300)],
    publicKeys: ["0x123", "0x456", "0x789"],
    difficulty: "Easy",
    status: "Not Started",
  },
  {
    id: "2",
    name: "Mountain Trail",
    locations: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    blockLimits: [BigInt(150), BigInt(250), BigInt(350), BigInt(450)],
    publicKeys: ["0xabc", "0xdef", "0xghi", "0xjkl"],
    difficulty: "Medium",
    status: "In Progress",
  },
  {
    id: "3",
    name: "Dungeon Maze",
    locations: [
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [9, 9],
    ],
    blockLimits: [
      BigInt(200),
      BigInt(300),
      BigInt(400),
      BigInt(500),
      BigInt(600),
    ],
    publicKeys: ["0xmno", "0xpqr", "0xstu", "0xvwx", "0xyz"],
    difficulty: "Hard",
    status: "Completed",
  },
];
