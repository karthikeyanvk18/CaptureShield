
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface LocationState {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  error: string | null;
  timestamp: number | null;
  isLoading: boolean;
}

export function useDeviceLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 37.7749,
    longitude: -122.4194,
    accuracy: null,
    error: null,
    timestamp: null,
    isLoading: true
  });
  
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  useEffect(() => {
    let watchId: number;

    const getLocation = async () => {
      if (!navigator.geolocation) {
        setLocation(prevState => ({
          ...prevState,
          error: "Geolocation is not supported by this browser.",
          isLoading: false
        }));
        return;
      }

      try {
        // Check if permission is already granted
        const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        setPermissionGranted(result.state === 'granted');
        
        // Set up watch position to continuously track location
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              error: null,
              timestamp: position.timestamp,
              isLoading: false
            });
            setPermissionGranted(true);
          },
          (error) => {
            console.error("Location error:", error);
            setLocation(prevState => ({
              ...prevState,
              error: error.message,
              isLoading: false
            }));
            
            if (error.code === error.PERMISSION_DENIED) {
              setPermissionGranted(false);
              toast({
                title: "Location Access Denied",
                description: "Please enable location services to use all features of the app.",
                variant: "destructive",
              });
            }
          },
          { 
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000
          }
        );
      } catch (error) {
        console.error("Location permission error:", error);
        setPermissionGranted(false);
        setLocation(prevState => ({
          ...prevState,
          error: error instanceof Error ? error.message : "Unknown error getting location",
          isLoading: false
        }));
      }
    };

    getLocation();

    // Cleanup function to clear the watch
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const requestPermission = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
        timestamp: position.timestamp,
        isLoading: false
      });
      
      setPermissionGranted(true);
      toast({
        title: "Location Access Granted",
        description: "Your device location will now be used for geofencing.",
      });
      
      return true;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      let errorMessage = "Failed to get permission for location";
      
      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied. Please enable location in your settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out.";
        }
      }
      
      setPermissionGranted(false);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  return {
    ...location,
    permissionGranted,
    requestPermission
  };
}
