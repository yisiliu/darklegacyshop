"use client";

import { TrailForm } from "@/components/trailManagement/TrailForm";
import { useTrailData } from "@/hooks/useTrailData";

export function CreateTrailLayout() {
  const {
    TrailData,
    addLocation,
    removeLocation,
    updateLocation,
    updateBlockLimit,
    updatePublicKey,
    setDifficulty,
  } = useTrailData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Trail Data:", TrailData);
    // Here you would typically send the data to your backend or perform further actions
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-8 text-center">
        Create New Trail
      </h1>

      <TrailForm
        TrailData={TrailData}
        addLocation={addLocation}
        removeLocation={removeLocation}
        updateLocation={updateLocation}
        updateBlockLimit={updateBlockLimit}
        updatePublicKey={updatePublicKey}
        setDifficulty={setDifficulty}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
