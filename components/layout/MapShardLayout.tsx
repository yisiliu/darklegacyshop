import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MapShardSelection } from "@/components/page/MapSelection";

export function MapShardLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat space-y-15">
      <Header />
      <main className="flex-grow overflow-auto">
        <MapShardSelection />
      </main>
      <Footer />
    </div>
  );
}
