
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import AnimationSettings from '@/components/AnimationSettings';
import { AuthProvider } from '@/context/AuthContext';
import { GeofenceProvider } from '@/context/GeofenceContext';

const AnimationSettingsPage: React.FC = () => {
  return (
    <AuthProvider>
      <GeofenceProvider>
        <div className="min-h-screen bg-captureShield-lightGray dark:bg-gray-900 flex flex-col transition-colors duration-300">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link to="/">
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent hover:text-primary">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-captureShield-teal animate-pulse" />
                <h1 className="font-bold text-lg text-captureShield-darkBlue dark:text-white">
                  Animation Settings
                </h1>
              </div>
              
              <div className="w-20"></div> {/* Empty div for layout balance */}
            </div>
          </header>
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <motion.h2 
                    className="text-2xl font-bold mb-2 bg-gradient-to-r from-captureShield-teal to-captureShield-azure bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Customize Your Experience
                  </motion.h2>
                  <p className="text-muted-foreground">
                    Adjust animations and visual effects to match your preferences
                  </p>
                </div>
                
                <AnimationSettings />
                
                <div className="p-4 bg-gradient-to-r from-captureShield-mint/10 to-captureShield-teal/10 rounded-lg border border-captureShield-teal/20">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-4 w-4 text-captureShield-teal" />
                    </motion.div>
                    Animation Tips
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-captureShield-teal">•</span>
                      <span>Reduce animation level for better performance on older devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-captureShield-teal">•</span>
                      <span>Some animations may affect battery life on mobile devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-captureShield-teal">•</span>
                      <span>Try different color themes to find what works best for you</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </main>
          
          <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm text-muted-foreground dark:text-gray-400">
                <span className="text-captureShield-darkBlue dark:text-captureShield-teal font-medium">CaptureShield</span> &copy; {new Date().getFullYear()} | Web Demo
              </p>
            </div>
          </footer>
        </div>
      </GeofenceProvider>
    </AuthProvider>
  );
};

export default AnimationSettingsPage;
