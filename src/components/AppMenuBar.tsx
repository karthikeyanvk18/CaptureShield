
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Shield, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  MapPin, 
  Camera, 
  Sparkles, 
  Phone, 
  Bell, 
  PanelLeft, 
  HelpCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AppMenuBar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  // Define navigation items based on user role
  const navigationItems = user ? (
    isAdmin() ? [
      { label: "Dashboard", path: "/", icon: <PanelLeft className="w-4 h-4 mr-2" /> },
      { label: "Camera", path: "/camera", icon: <Camera className="w-4 h-4 mr-2" /> },
      { label: "Settings", path: "/admin", icon: <Settings className="w-4 h-4 mr-2" /> },
      { label: "Help", path: "/help", icon: <HelpCircle className="w-4 h-4 mr-2" /> }
    ] : [
      { label: "Dashboard", path: "/", icon: <PanelLeft className="w-4 h-4 mr-2" /> },
      { label: "Camera", path: "/camera", icon: <Camera className="w-4 h-4 mr-2" /> },
      { label: "Settings", path: "/mobile-settings", icon: <Settings className="w-4 h-4 mr-2" /> },
      { label: "Help", path: "/help", icon: <HelpCircle className="w-4 h-4 mr-2" /> }
    ]
  ) : [];

  const userDropdownItems = [
    { 
      label: "Profile", 
      icon: <User className="w-4 h-4 mr-2" />, 
      action: () => navigate("/profile") 
    },
    { 
      label: "Settings", 
      icon: <Settings className="w-4 h-4 mr-2" />, 
      action: () => navigate(isAdmin() ? "/admin" : "/mobile-settings") 
    },
    { 
      label: "Notifications", 
      icon: <Bell className="w-4 h-4 mr-2" />, 
      action: () => navigate("/notifications") 
    }
  ];

  // For mobile, when menu is open, add backdrop and prevent scrolling
  React.useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen, isMobile]);

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { duration: 0.3 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-safe-top">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                whileHover="hover"
                variants={logoVariants}
              >
                <Shield className="h-5 w-5 text-captureShield-teal" />
              </motion.div>
              <span className="font-bold text-base text-captureShield-darkBlue dark:text-white">
                CaptureShield
              </span>
            </Link>

            {/* Desktop Navigation */}
            {user && !isMobile && (
              <nav className="hidden md:flex space-x-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className={cn(
                        "transition-all",
                        location.pathname === item.path
                          ? "bg-captureShield-teal hover:bg-captureShield-teal/90"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      asChild
                    >
                      <Link to={item.path}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </nav>
            )}

            {/* Right section */}
            <div className="flex items-center space-x-2">
              {!isMobile && <ThemeToggle />}

              {user ? (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-gray-200 dark:border-gray-700"
                      >
                        <Avatar className="h-5 w-5">
                          <AvatarImage 
                            src={user.profilePicture || "/placeholder.svg"} 
                            alt={user.username} 
                          />
                          <AvatarFallback className="bg-captureShield-teal/20">
                            <User className="w-3 h-3 text-captureShield-teal" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="max-w-[80px] truncate hidden sm:inline-block text-xs dark:text-white">
                          {user.username}
                        </span>
                        <ChevronDown className="w-3 h-3 ml-auto text-gray-500 dark:text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
                      <DropdownMenuLabel className="dark:text-gray-200">
                        {user.fullName || user.username}
                        <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
                          {isAdmin() ? "Administrator" : "Standard User"}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="dark:bg-gray-700" />
                      
                      {userDropdownItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial="hidden"
                          animate="visible"
                          variants={menuItemVariants}
                          transition={{ delay: index * 0.1 }}
                        >
                          <DropdownMenuItem 
                            onClick={item.action}
                            className="cursor-pointer dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:text-gray-200"
                          >
                            {item.icon}
                            {item.label}
                          </DropdownMenuItem>
                        </motion.div>
                      ))}
                      
                      <DropdownMenuSeparator className="dark:bg-gray-700" />
                      <DropdownMenuItem 
                        onClick={logout} 
                        className="text-red-500 cursor-pointer dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:text-red-400"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ) : (
                <Button asChild size="sm">
                  <Link to="/">Login</Link>
                </Button>
              )}

              {/* Mobile menu toggle */}
              {isMobile && user && (
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {menuOpen ? (
                        <>
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                      ) : (
                        <>
                          <line x1="4" y1="12" x2="20" y2="12" />
                          <line x1="4" y1="6" x2="20" y2="6" />
                          <line x1="4" y1="18" x2="20" y2="18" />
                        </>
                      )}
                    </svg>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobile && menuOpen && user && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-12 right-0 bottom-0 w-3/4 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto"
          >
            <div className="p-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3 mb-4"
              >
                <div className="w-10 h-10 rounded-full bg-captureShield-teal/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-captureShield-teal" />
                </div>
                <div>
                  <p className="font-medium dark:text-white">{user.fullName || user.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isAdmin() ? "Administrator" : "Standard User"}
                  </p>
                </div>
              </motion.div>

              <div className="space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start mb-1",
                        location.pathname === item.path
                          ? "bg-captureShield-teal hover:bg-captureShield-teal/90"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                      )}
                      onClick={() => {
                        navigate(item.path);
                        setMenuOpen(false);
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="space-y-4 pt-4 border-t dark:border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account</p>
                <div className="space-y-1">
                  {userDropdownItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-white dark:hover:bg-gray-800"
                        onClick={() => {
                          item.action();
                          setMenuOpen(false);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="flex justify-between items-center pt-4 border-t dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ThemeToggle />
                <Button
                  variant="ghost"
                  className="text-red-500 dark:text-red-400"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AppMenuBar;
