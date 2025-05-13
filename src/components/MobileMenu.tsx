
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, X, Shield, Bell, Settings, Info, LogOut, BarChart2, Camera, Map, 
  Lock, UserPlus, User, Key, HelpCircle, FileText, Cloud, Smartphone, 
  Wifi, AlertCircle, Clock, Users, MessageCircle, Zap, Compass, Database,
  Flag, GitBranch, Globe, Heart, Home, Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const MobileMenu: React.FC<{
  onSelectTab: (tab: string) => void;
  activeTab: string;
}> = ({ onSelectTab, activeTab }) => {
  const { logout, isAdmin, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      opacity: 1,
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  const handleTabSelect = (tab: string) => {
    onSelectTab(tab);
    setIsOpen(false);
  };

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const menuCategories = [
    {
      name: "Main",
      items: [
        { id: "overview", label: "Overview", icon: <BarChart2 className="h-5 w-5" /> },
        { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
        { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
      ]
    },
    {
      name: "Camera Controls",
      items: [
        { id: "camera-status", label: "Camera Status", icon: <Camera className="h-5 w-5" /> },
        { id: "geofence-map", label: "Geofence Map", icon: <Map className="h-5 w-5" /> },
        { id: "camera-settings", label: "Camera Settings", icon: <Settings className="h-5 w-5" /> },
      ]
    },
    {
      name: "Security",
      items: [
        { id: "security-zones", label: "Security Zones", icon: <Lock className="h-5 w-5" /> },
        { id: "permissions", label: "Permissions", icon: <Key className="h-5 w-5" /> },
        { id: "alerts", label: "Security Alerts", icon: <AlertCircle className="h-5 w-5" /> },
      ]
    },
    {
      name: "Account",
      items: [
        { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> },
        { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
        { id: isAdmin() ? "admin" : "user-dashboard", label: isAdmin() ? "Admin Panel" : "User Dashboard", icon: <Shield className="h-5 w-5" /> },
      ]
    },
    {
      name: "Device",
      items: [
        { id: "device-info", label: "Device Info", icon: <Smartphone className="h-5 w-5" /> },
        { id: "connectivity", label: "Connectivity", icon: <Wifi className="h-5 w-5" /> },
        { id: "storage", label: "Storage", icon: <Database className="h-5 w-5" /> },
      ]
    },
    {
      name: "More",
      items: [
        { id: "help", label: "Help", icon: <HelpCircle className="h-5 w-5" /> },
        { id: "about", label: "About", icon: <Info className="h-5 w-5" /> },
        { id: "terms", label: "Terms & Conditions", icon: <FileText className="h-5 w-5" /> },
        { id: "privacy", label: "Privacy Policy", icon: <Lock className="h-5 w-5" /> },
        { id: "feedback", label: "Feedback", icon: <MessageCircle className="h-5 w-5" /> },
      ]
    }
  ];

  return (
    <div className="md:hidden z-50 relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-captureShield-darkBlue"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black/50 z-[9999]"
            style={{ position: 'fixed' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear"
                    }}
                  >
                    <Shield className="h-6 w-6 text-captureShield-teal" />
                  </motion.div>
                  <h2 className="font-bold text-lg text-captureShield-darkBlue dark:text-white">CaptureShield</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* User Profile Section */}
              <motion.div 
                variants={itemVariants}
                className="p-4 border-b flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-captureShield-teal flex items-center justify-center text-white font-bold">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-captureShield-darkBlue dark:text-white">{user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{isAdmin() ? 'Administrator' : 'Standard User'}</p>
                </div>
              </motion.div>
              
              <div className="flex-1 overflow-auto">
                <div className="py-2">
                  {menuCategories.map((category, idx) => (
                    <motion.div 
                      key={category.name}
                      variants={itemVariants}
                      className="mb-1"
                    >
                      <motion.button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between p-3 text-left font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>{category.name}</span>
                        <motion.span
                          animate={{ rotate: expandedCategory === category.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.span>
                      </motion.button>
                      
                      <AnimatePresence>
                        {expandedCategory === category.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {category.items.map((item) => (
                              <motion.button
                                key={item.id}
                                className={`w-full flex items-center gap-3 p-3 pl-6 rounded-lg text-sm ${activeTab === item.id ? 'bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                onClick={() => handleTabSelect(item.id)}
                              >
                                {item.icon}
                                <span>{item.label}</span>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* Authentication Buttons */}
                  <div className="p-3">
                    {!user ? (
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Button variant="default" className="w-full flex items-center gap-2" onClick={() => handleTabSelect('login')}>
                          <User className="h-4 w-4" />
                          <span>Sign In</span>
                        </Button>
                        <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => handleTabSelect('register')}>
                          <UserPlus className="h-4 w-4" />
                          <span>Sign Up</span>
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div variants={itemVariants}>
                        <Button 
                          variant="destructive" 
                          className="w-full flex items-center gap-2" 
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t flex justify-between items-center mt-auto">
                <ThemeToggle />
                <div className="flex space-x-2">
                  <Link to="/animation-settings">
                    <Button size="sm" variant="outline">Animations</Button>
                  </Link>
                  <Link to="/mobile-settings">
                    <Button size="sm" variant="outline">Mobile</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
