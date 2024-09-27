"use client";

import Link from "next/link";
import { Skull, Wallet, User } from "lucide-react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";

export function Header() {
  const { address, isConnected } = useAccount();

  const sliceAddress = address?.slice(0, 6) + "..." + address?.slice(-4);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-transparent backdrop-blur-md h-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {isConnected ? (
          <>
            <Link
              href="/tasks"
              className="text-amber-500 text-xl font-bold flex items-center"
            >
              <Skull className="mr-2 h-6 w-6" />
            </Link>
            <div className="relative group w-max">
              <button className="flex items-center focus:outline-none">
                <User />
                <p>{sliceAddress}</p>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <Link
                  href={`/user/${address}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  User Profile
                </Link>
                <Link
                  href="/tasks/manage"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Manage Trails
                </Link>
              </div>
            </div>
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
