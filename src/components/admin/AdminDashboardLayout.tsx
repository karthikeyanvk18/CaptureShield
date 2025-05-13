
import React, { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import { Shield, LayoutDashboard, Map, Users, Activity, FileText, Settings, LifeBuoy } from 'lucide-react';
import AdminDashboardContent from './AdminDashboardContent';
import { useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboardLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Manage Zones", path: "/admin/zones", icon: Map },
    { name: "Manage Users", path: "/admin/users", icon: Users },
    { name: "Device Logs", path: "/admin/logs", icon: Activity },
    { name: "Reports", path: "/admin/reports", icon: FileText },
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Support", path: "/admin/support", icon: LifeBuoy },
  ];

  // Helper to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/admin' && currentPath === '/admin') return true;
    if (path !== '/admin' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <SidebarProvider defaultOpen={true} onOpenChange={setIsSidebarOpen}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-gray-50">
        <motion.div 
          initial={{ width: 240 }}
          animate={{ width: isSidebarOpen ? 240 : 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Sidebar className="border-r border-gray-200 bg-white">
            <SidebarHeader className="p-4">
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: 1,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <Shield className="h-6 w-6 text-captureShield-teal" />
                </motion.div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                      key="logo-text"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-lg text-captureShield-darkBlue"
                    >
                      CaptureShield
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item, index) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          `flex items-center gap-2 w-full p-2 ${
                            isActive 
                              ? 'bg-captureShield-teal/10 text-captureShield-teal font-medium' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.div>
                        <AnimatePresence>
                          {isSidebarOpen && (
                            <motion.span
                              key={`menu-text-${item.name}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div 
                    key="footer-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-gray-500"
                  >
                    <p>CaptureShield Admin v1.0</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </SidebarFooter>
          </Sidebar>
        </motion.div>
        
        <SidebarInset>
          <div className="p-6 w-full">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-2xl font-bold text-captureShield-darkBlue"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Admin Dashboard
              </motion.h1>
              <SidebarTrigger />
            </motion.div>
            <AdminDashboardContent />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
