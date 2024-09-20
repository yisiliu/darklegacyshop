'use client'

import { Button } from "@/components/ui/button"
import { Wallet, Skull } from "lucide-react"
import Link from "next/link"

export function DungeonShopLayout() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <header className="sticky top-0 z-10 bg-black/70 border-b border-amber-900/50">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-amber-500 text-xl font-bold flex items-center">
            <Skull className="mr-2 h-6 w-6" />
            DarkLegacyShop
          </Link>
          <Button variant="outline" size="sm" className="text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-gray-900">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-500 mb-12 animate-pulse shadow-amber-500/50 drop-shadow-lg">
          Unleash Dark Powers
        </h1>
        <Button 
          size="lg" 
          className="text-3xl px-12 py-8 bg-red-900 hover:bg-red-800 text-amber-300 rounded-none border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105 hover:rotate-1"
        >
          Enter Shop
        </Button>
      </main>

      <footer className="bg-black/70 border-t border-amber-900/50 text-amber-500 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {currentYear} DarkLegacyShop. All souls reserved.</p>
        </div>
      </footer>
    </div>
  )
}