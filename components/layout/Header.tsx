import Link from "next/link";
import { Skull } from "lucide-react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

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
        <DynamicWidget />
      </nav>
    </header>
  );
}
