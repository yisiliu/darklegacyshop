import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Key } from "lucide-react";

const ReceiveKey = () => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="bg-gray-800 border-2 border-amber-500 text-amber-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-500">
            Map Shard Unlocked!
          </DialogTitle>
          <DialogDescription className="text-lg text-amber-400">
            You've discovered a key to unlock a new map shard.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex items-center justify-center">
          <Key className="h-16 w-16 text-amber-500 animate-pulse" />
        </div>
        <p className="mt-4 text-center">
          This key reveals hidden paths and secrets on your journey. Use it
          wisely to uncover the mysteries of the ancient forest.
        </p>
        <Button
          onClick={() => setIsDialogOpen(false)}
          className="mt-4 w-full bg-red-900 hover:bg-red-800 text-amber-300 border-2 border-amber-500 shadow-lg shadow-red-900/50 transform transition-all duration-200 hover:scale-105"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveKey;
