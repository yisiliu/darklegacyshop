"use client";

import { TaskDetails } from "./taskDetail/TaskDetailCard";
import { RouteMap } from "./taskDetail/RouteMapCard";
import { TaskProgress } from "./taskDetail/ProgressCard";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function EasyTaskDetail() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
          Route 1: Cross the River
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <TaskDetails />
          <div className="space-y-8">
            <RouteMap />
            <TaskProgress />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
