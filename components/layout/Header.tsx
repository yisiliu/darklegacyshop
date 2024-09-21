"use client";

import Link from "next/link";
import { Skull, Wallet, User } from "lucide-react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";

export function Header() {
  const { address, isConnected } = useAccount();

  const sliceAddress = address?.slice(0, 6) + "..." + address?.slice(-4);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-transparent">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {isConnected ? (
          <>
            <div className="flex items-center space-x-2">
              <Wallet />
              <p>{sliceAddress}</p>
            </div>
            <Link href={`/user/${address}`}>
              <User />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/"
              className="text-amber-500 text-xl font-bold flex items-center"
            >
              <Skull className="mr-2 h-6 w-6" />
              DarkLegacyShop
            </Link>
            <DynamicWidget />
          </>
        )}
      </nav>
    </header>
  );
}
