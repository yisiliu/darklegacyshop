"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HikingTasks } from "@/components/page/HikingTasks";

export function HikingTasksLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <Header />
      <HikingTasks />
      <Footer />
    </div>
  );
}
