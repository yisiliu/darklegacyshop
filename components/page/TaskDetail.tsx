"use client";
import { useEffect } from "react";
import { TaskDetails } from "@/components/taskDetail/TaskDetailCard";

export function TaskDetail() {
  // useEffect();

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center bg-[#D2FDE3] pt-16">
      <h1 className="text-3xl md:text-5xl font-extrabold text-grey-600 mb-8 text-center">
        CURRENT JOURNEY
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <TaskDetails />
      </div>
    </main>
  );
}
