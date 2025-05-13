
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGeofence } from '@/context/GeofenceContext';
import { MapPin, Plus, Target, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const { geofences, addGeofence, removeGeofence, currentLocation } = useGeofence();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGeofence = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate inputs
      const latValue = parseFloat(latitude);
      const lngValue = parseFloat(longitude);
      const radiusValue = parseFloat(radius);
      
      if (
        !name || 
        isNaN(latValue) || 
        isNaN(lngValue) || 
        isNaN(radiusValue) || 
        radiusValue <= 0
      ) {
        throw new Error("Invalid input values");
      }
      
      // Add geofence
      addGeofence({
        name,
        latitude: latValue,
        longitude: lngValue,
        radius: radiusValue,
      });
      
      // Reset form
      setName('');
      setLatitude('');
      setLongitude('');
      setRadius('');
      
    } catch (error) {
      console.error("Failed to add geofence:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check all fields are filled correctly",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!currentLocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to get current location",
      });
      return;
    }
    
    setLatitude(currentLocation.latitude.toString());
    setLongitude(currentLocation.longitude.toString());
    
    toast({
      title: "Location Updated",
      description: "Current location coordinates have been added",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 border-captureShield-teal/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-captureShield-darkBlue to-captureShield-teal/90 text-white">
            <CardTitle>Add Restricted Zone</CardTitle>
            <CardDescription className="text-white/80">
              Define a new geofenced area where camera usage will be restricted
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form id="add-geofence-form" onSubmit={handleAddGeofence}>
              <div className="grid gap-4">
                <motion.div 
                  className="grid gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name">Zone Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Office Building"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-captureShield-teal"
                  />
                </motion.div>
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g. 37.7749"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-captureShield-teal"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g. -122.4194"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-captureShield-teal"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="grid gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="radius">Radius (meters)</Label>
                  <Input
                    id="radius"
                    placeholder="e.g. 200"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-captureShield-teal"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full mt-2 bg-white hover:bg-gray-100 border-captureShield-teal text-captureShield-teal hover:text-captureShield-darkBlue transition-all duration-300"
                    onClick={handleUseCurrentLocation}
                  >
                    <Target className="mr-2 h-4 w-4 animate-pulse" /> Use Current Location
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button 
              type="submit" 
              form="add-geofence-form"
              className="w-full bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue hover:from-captureShield-darkBlue hover:to-captureShield-teal transition-all duration-500 transform hover:scale-[1.02] shadow-md"
              disabled={isLoading}
            >
              <Plus className="mr-2 h-4 w-4" /> 
              {isLoading ? "Adding..." : "Add Zone"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Managed Restricted Zones</h3>
        
        {geofences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-muted/50">
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <MapPin className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No restricted zones defined yet</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {geofences.map((geofence) => (
              <motion.div key={geofence.id} variants={item}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-captureShield-teal/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-captureShield-darkBlue">{geofence.name}</h4>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>Location: {geofence.latitude.toFixed(5)}, {geofence.longitude.toFixed(5)}</p>
                          <p>Radius: {geofence.radius} meters</p>
                          <p>Created: {format(new Date(geofence.createdAt), 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-destructive hover:text-white hover:bg-destructive transition-colors duration-300"
                        onClick={() => removeGeofence(geofence.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
