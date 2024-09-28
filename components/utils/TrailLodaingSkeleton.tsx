import { Card, CardContent } from "@/components/ui/card";

export const TrailLoadingSkeleton: React.FC = () => (
  <Card className="border p-4 rounded-lg animate-pulse">
    <CardContent className="space-y-2">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </CardContent>
  </Card>
);
