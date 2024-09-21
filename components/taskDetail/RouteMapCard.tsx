"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export function RouteMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Example route coordinates (replace with your actual route)
  const routePoints: [number, number][] = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];

  return (
    <div className="h-64 rounded-lg overflow-hidden">
      {isMounted && (
        <MapContainer
          center={routePoints[0]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={routePoints} color="red" />
          {routePoints.map((point, index) => (
            <Marker key={index} position={point}>
              <Popup>Point {index + 1}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
