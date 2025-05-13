
import React, { createContext, useContext,useRef, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useDeviceLocation } from '@/hooks/use-device-location';

export interface Geofence {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  createdAt: Date;
}

interface GeofenceContextType {
  geofences: Geofence[];
  currentLocation: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  addGeofence: (geofence: Omit<Geofence, 'id' | 'createdAt'>) => void;
  removeGeofence: (id: string) => void;
  isInsideAnyGeofence: () => boolean;
  simulateLocationChange: (latitude: number, longitude: number) => void;
  nearestGeofence: () => { geofence: Geofence; distance: number } | null;
  locationPermissionGranted: boolean | null;
  requestLocationPermission: () => Promise<boolean>;
  isUsingDeviceLocation: boolean;
  cameraPermissionGranted: boolean | null;
  requestCameraPermission: () => Promise<boolean>;
}

// Mock initial geofences
const initialGeofences: Geofence[] = [
  {
    id: '1',
    name: 'Office Building',
    latitude: 37.7749,
    longitude: -122.4194,
    radius: 200,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Research Lab',
    latitude: 37.7848,
    longitude: -122.4289,
    radius: 150,
    createdAt: new Date('2023-02-20')
  }
];

const GeofenceContext = createContext<GeofenceContextType | undefined>(undefined);

export const useGeofence = () => {
  const context = useContext(GeofenceContext);
  if (!context) {
    throw new Error('useGeofence must be used within a GeofenceProvider');
  }
  return context;
};

interface GeofenceProviderProps {
  children: ReactNode;
}

export const GeofenceProvider = ({ children }: GeofenceProviderProps) => {
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isUsingDeviceLocation, setIsUsingDeviceLocation] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState<boolean | null>(null);
  const lastZoneAlertTimeRef = useRef<number>(0);

  // Use the device location hook
  const deviceLocation = useDeviceLocation();
