
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/context/AuthContext';
import { Shield, User, LogOut, Eye, EyeOff, Mail, Phone, Bell, Image as ImageIcon, Upload, Lock, Globe, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProfilePictureSelector from '@/components/ProfilePictureSelector';
import CameraWarningBanner from '@/components/CameraWarningBanner';

// Define the animation variants that were missing
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [bio, setBio] = useState(user?.bio || '');
  const [showEmailNotifications, setShowEmailNotifications] = useState(true);
  const [showPushNotifications, setShowPushNotifications] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Enhanced profile picture options
  const profilePicOptions = [
    "/placeholder.svg",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120",
  ];
  
  const [selectedProfilePic, setSelectedProfilePic] = useState(profilePicOptions[0]);
  const [uploadedProfilePic, setUploadedProfilePic] = useState<string | null>(null);
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="p-12 text-center">
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated",
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setUploadedProfilePic(imageUrl);
      setSelectedProfilePic(imageUrl);
      
      toast({
        title: "Photo Uploaded",
        description: "Your profile picture has been updated",
      });
    }
  };
  
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleNotificationUpdate = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };
  
  const handleContactSupport = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Sent",
      description: "We'll get back to you as soon as possible",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="account" className="data-[state=active]:bg-captureShield-teal data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-captureShield-teal data-[state=active]:text-white">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-captureShield-teal data-[state=active]:text-white">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-captureShield-teal data-[state=active]:text-white">
                <Shield className="h-4 w-4 mr-2" />
                Support
              </TabsTrigger>
            </TabsList>
          </div>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="account" className="grid gap-6 md:grid-cols-[1fr_2fr]">
              {/* User Summary Card */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-24 h-24 rounded-full overflow-hidden mb-4 relative group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={selectedProfilePic} alt="Profile" className="object-cover" />
                        <AvatarFallback>
                          {user.fullName ? user.fullName.charAt(0) : user.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-captureShield-darkBlue dark:text-white">
                      {user.fullName || user.username}
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      <span className="inline-block px-2 py-1 mt-2 text-xs bg-captureShield-teal/10 text-captureShield-teal rounded-full">
                        {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{user.username}</span>
                  </div>
                  {user.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{user.phone}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Select Profile Picture</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {profilePicOptions.map((pic, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer ${selectedProfilePic === pic ? 'ring-2 ring-captureShield-teal' : 'ring-1 ring-gray-200'}`}
                          onClick={() => setSelectedProfilePic(pic)}
                        >
                          <img 
                            src={pic} 
                            alt={`Option ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Upload button and hidden file input */}
                    <div className="mt-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        onClick={triggerFileUpload}
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                    
                    {uploadedProfilePic && (
                      <div className="mt-2">
                        <p className="text-xs text-green-600 dark:text-green-400">
                          ✓ Custom photo uploaded
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center space-x-2" 
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Account Settings Form */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-captureShield-darkBlue dark:text-white">
                    Account Information
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Update your personal details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          defaultValue={user.fullName || user.username}
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          defaultValue={user.email || ''}
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel"
                          defaultValue={user.phone || ''}
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell us about yourself"
                          className="resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="language">Preferred Language</Label>
                        <select 
                          id="language"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                    >
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-captureShield-darkBlue dark:text-white">
                    Security Settings
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Manage your account passwords and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword" className="dark:text-gray-300">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="newPassword" className="dark:text-gray-300">New Password</Label>
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword" className="dark:text-gray-300">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                      >
                        Update Password
                      </Button>
                    </form>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Security Settings</h3>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <p className="font-medium dark:text-gray-200">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enhance your account security</p>
                      </div>
                      <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-800">
                        Set Up
                      </Button>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <p className="font-medium dark:text-gray-200">Login Sessions</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage active sessions</p>
                      </div>
                      <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-800">
                        View
                      </Button>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <p className="font-medium dark:text-gray-200">Authorized Applications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage apps with access to your account</p>
                      </div>
                      <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-800">
                        Manage
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-captureShield-darkBlue dark:text-white">
                    Notification Settings
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Manage how you receive notifications from CaptureShield
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div variants={containerAnimation} initial="hidden" animate="visible" className="space-y-6">
                    <motion.div variants={itemAnimation} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={showEmailNotifications}
                          onCheckedChange={setShowEmailNotifications}
                        />
                      </div>
                      
                      {showEmailNotifications && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email-security" className="rounded text-captureShield-teal" defaultChecked />
                            <Label htmlFor="email-security">Security alerts</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email-updates" className="rounded text-captureShield-teal" defaultChecked />
                            <Label htmlFor="email-updates">System updates</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email-news" className="rounded text-captureShield-teal" />
                            <Label htmlFor="email-news">News and features</Label>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                    
                    <motion.div variants={itemAnimation} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications on your device</p>
                        </div>
                        <Switch
                          checked={showPushNotifications}
                          onCheckedChange={setShowPushNotifications}
                        />
                      </div>
                      
                      {showPushNotifications && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="push-zone" className="rounded text-captureShield-teal" defaultChecked />
                            <Label htmlFor="push-zone">Zone entry alerts</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="push-camera" className="rounded text-captureShield-teal" defaultChecked />
                            <Label htmlFor="push-camera">Camera status changes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="push-policy" className="rounded text-captureShield-teal" />
                            <Label htmlFor="push-policy">Policy updates</Label>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                  
                  <Button 
                    onClick={handleNotificationUpdate}
                    className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                  >
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="support">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-captureShield-darkBlue dark:text-white">
                    Support & Help
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Get assistance with CaptureShield
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.form 
                      action="https://formspree.io/f/mgvkzdbj"
                      method="POST"
                      className="space-y-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="text-center mb-4">
                        <h3 className="font-medium text-lg">Contact Support</h3>
                        <p className="text-sm text-gray-500">Get in touch with our support team</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="support-name">Name</Label>
                        <Input 
                          id="support-name" 
                          name="name"
                          defaultValue={user.fullName || user.username}
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="support-email">Email</Label>
                        <Input 
                          id="support-email" 
                          name="email"
                          type="email"
                          defaultValue={user.email || ''}
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="support-subject">Subject</Label>
                        <Input 
                          id="support-subject" 
                          name="subject"
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="support-message">Message</Label>
                        <Textarea 
                          id="support-message" 
                          name="message"
                          required
                          rows={4}
                          className="resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                      >
                        Submit Request
                      </Button>
                    </motion.form>
                    
                    <motion.form 
                      action="https://formspree.io/f/xeoglkza"
                      method="POST"
                      className="space-y-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="text-center mb-4">
                        <h3 className="font-medium text-lg">Report a Bug</h3>
                        <p className="text-sm text-gray-500">Let us know about any issues you encounter</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bug-name">Name</Label>
                        <Input 
                          id="bug-name" 
                          name="name"
                          defaultValue={user.fullName || user.username}
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bug-email">Email</Label>
                        <Input 
                          id="bug-email" 
                          name="email"
                          type="email"
                          defaultValue={user.email || ''}
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bug-location">Where did you find the bug?</Label>
                        <Input 
                          id="bug-location" 
                          name="bugLocation"
                          placeholder="E.g., Camera page, Settings, etc."
                          required
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bug-description">Describe the bug</Label>
                        <Textarea 
                          id="bug-description" 
                          name="bugDescription"
                          required
                          rows={4}
                          placeholder="What happened? What did you expect to happen?"
                          className="resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                      >
                        Submit Bug Report
                      </Button>
                    </motion.form>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <h3 className="font-medium text-lg mb-2">Ask a Question</h3>
                    <p className="text-sm text-gray-500 mb-4">Can't find what you're looking for?</p>
                    <motion.form 
                      action="https://formspree.io/f/mpwdlbev"
                      method="POST"
                      className="max-w-md mx-auto space-y-4"
                    >
                      <div className="grid gap-2">
                        <Input 
                          name="question"
                          placeholder="Type your question here..."
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <Button 
                        type="submit"
                        className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors"
                      >
                        Submit Question
                      </Button>
                    </motion.form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
