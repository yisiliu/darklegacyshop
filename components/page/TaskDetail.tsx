import { TaskDetails } from "@/components/taskDetail/TaskDetailCard";
import { RouteMap } from "@/components/taskDetail/RouteMapCard";
import { TaskProgress } from "@/components/taskDetail/ProgressCard";

export function TaskDetail() {
  return (
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
  );
}
