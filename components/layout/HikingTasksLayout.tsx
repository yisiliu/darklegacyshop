import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HikingTasks } from "@/components/page/HikingTrails";

export function HikingTasksLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat space-y-15">
      <Header />
      <HikingTasks />
      <Footer />
    </div>
  );
}
