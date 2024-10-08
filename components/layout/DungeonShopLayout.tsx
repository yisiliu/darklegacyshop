import { Footer } from "@/components/layout/Footer";
import { HomeContent } from "@/components/page/HomeContent";

export function DungeonShopLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <HomeContent />
      <Footer />
    </div>
  );
}
