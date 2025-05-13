
import React from 'react';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/LoginForm';
import OtpVerificationForm from '@/components/OtpVerificationForm';
import AdminDashboard from '@/components/AdminDashboard';
import UserDashboard from '@/components/UserDashboard';
import { useAuth } from '@/context/AuthContext';
import { GeofenceProvider } from '@/context/GeofenceContext';
import { LogOut, Shield, Sparkles, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from '@/components/MobileMenu';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  return <AppContent />;
};

const AppContent: React.FC = () => {
  const { user, logout, isAdmin, currentOTPPhone } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState("overview");
  const [showAnimationControls, setShowAnimationControls] = React.useState(false);

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  // Generate random bubbles for animation effect
  const bubbles = React.useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 20) + 10,
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
  }, []);

  return (
    <div className="min-h-screen bg-captureShield-lightGray dark:bg-gray-900 flex flex-col transition-colors duration-300 relative overflow-hidden">
      {/* Animated background bubbles */}
      {user && bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            bottom: -bubble.size,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`
          }}
        />
      ))}
      {/* Main content */}
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-4 py-8">
          {!user ? (
            <motion.div 
              className="max-w-md mx-auto py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentOTPPhone ? <OtpVerificationForm /> : <LoginForm />}
            </motion.div>
          ) : isAdmin() ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 relative z-10">
        <div className="container mx-auto px-4">
          <motion.p 
            className="text-center text-sm text-muted-foreground dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-captureShield-darkBlue dark:text-captureShield-teal font-medium">CaptureShield</span> &copy; {new Date().getFullYear()}
          </motion.p>
          <motion.p 
            className="text-center text-xs text-muted-foreground dark:text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Secure Your Space with Geofenced Camera Control
          </motion.p>
          
          {isMobile && (
            <div className="mt-3 flex justify-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
              >
                <Link to="/animation-settings">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 bg-gradient-to-r from-captureShield-teal/10 to-captureShield-purple/10 border-captureShield-teal/30"
                  >
                    <Sparkles className="h-3 w-3 text-captureShield-teal" />
                    <span className="text-xs">Animation Settings</span>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <ThemeToggle />
              </motion.div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Index;