useEffect(() => {
  if (
    deviceLocation.permissionGranted &&
    !deviceLocation.isLoading &&
    !deviceLocation.error
  ) {
    setCurrentLocation({
      latitude: deviceLocation.latitude,
      longitude: deviceLocation.longitude,
    });
    setIsUsingDeviceLocation(true);

    const now = Date.now();
    const isInside = isInsideAnyGeofence();

    console.log("checking cooldown: ", {
      now,
      last: lastZoneAlertTimeRef.current,
      diff: now - lastZoneAlertTimeRef.current,
    });

    if (isInside && now - lastZoneAlertTimeRef.current > 60 * 1000) {
      lastZoneAlertTimeRef.current = now;

      toast({
        title: "Restricted Area",
        description: "You are in a camera-restricted zone. Camera access disabled.",
        variant: "destructive",
      });
    }
  }
}, [
  deviceLocation.latitude,
  deviceLocation.longitude,
  deviceLocation.permissionGranted,
  deviceLocation.isLoading,
  deviceLocation.error,
]);




  // Load geofences on mount
  useEffect(() => {
    const loadGeofences = async () => {
      try {
        const storedGeofences = localStorage.getItem('captureShieldGeofences');
        if (storedGeofences) {
          const parsedGeofences = JSON.parse(storedGeofences);
          // Convert string dates back to Date objects
          const formattedGeofences = parsedGeofences.map((g: any) => ({
            ...g,
            createdAt: new Date(g.createdAt)
          }));
          setGeofences(formattedGeofences);
        } else {
          // Use initial geofences if none stored
          setGeofences(initialGeofences);
          localStorage.setItem('captureShieldGeofences', JSON.stringify(initialGeofences));
        }
        
        // Set default current location if device location not available
        if (!isUsingDeviceLocation) {
          setCurrentLocation({ latitude: 37.7749, longitude: -122.4191 });
        }
        
        // Check for camera permission
        if ('permissions' in navigator) {
          try {
            const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
            setCameraPermissionGranted(cameraPermission.state === 'granted');
            
            cameraPermission.onchange = () => {
              setCameraPermissionGranted(cameraPermission.state === 'granted');
            };
          } catch (error) {
            console.error("Camera permission check error:", error);
          }
        }
        
      } catch (error) {
        console.error('Error loading geofences:', error);
        toast({
          title: "Error",
          description: "Failed to load geofence data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadGeofences();
  }, []);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = 
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  // Check if current location is inside any geofence
  const isInsideAnyGeofence = (): boolean => {
    if (!currentLocation) return false;
    
    return geofences.some(geofence => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        geofence.latitude,
        geofence.longitude
      );
      return distance <= geofence.radius;
    });
  };

  // Get the nearest geofence and distance to it
  const nearestGeofence = () => {
    if (!currentLocation || geofences.length === 0) return null;
    
    let nearest = {
      geofence: geofences[0],
      distance: calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        geofences[0].latitude,
        geofences[0].longitude
      )
    };
    
    for (let i = 1; i < geofences.length; i++) {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        geofences[i].latitude,
        geofences[i].longitude
      );
      
      if (distance < nearest.distance) {
        nearest = { geofence: geofences[i], distance };
      }
    }
    
    return nearest;
  };

  // Add a new geofence
  const addGeofence = (geofence: Omit<Geofence, 'id' | 'createdAt'>) => {
    const newGeofence: Geofence = {
      ...geofence,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const updatedGeofences = [...geofences, newGeofence];
    setGeofences(updatedGeofences);
    localStorage.setItem('captureShieldGeofences', JSON.stringify(updatedGeofences));
    
    toast({
      title: "Geofence Added",
      description: `${geofence.name} has been added successfully`,
    });
  };

  // Remove a geofence
  const removeGeofence = (id: string) => {
    const updatedGeofences = geofences.filter(geofence => geofence.id !== id);
    setGeofences(updatedGeofences);
    localStorage.setItem('captureShieldGeofences', JSON.stringify(updatedGeofences));
    
    toast({
      title: "Geofence Removed",
      description: "Geofence has been removed successfully",
    });
  };

const simulateLocationChange = (latitude: number, longitude: number) => {
  setCurrentLocation({ latitude, longitude });
  setIsUsingDeviceLocation(false);

  setTimeout(() => {
    const now = Date.now();
    const isInside = isInsideAnyGeofence();

    console.log("simulated check:", {
      now,
      last: lastZoneAlertTimeRef.current,
      diff: now - lastZoneAlertTimeRef.current,
    });

    if (now - lastZoneAlertTimeRef.current > 60 * 1000) {
      lastZoneAlertTimeRef.current = now;

      if (isInside) {
        toast({
          title: "Restricted Area",
          description: "You are in a camera-restricted zone. Camera access disabled.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Outside Restricted Zone",
          description: "Camera access enabled.",
        });
      }
    }
  }, 500);
};
  // Request location permission
  const requestLocationPermission = async () => {
    const result = await deviceLocation.requestPermission();
    if (result) {
      setIsUsingDeviceLocation(true);
    }
    return result;
  };

  // Request camera permission
  const requestCameraPermission = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Error",
        description: "Camera API is not supported in this browser",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Request camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      setCameraPermissionGranted(true);
      toast({
        title: "Camera Access Granted",
        description: "Camera permissions have been granted successfully",
      });
      
      // Check if in geofence and notify about camera restrictions
      if (isInsideAnyGeofence()) {
        toast({
          title: "Warning",
          description: "You are in a restricted zone. Camera will be disabled.",
          variant: "destructive",
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setCameraPermissionGranted(false);
      
      toast({
        title: "Camera Access Denied",
        description: "Camera permission was denied. Some features will be limited.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const value = {
    geofences,
    currentLocation,
    isLoading,
    addGeofence,
    removeGeofence,
    isInsideAnyGeofence,
    simulateLocationChange,
    nearestGeofence,
    locationPermissionGranted: deviceLocation.permissionGranted,
    requestLocationPermission,
    isUsingDeviceLocation,
    cameraPermissionGranted,
    requestCameraPermission,
  };

  return <GeofenceContext.Provider value={value}>{children}</GeofenceContext.Provider>;
};
