
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Sparkles, Smartphone, Camera, Map, Lock, Bell, Info, Home, User, Search, Calendar, FileText, Mail, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

const FloatingActionButton: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-captureShield-teal to-captureShield-azure hover:shadow-lg hover:shadow-captureShield-teal/20 border-none"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-captureShield-teal via-captureShield-azure to-captureShield-teal opacity-80"
              style={{ filter: 'blur(8px)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative z-10"
            >
              <Settings className="h-6 w-6 text-white" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 rounded-xl bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border border-captureShield-teal/20 max-h-[85vh] overflow-y-auto">
          {user && (
            <>
              <div className="px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-captureShield-teal flex items-center justify-center text-white font-bold">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user?.username}</p>
                  <p className="text-xs text-gray-500">Logged in user</p>
                </div>
              </div>
              <DropdownMenuSeparator />
            </>
          )}
          
          <DropdownMenuLabel>Quick Navigation</DropdownMenuLabel>
          
          <DropdownMenuGroup>
            <Link to="/">
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
                <Home className="h-4 w-4 text-blue-600" />
                <span>Home</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/overview">
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
                <Info className="h-4 w-4 text-green-600" />
                <span>Overview</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/notifications">
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
                <Bell className="h-4 w-4 text-amber-500" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Animation Settings</DropdownMenuLabel>
          
          <DropdownMenuGroup>
            <Link to="/animation-settings">
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-3">
                <Sparkles className="h-4 w-4 text-captureShield-teal" />
                <span>Animation Settings</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/mobile-settings">
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-3">
                <Smartphone className="h-4 w-4 text-captureShield-purple" />
                <span>Mobile Options</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Camera Controls</DropdownMenuLabel>
          
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
              <Camera className="h-4 w-4 text-captureShield-teal" />
              <span>Camera Status</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
              <Map className="h-4 w-4 text-captureShield-purple" />
              <span>Geofence Map</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
              <Lock className="h-4 w-4 text-captureShield-darkBlue" />
              <span>Security Zones</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Tools & Settings</DropdownMenuLabel>
          
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2 text-gray-500" />
                <span>Settings</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border border-captureShield-teal/20">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                <span>Schedule</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border border-captureShield-teal/20">
                <DropdownMenuItem className="cursor-pointer">Calendar View</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Timeline</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Create Event</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Search className="h-4 w-4 mr-2 text-blue-500" />
                <span>Search Options</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border border-captureShield-teal/20">
                <DropdownMenuItem className="cursor-pointer">Search History</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Advanced Search</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Search Settings</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2 text-teal-600" />
                <span>Documentation</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border border-captureShield-teal/20">
                <DropdownMenuItem className="cursor-pointer">User Guide</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">API Reference</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">FAQ</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Mail className="h-4 w-4 mr-2 text-purple-600" />
                <span>Contact Support</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border border-captureShield-teal/20">
                <DropdownMenuItem className="cursor-pointer">Email</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Live Chat</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Report Issue</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
              <Info className="h-4 w-4 text-blue-500" />
              <span>Help & Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 py-2 text-red-500 hover:text-red-600"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default FloatingActionButton;
