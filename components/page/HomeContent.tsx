import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export function HomeContent() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-amber-500 mb-12 animate-pulse shadow-amber-500/50 drop-shadow-lg">
        Unleash Dark Powers
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
