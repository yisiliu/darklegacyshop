import UserInfoCard from "@/components/UserInfo/UserInfoCard";
import LegacyStorageCard from "@/components/UserInfo/LegacyInventory";
import KeyInventoryCard from "@/components/UserInfo/KeyInventory";

export function UserInfo() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center bg-[#D2FDE3]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-grey-600 mb-8 text-center">
        PROFILE
      </h1>
      <div className="grid gap-8 md:grid-cols-3">
        <UserInfoCard />
        <LegacyStorageCard />
        <KeyInventoryCard />
      </div>
    </main>
  );
}
