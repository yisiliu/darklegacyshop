import UserInfoCard from "@/components/UserInfo/UserInfoCard";
import LegacyStorageCard from "@/components/UserInfo/LegacyInventory";
import KeyInventoryCard from "@/components/UserInfo/KeyInventory";

export function UserInfo() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
        Adventurer's Profile
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        <UserInfoCard />
        <LegacyStorageCard />
        <KeyInventoryCard />
      </div>
    </main>
  );
}
