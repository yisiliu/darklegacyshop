"use client";
import TrailCard from "@/components/TrailCard";

export function HikingTrails() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center bg-[#D2FDE3] pt-16 sm:pt-0">
      <h1 className="text-4xl md:text-5xl font-extrabold text-grey-600 mb-8 text-center">
        PERILOUS PATH SELECTION
      </h1>
      <p className="text-black-400 text-lg mb-6 text-center">
        Choose your perilous path, brave soul. Each trail leads to a different
        dark adventure, fraught with danger and untold riches.
      </p>
      <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl">
        <TrailCard
          title="Easy"
          description="For novice adventurers"
          buttonText="Route 1: Cross the River"
          isLocked={false}
          href="/trails/1"
        />
        <TrailCard
          title="Medium"
          description="For seasoned travelers"
          buttonText="Coming Soon"
          isLocked={true}
          href="/trails/1"
        />
        <TrailCard
          title="Hard"
          description="For legendary heroes"
          buttonText="Coming Soon"
          isLocked={true}
          href="/trails/1"
        />
      </div>
    </main>
  );
}
