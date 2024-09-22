"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface RouteMapProps {
  progress: number;
}

export function RouteMap({ progress }: RouteMapProps) {
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
          {routePoints.map(
            (point, index) =>
              index < routePoints.length - 1 && (
                <Polyline
                  key={index}
                  positions={[routePoints[index], routePoints[index + 1]]}
                  color={index > progress - 2 ? "gray" : "pink"}
                  weight={7}
                  dashArray={index > progress - 2 ? "10, 10" : "0"}
                  lineCap="round"
                  lineJoin="round"
                />
              ),
          )}
          {routePoints.map((point, index) => (
            <>
              <CircleMarker
                key={index}
                center={point}
                radius={14}
                color={index < progress ? "pink" : "gray"}
                fillColor={index < progress ? "#FF69B4" : "#D3D3D3"}
                fillOpacity={1}
              />
            </>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
