import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CongratsCard() {
  return (
    <Card className="fixed bottom-10 left-0 right-0 m-8 bg-white text-gray-900 border-none z-50">
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p>
          You've unlocked all map shards. The ancient forest awaits your
          exploration!
        </p>
        <Button className="text-lg px-12 py-8 bg-pink-300 mt-6 hover:bg-pink-200 text-gray-800 rounded-full shadow-lg shadow-[#f3b8e1]/50 transform transition-all duration-200 hover:scale-105">
          View Full Map
        </Button>
      </CardContent>
    </Card>
  );
}
