
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGeofence } from '@/context/GeofenceContext';
import { toast } from "@/components/ui/use-toast";

interface MapComponentProps {
  height?: string;
  className?: string;
}

// Mapbox token (in a real app, this should come from environment variables)
// This is a temporary public token for demo purposes
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2FydGhpa2V5YW5wYXZpIiwiYSI6ImNtYWZsdjExMTAzdG0ya3F3MDlsOWlwajkifQ.ahklMCJXG7y_tQ33Ej3I8g';
                      
const MapComponent: React.FC<MapComponentProps> = ({ height = '300px', className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { geofences, currentLocation, isInsideAnyGeofence } = useGeofence();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userToken, setUserToken] = useState<string>('');
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const geofenceCirclesRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const geofenceSourcesRef = useRef<string[]>([]);

  // Handle custom token input
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userToken.trim()) {
      localStorage.setItem('mapbox_token', userToken.trim());
      toast({
        title: "Token Updated",
        description: "Map will refresh with your Mapbox token.",
      });
      window.location.reload();
    }
  };

  useEffect(() => {
    // Check if there's a stored token
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setUserToken(storedToken);
      mapboxgl.accessToken = storedToken;
    } else {
      mapboxgl.accessToken = MAPBOX_TOKEN;
    }

    // If no map and container exists, initialize map
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [currentLocation?.longitude || -122.4194, currentLocation?.latitude || 37.7749],
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        setMapLoaded(true);
      });
    }

    return () => {
      // Cleanup markers when component unmounts
      Object.values(markersRef.current).forEach(marker => marker.remove());
      Object.values(geofenceCirclesRef.current).forEach(circle => circle.remove());
      if (userMarkerRef.current) userMarkerRef.current.remove();
      
      // Remove map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map when geofences or location changes
  useEffect(() => {
    if (mapLoaded && map.current) {
      // Remove existing geofence sources and layers
      geofenceSourcesRef.current.forEach(id => {
        if (map.current?.getLayer(`${id}-fill`)) {
          map.current.removeLayer(`${id}-fill`);
        }
        if (map.current?.getLayer(`${id}-outline`)) {
          map.current.removeLayer(`${id}-outline`);
        }
        if (map.current?.getSource(id)) {
          map.current.removeSource(id);
        }
      });
      geofenceSourcesRef.current = [];

      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => marker.remove());
      Object.values(geofenceCirclesRef.current).forEach(circle => circle.remove());
      markersRef.current = {};
      geofenceCirclesRef.current = {};

      // Add geofence circles using layers for better visualization
      geofences.forEach(geofence => {
        // Skip if map is not fully loaded
        if (!map.current || !map.current.isStyleLoaded()) return;

        // Create a unique ID for this geofence
        const id = `geofence-${geofence.id}`;
        geofenceSourcesRef.current.push(id);

        // Add a GeoJSON source for the geofence circle
        map.current.addSource(id, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [geofence.longitude, geofence.latitude]
            },
            properties: {
              name: geofence.name,
              radius: geofence.radius
            }
          }
        });

        // Add a fill layer for the geofence circle
        map.current.addLayer({
          id: `${id}-fill`,
          type: 'circle',
          source: id,
          paint: {
            'circle-radius': ['get', 'radius'],
            'circle-color': 'rgba(25, 167, 206, 0.2)',
            'circle-opacity': 0.8,
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(25, 167, 206, 0.6)'
          }
        });

        // Add an outline layer for the geofence circle
        map.current.addLayer({
          id: `${id}-outline`,
          type: 'circle',
          source: id,
          paint: {
            'circle-radius': ['get', 'radius'],
            'circle-color': 'transparent',
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(25, 167, 206, 0.8)'
          }
        });

        // Create a custom marker element for the center point
        const el = document.createElement('div');
        el.className = 'geofence-marker';
        el.innerHTML = `
          <div class="w-5 h-5 bg-captureShield-teal rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg"></div>
          <div class="text-xs font-semibold bg-white px-2 py-1 rounded shadow-md mt-2 whitespace-nowrap">
            ${geofence.name}
          </div>
        `;
        
        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([geofence.longitude, geofence.latitude])
          .addTo(map.current);
        
        markersRef.current[geofence.id] = marker;
      });
    }
  }, [geofences, mapLoaded]);

  // Update user location marker
  useEffect(() => {
    if (mapLoaded && map.current && currentLocation) {
      // Remove existing user marker
      if (userMarkerRef.current) userMarkerRef.current.remove();
      
      // Create user location marker
      const userEl = document.createElement('div');
      userEl.className = 'user-location-marker';
      
      const isInside = isInsideAnyGeofence();
      const markerColor = isInside ? 'bg-red-500' : 'bg-green-500';
      
      userEl.innerHTML = `
        <div class="relative">
          <div class="w-6 h-6 ${markerColor} rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div class="text-xs font-semibold bg-white/90 px-2 py-1 rounded shadow-sm mt-2 text-center backdrop-blur-sm">
            ${isInside ? 'Restricted' : 'Safe Zone'}
          </div>
        </div>
      `;
      
      // Create and add the user marker
      const userMarker = new mapboxgl.Marker(userEl)
        .setLngLat([currentLocation.longitude, currentLocation.latitude])
        .addTo(map.current);
      
      userMarkerRef.current = userMarker;
      
      // Center map on user location
      map.current.flyTo({
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: 14,
        speed: 1.5,
        essential: true
      });
    }
  }, [currentLocation, mapLoaded, isInsideAnyGeofence]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} style={{ height }} className="rounded-lg shadow-lg"></div>
      
      {!MAPBOX_TOKEN && !localStorage.getItem('mapbox_token') && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <h3 className="font-medium mb-2">Map API Token Required</h3>
            <p className="text-sm text-gray-600 mb-4">Please enter your Mapbox API token to enable maps</p>
            <form onSubmit={handleTokenSubmit} className="space-y-2">
              <input 
                type="text" 
                value={userToken} 
                onChange={(e) => setUserToken(e.target.value)} 
                className="w-full px-3 py-2 border rounded text-sm"
                placeholder="Enter your Mapbox token"
              />
              <button 
                type="submit"
                className="w-full bg-captureShield-teal text-white py-2 rounded text-sm"
              >
                Save Token
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
