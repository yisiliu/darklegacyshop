import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MapShardSelection } from "@/components/page/MapSelection";

export function MapShardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
          Unlock the Ancient Forest Map
        </h1>
        <MapShardSelection />
      </main>
      <Footer />
    </div>
  );
}
