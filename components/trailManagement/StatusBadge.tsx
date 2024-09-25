import { Badge } from "@/components/ui/badge";
import { Status } from "@/types/trailTypes";

export function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case "Not Started":
      return <Badge className="bg-gray-500 text-white">Not Started</Badge>;
    case "In Progress":
      return <Badge className="bg-green-500 text-white">In Progress</Badge>;
    case "Completed":
      return <Badge className="bg-blue-500 text-white">Completed</Badge>;
    default:
      return null;
  }
}
