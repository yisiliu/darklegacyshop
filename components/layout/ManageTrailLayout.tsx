import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrailsTable } from "@/components/trailManagement/TrailTable";
import { mockTrails } from "@/components/trailManagement/TrailData";

export function ManageTrailsComponent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
        Manage Trails
      </h1>

      <Card className="bg-gray-800 border-amber-500 text-amber-300 mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Trails</CardTitle>
            <CardDescription className="text-amber-400">
              View your created Trails and start challenges
            </CardDescription>
          </div>
          <Link href="/create-Trail" passHref>
            <Button
              variant="outline"
              size="sm"
              className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Trail
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <TrailsTable initialTrails={mockTrails} />
        </CardContent>
      </Card>
    </main>
  );
}
