
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnimationSettingsPage from "./pages/AnimationSettingsPage";
import MobileSettingsPage from "./pages/MobileSettingsPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import FloatingActionButton from "./components/FloatingActionButton";
import AppMenuBar from "./components/AppMenuBar";
import { AuthProvider } from "./context/AuthContext";
import { GeofenceProvider } from "@/context/GeofenceContext";
import CameraPage from "./pages/CameraPage";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <GeofenceProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <AppMenuBar />
              <AnimatePresence mode="wait">
                <motion.div 
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-12 flex-grow pb-safe-bottom"
                >
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/animation-settings" element={<AnimationSettingsPage />} />
                    <Route path="/mobile-settings" element={<MobileSettingsPage />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/camera" element={<CameraPage />} />
                    
                    {/* Admin Dashboard Routes */}
                    <Route path="/admin/*" element={<AdminDashboardPage />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
              <FloatingActionButton />
            </div>
          </BrowserRouter>
        </GeofenceProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
