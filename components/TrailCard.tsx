import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface TrailCardProps {
  title: string;
  description: string;
  buttonText: string;
  isLocked: boolean;
  href: string; // Add this new prop
}

export default function TrailCard({
  title,
  description,
  buttonText,
  isLocked,
  href, // Add this new prop
}: TrailCardProps) {
  return (
    <Card
      className={`border-2 bg-white border-gray-700 relative overflow-hidden`}
    >
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-center">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} passHref>
          <Button
            className={
              isLocked
                ? "w-full text-lg py-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full transform transition-all duration-200 hover:scale-105 cursor-not-allowed"
                : "w-full text-lg py-8 bg-pink-300 hover:bg-pink-200 text-gray-800 rounded-full transform transition-all duration-200 hover:scale-105"
            }
            disabled={isLocked}
          >
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
