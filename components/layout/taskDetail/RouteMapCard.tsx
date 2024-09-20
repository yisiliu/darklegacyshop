"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export function RouteMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Example coordinates (replace with your actual route coordinates)
  const position: [number, number] = [51.505, -0.09];

  return (
    <Card className="bg-gray-800 border-amber-500 text-amber-300">
      <CardHeader>
        <CardTitle className="text-2xl">Route Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 rounded-lg overflow-hidden">
          {isMounted && (
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>A sample marker</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
