
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useGeofence } from '@/context/GeofenceContext';
import { Camera, Lock, Unlock, AlertTriangle, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/components/ui/use-toast";

const CameraStatus: React.FC = () => {
  const { 
    isInsideAnyGeofence, 
    nearestGeofence, 
    cameraPermissionGranted,
    requestCameraPermission
  } = useGeofence();
  
  const [isBlocked, setIsBlocked] = useState(isInsideAnyGeofence());
  const [showDetails, setShowDetails] = useState(false);
  const [deviceCameraOn, setDeviceCameraOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const nearest = nearestGeofence();

  // Effect to set blocked status based on geofence
  useEffect(() => {
    setIsBlocked(isInsideAnyGeofence());
    
    // Stop camera if user enters a restricted zone
    if (isInsideAnyGeofence() && stream) {
      stopCamera();
      toast({
        title: "Camera Disabled",
        description: "You entered a restricted zone. Camera access has been disabled.",
        variant: "destructive",
      });
    }
  }, [isInsideAnyGeofence, stream]);

  const startCamera = async () => {
    if (isInsideAnyGeofence()) {
      toast({
        title: "Camera Access Denied",
        description: "You are in a restricted zone. Camera access is not allowed here.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const granted = await requestCameraPermission();
      if (!granted) return;
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setDeviceCameraOn(true);
      
      toast({
        title: "Camera Active",
        description: "Camera is now streaming. Exit the test when done.",
      });
    } catch (error) {
      console.error("Error starting camera:", error);
      toast({
        title: "Camera Error",
        description: "Failed to access camera. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setDeviceCameraOn(false);
      
      toast({
        title: "Camera Stopped",
        description: "Camera stream has been stopped",
      });
    }
  };

  const cameraStatusVariants = {
    disabled: {
      scale: [1, 0.97, 1],
      opacity: [1, 0.9, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    },
    enabled: {
      scale: 1,
      opacity: 1
    }
  };

  const mapPoints = [
    { x: 20, y: 30 },
    { x: 40, y: 15 },
    { x: 60, y: 40 },
    { x: 80, y: 20 },
    { x: 30, y: 50 },
    { x: 70, y: 60 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className="w-full overflow-hidden border-2 border-captureShield-teal/20 shadow-lg dark:bg-gray-800 dark:border-captureShield-teal/10">
        <CardHeader className={`${
          isBlocked 
            ? 'bg-gradient-to-r from-red-500 to-orange-500' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-500'
        } text-white`}>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Camera Status
          </CardTitle>
          <CardDescription className="text-white/90">
            {isBlocked
              ? "Camera access is currently restricted"
              : "Camera access is currently allowed"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div 
            className={`p-6 ${isBlocked ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}
            variants={cameraStatusVariants}
            animate={isBlocked ? "disabled" : "enabled"}
          >
            {deviceCameraOn && !isBlocked && (
              <div className="mb-4 relative rounded-lg overflow-hidden shadow-lg">
                <video
                  ref={(videoElement) => {
                    if (videoElement && stream) {
                      videoElement.srcObject = stream;
                      videoElement.play().catch(e => console.error("Error playing video:", e));
                    }
                  }}
                  className="w-full h-48 object-cover bg-black"
                  autoPlay
                  playsInline
                  muted
                />
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="rounded-full w-8 h-8 p-0" 
                    onClick={stopCamera}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <motion.div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Badge className="bg-green-500/80 backdrop-blur-sm">Live Camera Feed</Badge>
                </motion.div>
              </div>
            )}
            
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isBlocked ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" as const }}
                    >
                      <Lock className="h-10 w-10 text-red-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "loop" as const, ease: "linear" }}
                    >
                      <Unlock className="h-10 w-10 text-green-500" />
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  {isBlocked ? (
                    <Badge className="bg-red-500 text-white">Disabled</Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  )}
                </motion.div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {isBlocked ? "Camera Disabled" : "Camera Enabled"}
              </h3>
              
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {isBlocked ? (
                    <>You are in a restricted zone. All camera functionality is disabled.</>
                  ) : (
                    <>You are outside restricted zones. Camera is fully operational.</>
                  )}
                </p>
                
                {!isBlocked && !deviceCameraOn && (
                  <Button 
                    onClick={startCamera}
                    className="bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Test Camera Access
                  </Button>
                )}
                
                {deviceCameraOn && (
                  <Button 
                    onClick={stopCamera}
                    variant="outline"
                    className="border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Stop Camera
                  </Button>
                )}
              </div>

              <Button 
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className={`text-sm w-full ${
                  isBlocked ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'
                }`}
              >
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>
          </motion.div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 border-t border-border dark:border-gray-700 space-y-4">
                  <h4 className="font-medium dark:text-white">Device Restrictions</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Camera API Access</span>
                      {isBlocked ? (
                        <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-800 flex items-center gap-1">
                          <X className="h-3 w-3" /> Blocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-800 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Allowed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Screenshot Capability</span>
                      {isBlocked ? (
                        <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-800 flex items-center gap-1">
                          <X className="h-3 w-3" /> Blocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-800 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Allowed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Screen Recording</span>
                      <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-800 flex items-center gap-1">
                        <X className="h-3 w-3" /> Always Blocked
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Camera Permission</span>
                      {cameraPermissionGranted === null ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-200 dark:border-amber-800 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Not Requested
                        </Badge>
                      ) : cameraPermissionGranted ? (
                        <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-800 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Granted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-800 flex items-center gap-1">
                          <X className="h-3 w-3" /> Denied
                        </Badge>
                      )}
                    </div>
                  </div>

                  {nearest && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-medium mb-2 dark:text-white">Geofence Information</h4>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm">
                            <span className="font-medium text-gray-600 dark:text-gray-300">Nearest zone:</span> {nearest.geofence.name}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-600 dark:text-gray-300">Distance:</span> {nearest.distance.toFixed(0)} meters
                          </p>
                        </div>
                        
                        <div className="w-24 h-24 relative">
                          <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                            {mapPoints.map((point, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-captureShield-darkBlue dark:bg-captureShield-teal"
                                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "loop" as const,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                            <motion.div
                              className="w-3 h-3 bg-red-500 rounded-full absolute"
                              style={{ 
                                left: '50%', 
                                top: '50%', 
                                marginLeft: -6, 
                                marginTop: -6 
                              }}
                              animate={{
                                boxShadow: [
                                  '0 0 0 0 rgba(239, 68, 68, 0.4)',
                                  '0 0 0 10px rgba(239, 68, 68, 0)',
                                ]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop" as const
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {isBlocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 flex items-start gap-2"
                    >
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 dark:text-amber-200">
                        You must exit the restricted zone to regain camera access. The system will automatically re-enable the camera when you leave the zone.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CameraStatus;
