
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Camera, MapPin, Shield, Layers, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const CameraPage = () => {
  const { user } = useAuth();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'inside' | 'outside' | 'unknown'>('unknown');

  useEffect(() => {
    // Simulate geofence check
    setTimeout(() => {
      // Randomly select inside or outside for demo
      setLocationStatus(Math.random() > 0.5 ? 'inside' : 'outside');
    }, 1500);
  }, []);

  const handleToggleCamera = () => {
    if (locationStatus === 'inside') {
      // If inside geofence, don't allow enabling camera
      toast({
        title: "Camera Restricted",
        description: "Camera is disabled in this geofence zone.",
        variant: "destructive",
      });
      return;
    }
    
    setCameraEnabled(!cameraEnabled);
    toast({
      title: cameraEnabled ? "Camera Disabled" : "Camera Enabled",
      description: cameraEnabled ? "Camera access has been disabled" : "Camera access has been enabled",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Camera className="mr-2 h-6 w-6 text-captureShield-teal" />
        Camera Control
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-captureShield-teal" />
              Camera Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, rotate: cameraEnabled ? 0 : 180 }}
                transition={{ duration: 0.5 }}
                className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  cameraEnabled 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-red-100 dark:bg-red-900'
                }`}
              >
                <Camera 
                  className={`h-16 w-16 ${
                    cameraEnabled 
                      ? 'text-green-500 dark:text-green-400' 
                      : 'text-red-500 dark:text-red-400'
                  }`}
                />
              </motion.div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-medium mb-2">
                Camera is {cameraEnabled ? 'Enabled' : 'Disabled'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {cameraEnabled 
                  ? 'Your device camera is currently accessible' 
                  : 'Your device camera is currently blocked'}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <Label htmlFor="camera-toggle" className={cameraEnabled ? 'text-green-500' : 'text-red-500'}>
                {cameraEnabled ? 'Enabled' : 'Disabled'}
              </Label>
              <Switch 
                id="camera-toggle"
                checked={cameraEnabled}
                onCheckedChange={handleToggleCamera}
                disabled={locationStatus === 'inside'}
              />
            </div>
            
            {locationStatus === 'inside' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 rounded-md"
              >
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-700 dark:text-amber-400">Camera Restricted</h4>
                    <p className="text-sm text-amber-600 dark:text-amber-500">
                      You are inside a restricted geofence zone where camera usage is not allowed.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-captureShield-teal" />
              Geofence Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-8">
              {locationStatus === 'unknown' ? (
                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center animate-pulse">
                  <MapPin className="h-16 w-16 text-gray-400" />
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    locationStatus === 'outside' 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'bg-red-100 dark:bg-red-900'
                  }`}
                >
                  <MapPin 
                    className={`h-16 w-16 ${
                      locationStatus === 'outside' 
                        ? 'text-blue-500 dark:text-blue-400' 
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  />
                </motion.div>
              )}
            </div>
            
            <div className="text-center mb-6">
              {locationStatus === 'unknown' ? (
                <h3 className="text-xl font-medium mb-2">Checking location...</h3>
              ) : (
                <>
                  <h3 className="text-xl font-medium mb-2">
                    {locationStatus === 'outside' 
                      ? 'Outside Restricted Zone' 
                      : 'Inside Restricted Zone'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {locationStatus === 'outside' 
                      ? 'Camera usage is allowed at your current location' 
                      : 'Camera usage is restricted at your current location'}
                  </p>
                </>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <div className="flex items-center">
                <Layers className="h-5 w-5 text-captureShield-teal mr-2" />
                <h4 className="font-medium">Active Geofence Zones</h4>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded">
                  <span>Office Building</span>
                  <Badge status={locationStatus === 'inside' ? 'active' : 'inactive'} />
                </li>
                <li className="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded">
                  <span>Research Lab</span>
                  <Badge status="inactive" />
                </li>
                <li className="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded">
                  <span>Server Room</span>
                  <Badge status="inactive" />
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6 shadow-md">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle>Camera Restriction History</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Zone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">2025-05-09 14:30</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">Office Building</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Restricted</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">45 min</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">2025-05-08 10:15</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">Research Lab</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Restricted</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">2 hr 15 min</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">2025-05-07 16:45</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">Server Room</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">Restricted</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">30 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Badge component for zone status
const Badge = ({ status }: { status: 'active' | 'inactive' }) => {
  return (
    <span 
      className={`inline-block px-2 py-1 text-xs rounded-full ${
        status === 'active' 
          ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
    >
      {status === 'active' ? 'You are here' : 'Inactive'}
    </span>
  );
};

export default CameraPage;
