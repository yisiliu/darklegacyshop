import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CongratsCard() {
  return (
    <Card className="mt-8 bg-amber-500 text-gray-900">
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p>
          You've unlocked all map shards. The ancient forest awaits your
          exploration!
        </p>
        <Button className="mt-4 bg-gray-900 text-amber-500 hover:bg-gray-800">
          View Full Map
        </Button>
      </CardContent>
    </Card>
  );
}
