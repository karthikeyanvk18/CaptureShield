
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Moon, Sun, Shield, Bell, Globe, Download, Key } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const AdminSettings = () => {
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

  const handleSaveSettings = (category: string) => {
    toast({
      title: "Settings Updated",
      description: `${category} settings have been saved successfully.`,
    });
  };

  const generateEmergencyKey = () => {
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    toast({
      title: "Emergency Key Generated",
      description: "A new emergency unlock key has been generated.",
    });
    return key;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b pb-3">
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-captureShield-teal" />
            Settings
          </CardTitle>
          <CardDescription>Configure app and security settings</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item}>
              <Tabs defaultValue="appearance" className="w-full">
                <TabsList className="grid grid-cols-3 lg:grid-cols-5 mb-6">
                  <TabsTrigger value="appearance" className="flex items-center text-xs sm:text-sm">
                    <Sun className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center text-xs sm:text-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center text-xs sm:text-sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="language" className="flex items-center text-xs sm:text-sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Language
                  </TabsTrigger>
                  <TabsTrigger value="backup" className="flex items-center text-xs sm:text-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Backup
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="appearance">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme Settings</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4" />
                            <Label htmlFor="theme-light">Light Mode</Label>
                          </div>
                          <Switch id="theme-light" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Moon className="h-4 w-4" />
                            <Label htmlFor="theme-dark">Dark Mode</Label>
                          </div>
                          <Switch id="theme-dark" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Settings className="h-4 w-4" />
                            <Label htmlFor="system-theme">Use System Theme</Label>
                          </div>
                          <Switch id="system-theme" />
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleSaveSettings('Theme')}>Save Theme Settings</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security Settings</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Require 2FA for all admin logins</p>
                          </div>
                          <Switch id="2fa-enabled" defaultChecked />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Organization Security Code</Label>
                          <div className="flex gap-2">
                            <Input value="ORG-7391-SECURE" readOnly className="font-mono" />
                            <Button variant="outline">Regenerate</Button>
                          </div>
                          <p className="text-sm text-muted-foreground">Used for authenticating new devices</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Emergency Unlock Key</Label>
                          <div className="flex gap-2">
                            <Input value={generateEmergencyKey()} readOnly className="font-mono" />
                            <Button variant="outline">
                              <Key className="h-4 w-4 mr-2" />
                              Generate New
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">For emergency camera unlocking</p>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleSaveSettings('Security')}>Save Security Settings</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive email alerts for violations</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive text messages for critical alerts</p>
                          </div>
                          <Switch id="sms-notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive push notifications in mobile app</p>
                          </div>
                          <Switch id="push-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleSaveSettings('Notification')}>Save Notification Settings</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="language">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language Settings</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label>Interface Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="ja">日本語</SelectItem>
                              <SelectItem value="zh">中文</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Automatic Translation</p>
                            <p className="text-sm text-muted-foreground">Translate user-generated content</p>
                          </div>
                          <Switch id="auto-translate" />
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleSaveSettings('Language')}>Save Language Settings</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="backup">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup & Restore</h3>
                      <div className="grid gap-4">
                        <Card className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Full System Backup</p>
                                <p className="text-sm text-muted-foreground">Last backup: May 9, 2025</p>
                              </div>
                              <Button>
                                <Download className="h-4 w-4 mr-2" />
                                Backup Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Geofence Data Export</p>
                                <p className="text-sm text-muted-foreground">Export all zone configuration</p>
                              </div>
                              <Button variant="outline">Export JSON</Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Restore from Backup</p>
                                <p className="text-sm text-muted-foreground">Upload a previous backup file</p>
                              </div>
                              <Button variant="outline">Upload Backup</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
            
            <motion.div variants={item}>
              <div className="p-6 text-center text-muted-foreground bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-medium mb-6">Settings Interface</h3>
                <ul className="list-disc text-left max-w-lg mx-auto space-y-3">
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Theme switcher (light/dark mode)
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    2FA configuration for admin login
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Organization code management
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Emergency unlock key generation
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Notification customization
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Language support settings
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Backup/restore functionality
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminSettings;
