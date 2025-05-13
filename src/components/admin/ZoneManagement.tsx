
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, List, Plus, Target, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeofence } from '@/context/GeofenceContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import AdminMapComponent from './AdminMapComponent';
import { Badge } from '@/components/ui/badge';

type ZoneFormValues = {
  name: string;
  latitude: string;
  longitude: string;
  radius: string;
  type: string;
};

const ZoneManagement = () => {
  const { addGeofence, geofences, currentLocation } = useGeofence();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<ZoneFormValues>();

  const onSubmit = (data: ZoneFormValues) => {
    try {
      const latValue = parseFloat(data.latitude);
      const lngValue = parseFloat(data.longitude);
      const radiusValue = parseFloat(data.radius);
      
      if (isNaN(latValue) || isNaN(lngValue) || isNaN(radiusValue) || radiusValue <= 0) {
        throw new Error("Invalid input values");
      }
      
      addGeofence({
        name: data.name,
        latitude: latValue,
        longitude: lngValue,
        radius: radiusValue,
      });
      
      toast({
        title: "Zone Created",
        description: `${data.name} has been successfully created`,
      });
      
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to add zone:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check all fields are filled correctly",
      });
    }
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setValue('latitude', currentLocation.latitude.toString());
      setValue('longitude', currentLocation.longitude.toString());
      toast({
        title: "Location Updated",
        description: "Current location coordinates have been added",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to get current location",
      });
    }
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <motion.div
          initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          animate={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
          transition={{ duration: 1 }}
        >
          <CardHeader className="border-b pb-3 bg-white">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-captureShield-teal" />
                Geofence Zone Management
              </CardTitle>
              <CardDescription>Create, edit and delete restricted camera zones</CardDescription>
            </motion.div>
          </CardHeader>
        </motion.div>
        <CardContent className="pt-6 bg-white">
          <div className="mb-8">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue">
                    <Plus className="mr-2 h-4 w-4" /> Create New Zone
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Create New Zone</DialogTitle>
                    <DialogDescription>
                      Define a new geofenced area where camera usage will be restricted
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Zone Name</Label>
                      <Input 
                        id="name" 
                        placeholder="e.g. Office Building" 
                        {...register('name', { required: true })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input 
                          id="latitude" 
                          placeholder="e.g. 37.7749" 
                          {...register('latitude', { required: true })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input 
                          id="longitude" 
                          placeholder="e.g. -122.4194" 
                          {...register('longitude', { required: true })}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="radius">Radius (meters)</Label>
                      <Input 
                        id="radius" 
                        placeholder="e.g. 200" 
                        {...register('radius', { required: true })}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="type">Zone Type</Label>
                      <select 
                        id="type" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register('type')}
                      >
                        <option value="default">Default</option>
                        <option value="temple">Temple</option>
                        <option value="exam_hall">Exam Hall</option>
                        <option value="military">Military Area</option>
                      </select>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="mt-2"
                        onClick={handleUseCurrentLocation}
                      >
                        <Target className="mr-2 h-4 w-4" /> Use Current Location
                      </Button>
                    </motion.div>
                  </div>
                  <DialogFooter>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button type="submit">Create Zone</Button>
                    </motion.div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item}>
              <div className="h-[400px] mb-6 rounded-lg overflow-hidden border border-gray-200">
                <AdminMapComponent />
              </div>
            </motion.div>
            
            <motion.div 
              variants={item}
              className="pb-4"
            >
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg">
                <motion.h3 
                  className="text-lg font-medium mb-6 text-center text-captureShield-darkBlue"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Zone Management Interface
                </motion.h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    "Interactive map for zone creation/editing",
                    "Zone type selector (Temple, Exam Hall, Military Area)",
                    "Zone schedule configuration",
                    "Edit/Delete functionality for existing zones"
                  ].map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start space-x-2 bg-white p-3 rounded-md shadow-sm border border-gray-100"
                      whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    >
                      <Badge variant="outline" className="bg-captureShield-teal/10 shrink-0 mt-0.5">
                        {i + 1}
                      </Badge>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ZoneManagement;
