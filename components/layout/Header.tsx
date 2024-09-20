import Link from "next/link";
import { Skull, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-black/70 border-b border-amber-900/50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-amber-500 text-xl font-bold flex items-center"
        >
          <Skull className="mr-2 h-6 w-6" />
          DarkLegacyShop
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </nav>
    </header>
  );
}
