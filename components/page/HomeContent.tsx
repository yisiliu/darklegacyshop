import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export function HomeContent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center bg-[url('/images/background-image.png')] bg-cover bg-center">
      <h1 className="sticky top-0 z-10 text-2xl md:text-4xl font-bold text-pink-200 mb-8 shadow-pink-200/50 drop-shadow-md py-4">
        SIGN IN / SIGN UP
      </h1>
      <Link href="/tasks" passHref>
        <Button
          size="lg"
          className="text-3xl px-12 py-8 bg-red-900 hover:bg-red-800 text-amber-300 rounded-none border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105 hover:rotate-1"
        >
          Enter Shop
        </Button>
      </Link>
      <Footer />
    </main>
  );
}
