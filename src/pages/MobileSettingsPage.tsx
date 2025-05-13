
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Smartphone, Camera, MapPin, Compass } from "lucide-react";
import { useGeofence } from '@/context/GeofenceContext';
import { toast } from "@/components/ui/use-toast";

const MobileSettingsPage = () => {
  const { currentLocation } = useGeofence();

  const handlePermissionRequest = (permission: string) => {
    toast({
      title: `${permission} Permission Requested`,
      description: `${permission} permission has been requested successfully.`,
      variant: "default", // Changed from "success" to "default"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Button variant="outline" asChild className="mb-6">
          <Link to="/">← Back to Dashboard</Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-captureShield-darkBlue mb-2 flex items-center gap-2">
          <Smartphone className="h-7 w-7 text-captureShield-teal" />
          Mobile Device Settings
        </h1>
        <p className="text-muted-foreground mb-6">
          Configure how CaptureShield interacts with your mobile device
        </p>

        <Alert className="mb-6 border-captureShield-teal">
          <Shield className="h-4 w-4" />
          <AlertTitle>Runtime Permissions</AlertTitle>
          <AlertDescription>
            CaptureShield requires specific device permissions to function properly. These permissions are requested at runtime.
          </AlertDescription>
        </Alert>
      </motion.div>
      
      <Tabs defaultValue="permissions">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="permissions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
            Permissions
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
            Location
          </TabsTrigger>
          <TabsTrigger value="camera" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
            Camera
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Permissions</CardTitle>
              <CardDescription>These permissions are necessary for CaptureShield to function properly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <motion.div 
                  className="border rounded-lg p-4"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-captureShield-teal/10 p-2 rounded-full">
                        <Camera className="h-5 w-5 text-captureShield-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Camera Access</h3>
                        <p className="text-sm text-muted-foreground">Required to enforce camera restrictions in restricted zones</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => handlePermissionRequest('Camera')}>
                      Request
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="border rounded-lg p-4"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-captureShield-teal/10 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-captureShield-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Precise Location</h3>
                        <p className="text-sm text-muted-foreground">Required to determine if you're in a restricted zone</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => handlePermissionRequest('Location')}>
                      Request
                    </Button>
                  </div>
                </motion.div>

                <motion.div 
                  className="border rounded-lg p-4"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-captureShield-teal/10 p-2 rounded-full">
                        <Compass className="h-5 w-5 text-captureShield-teal" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Background Location</h3>
                        <p className="text-sm text-muted-foreground">Required to monitor location even when app is in background</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => handlePermissionRequest('Background Location')}>
                      Request
                    </Button>
                  </div>
                </motion.div>
              </div>
              
              <Alert variant="default" className="mt-4 bg-slate-100 dark:bg-slate-900 border-none">
                <AlertDescription>
                  All permissions are required for CaptureShield to properly enforce camera restrictions in geofenced areas. The app cannot function properly without these permissions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Settings</CardTitle>
              <CardDescription>Configure how location services work in CaptureShield</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Current Location</h3>
                  {currentLocation ? (
                    <p className="text-sm font-mono">
                      {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Retrieving location...</p>
                  )}
                </div>
                
                <div className="grid gap-4">
                  <Button onClick={() => handlePermissionRequest('GPS Location')}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Enable Device GPS
                  </Button>
                  
                  <Button variant="outline" onClick={() => handlePermissionRequest('Background Location')}>
                    <Compass className="mr-2 h-4 w-4" />
                    Allow Background Tracking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="camera" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Settings</CardTitle>
              <CardDescription>Configure how camera restrictions work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Camera Enforcement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    When enabled, camera access will be automatically restricted when entering geofenced areas.
                  </p>
                  <Button onClick={() => handlePermissionRequest('Camera Access')}>
                    <Camera className="mr-2 h-4 w-4" />
                    Grant Camera Permissions
                  </Button>
                </div>
                
                <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <AlertTitle className="text-amber-800 dark:text-amber-300">Important Note</AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400">
                    When in a restricted zone, CaptureShield will attempt to disable all camera functionality on your device, including third-party apps.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileSettingsPage;
