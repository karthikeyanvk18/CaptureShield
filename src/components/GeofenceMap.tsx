
import React from 'react';
import { useGeofence } from '@/context/GeofenceContext';
import MapComponent from './MapComponent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const GeofenceMap: React.FC = () => {
  const { isInsideAnyGeofence, nearestGeofence } = useGeofence();
  
  const nearest = nearestGeofence();
  const isInside = isInsideAnyGeofence();
  
  return (
    <Card className="relative overflow-hidden shadow-lg border border-gray-200">
      <AnimatePresence>
        {isInside && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Alert variant="destructive" className="mb-2 rounded-t-none">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Restricted Area</AlertTitle>
              <AlertDescription>
                You are inside a restricted zone. Camera functionality is disabled.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      
      <CardContent className="p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <MapComponent height="500px" className="rounded-b-lg" />
        </motion.div>
        
        <AnimatePresence>
          {nearest && !isInside && (
            <motion.div 
              className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md text-sm max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-medium text-gray-900">Nearest geofence:</p>
              <p className="text-gray-700">{nearest.geofence.name}</p>
              <p className="text-gray-500 text-xs">
                {Math.round(nearest.distance)}m away
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default GeofenceMap;
