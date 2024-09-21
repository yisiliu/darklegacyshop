import { TaskDetails } from "@/components/taskDetail/TaskDetailCard";

export function TaskDetail() {
  const checkpoints = [
    "Reach the river bank",
    "Cross the stepping stones",
    "Navigate the rickety bridge",
    "Arrive at the ancient forest",
  ];

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center bg-[#D2FDE3]">
      <h1 className="text-3xl md:text-5xl font-extrabold text-grey-600 mb-8 text-center">
        CURRENT JOURNEY
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <TaskDetails />
      </div>
    </main>
  );
}
