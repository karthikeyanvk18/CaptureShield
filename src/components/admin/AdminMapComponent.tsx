
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import { useGeofence } from '@/context/GeofenceContext';
import { Icon, LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { PlusIcon, MinusIcon, Target } from 'lucide-react';
import MarkerIcon from '../../assets/marker-icon.png';
import MarkerShadow from '../../assets/marker-shadow.png';
import { motion, AnimatePresence } from 'framer-motion';

const customIcon = new Icon({
  iconUrl: MarkerIcon,
  shadowUrl: MarkerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapControls = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleRecenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.setView([position.coords.latitude, position.coords.longitude], 13);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <motion.div 
      className="absolute top-2 right-2 z-[1000] flex flex-col gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white hover:bg-gray-100 shadow-md"
          onClick={handleZoomIn}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          size="icon" 
          variant="secondary"
          className="bg-white hover:bg-gray-100 shadow-md" 
          onClick={handleZoomOut}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          size="icon" 
          variant="secondary"
          className="bg-white hover:bg-gray-100 shadow-md" 
          onClick={handleRecenter}
        >
          <Target className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

const AdminMapComponent: React.FC<{height?: string, className?: string}> = ({ 
  height = "100%",
  className = "",
}) => {
  const { geofences, currentLocation } = useGeofence();
  
  const defaultLocation = currentLocation || { latitude: 37.7749, longitude: -122.4194 };
  const bounds: LatLngBoundsExpression = [
    [defaultLocation.latitude - 0.05, defaultLocation.longitude - 0.05],
    [defaultLocation.latitude + 0.05, defaultLocation.longitude + 0.05]
  ];

  return (
    <motion.div 
      className={`relative ${className}`} 
      style={{ height }} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <MapContainer 
        center={[defaultLocation.latitude, defaultLocation.longitude]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        bounds={bounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapControls />
        
        <AnimatePresence>
          {currentLocation && (
            <Marker 
              position={[currentLocation.latitude, currentLocation.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-medium">Your Current Location</p>
                  <p>Lat: {currentLocation.latitude.toFixed(6)}</p>
                  <p>Lng: {currentLocation.longitude.toFixed(6)}</p>
                </div>
              </Popup>
            </Marker>
          )}
        </AnimatePresence>
        
        {geofences.map((geofence) => (
          <React.Fragment key={geofence.id}>
            <Circle 
              center={[geofence.latitude, geofence.longitude]}
              radius={geofence.radius}
              pathOptions={{
                fillColor: '#0088cc',
                fillOpacity: 0.2,
                color: '#0088cc',
                weight: 2
              }}
            >
              <Popup>
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm"
                >
                  <p className="font-medium">{geofence.name}</p>
                  <p>Radius: {geofence.radius}m</p>
                  <p>Created: {new Date(geofence.createdAt).toLocaleDateString()}</p>
                </motion.div>
              </Popup>
            </Circle>
          </React.Fragment>
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default AdminMapComponent;
