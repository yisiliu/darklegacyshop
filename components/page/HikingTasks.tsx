"use client";
import TaskCard from "@/components/TaskCard";

export function HikingTasks() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
        Choose Your Perilous Path
      </h1>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl">
        <TaskCard
          title="Easy"
          description="For novice adventurers"
          buttonText="Route 1: Cross the River"
          isLocked={false}
          href="/tasks/1"
        />
        <TaskCard
          title="Medium"
          description="For seasoned travelers"
          buttonText="Locked"
          isLocked={true}
          href="/tasks/1"
        />
        <TaskCard
          title="Hard"
          description="For legendary heroes"
          buttonText="Locked"
          isLocked={true}
          href="/tasks/1"
        />
      </div>
    </main>
  );
}
