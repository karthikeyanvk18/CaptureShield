import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/context/AuthContext';
import { Shield, Bell, BarChart2, Settings, Info, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CameraStatus from './CameraStatus';
import GeofenceMap from './GeofenceMap';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import CameraWarningBanner from './CameraWarningBanner';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  const notificationData = [
    { id: 1, title: "Camera blocked", time: "Just now", message: "You entered a restricted zone" },
    { id: 2, title: "Policy updated", time: "2 hours ago", message: "New camera policy applied" },
    { id: 3, title: "Location tracked", time: "Yesterday", message: "Location services are active" }
  ];

  const statsData = [
    { title: "Zones Visited", value: "3", change: "+1", color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
    { title: "Camera Blocks", value: "12", change: "+4", color: "bg-gradient-to-r from-amber-500 to-orange-500" },
    { title: "Device Uptime", value: "98%", change: "", color: "bg-gradient-to-r from-emerald-500 to-teal-500" }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 border-captureShield-teal/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-captureShield-darkBlue to-captureShield-teal/90 text-white">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                className="flex items-center justify-center"
              >
                <Shield className="h-5 w-5 text-captureShield-teal" />
              </motion.div>
              CaptureShield User Dashboard
            </CardTitle>
            <CardDescription className="text-white/80">
              Monitor your camera status and current location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CameraWarningBanner />
            
            <motion.div 
              className="grid gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-3 bg-gradient-to-r from-captureShield-teal/10 to-captureShield-darkBlue/10 rounded-md"
              >
                <h3 className="text-sm font-medium mb-1">Logged in as</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-captureShield-darkBlue to-captureShield-teal w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user?.username}</p>
                    <Badge variant="outline" className="bg-captureShield-teal/10">Standard User</Badge>
                  </div>
                </div>
              </motion.div>
              
              <Separator className="my-2" />
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-sm font-medium mb-1">Device Status</h3>
                <div className="flex items-center">
                  <motion.span 
                    className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(34, 197, 94, 0)',
                        '0 0 0 4px rgba(34, 197, 94, 0.2)',
                        '0 0 0 0 rgba(34, 197, 94, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop'
                    }}
                  ></motion.span>
                  <p>CaptureShield is active and monitoring your location</p>
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
              <BarChart2 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white">
              <Info className="h-4 w-4 mr-2" />
              Help
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <CameraStatus />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <GeofenceMap />
              </motion.div>
            </div>
            
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {statsData.map((stat, index) => (
                <motion.div 
                  key={stat.title}
                  custom={index}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  className={`${stat.color} text-white rounded-lg p-4 shadow-lg`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-sm font-medium text-white/90">{stat.title}</h3>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.change && (
                      <Badge className="bg-white/20">{stat.change}</Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Stay updated with the latest alerts and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationData.map((notification, i) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start space-x-4 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-slate-200"
                      whileHover={{ backgroundColor: "#f8fafc" }}
                    >
                      <div className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue p-2 rounded-full text-white">
                        {i === 0 ? (
                          <motion.div variants={pulseVariants} animate="pulse">
                            <Bell className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <Bell className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-captureShield-teal/30 text-captureShield-teal hover:bg-captureShield-teal/10">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>App Settings</CardTitle>
                <CardDescription>Configure app preferences and notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="notifications">
                    <AccordionTrigger className="hover:text-captureShield-teal">
                      Notification Settings
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-2">
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 20 } }}
                        >
                          <div>
                            <p className="font-medium">Zone Entry Alerts</p>
                            <p className="text-sm text-gray-500">Get notified when entering a restricted zone</p>
                          </div>
                          <div className="font-medium text-captureShield-teal">Enabled</div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div>
                            <p className="font-medium">Camera Status Changes</p>
                            <p className="text-sm text-gray-500">Alerts when camera access is blocked/unblocked</p>
                          </div>
                          <div className="font-medium text-captureShield-teal">Enabled</div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div>
                            <p className="font-medium">Policy Updates</p>
                            <p className="text-sm text-gray-500">Get notified about security policy changes</p>
                          </div>
                          <div className="font-medium text-gray-400">Disabled</div>
                        </motion.div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="display">
                    <AccordionTrigger className="hover:text-captureShield-teal">
                      Display Settings
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-2">
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                          </div>
                          <div className="font-medium text-gray-400">Disabled</div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div>
                            <p className="font-medium">Map Animation</p>
                            <p className="text-sm text-gray-500">Toggle map animations on/off</p>
                          </div>
                          <div className="font-medium text-captureShield-teal">Enabled</div>
                        </motion.div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="privacy">
                    <AccordionTrigger className="hover:text-captureShield-teal">
                      Privacy Settings
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-2">
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div>
                            <p className="font-medium">Location History</p>
                            <p className="text-sm text-gray-500">Store your location history data</p>
                          </div>
                          <div className="font-medium text-captureShield-teal">Enabled</div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center justify-between"
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div>
                            <p className="font-medium">Anonymous Usage Data</p>
                            <p className="text-sm text-gray-500">Share anonymous usage statistics</p>
                          </div>
                          <div className="font-medium text-gray-400">Disabled</div>
                        </motion.div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Frequently asked questions and support resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 border-l-4 border-captureShield-teal">
                  <AlertTitle className="flex items-center">
                    <Info className="h-4 w-4 mr-2" /> About CaptureShield
                  </AlertTitle>
                  <AlertDescription>
                    CaptureShield is a security application that helps organizations enforce camera usage policies in restricted areas through geofencing technology.
                  </AlertDescription>
                </Alert>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq1">
                    <AccordionTrigger className="hover:text-captureShield-teal">
                      How does camera blocking work?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        In the real mobile app, CaptureShield uses Android's DevicePolicyManager to disable the device camera when you enter restricted zones. This prevents all apps from accessing the camera hardware.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq2">
                    <AccordionTrigger className="hover:text-captureShield-teal">
                      Can I bypass the camera restrictions?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        No, when properly deployed on a device, CaptureShield's camera restrictions cannot be bypassed through uninstalling, force closing, or task killing the app. It runs as a device administrator with system-level permissions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq3">
                    <AccordionTrigger className="hover:text-captureShield-teal">
                      Does CaptureShield work offline?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Yes, once the restricted zones are downloaded to your device, CaptureShield works entirely offline. Your location is processed locally on the device to determine if you're in a restricted zone.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6">
                  <form action="https://formspree.io/f/mgvkzdbj" method="POST">
                    <Button type="submit" className="w-full bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue hover:opacity-90">
                      Contact Support
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
