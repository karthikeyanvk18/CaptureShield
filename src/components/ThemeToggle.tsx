
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Stars } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  onChange?: (isDark: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onChange }) => {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      if (onChange) onChange(true);
    }
    
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      if (onChange) onChange(true);
    }
  }, [onChange]);
  
  const handleToggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    
    // Toggle body class for dark mode
    if (newState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    if (onChange) {
      onChange(newState);
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        className="relative w-10 h-10 rounded-full bg-white dark:bg-gray-800 transition-colors duration-500 overflow-hidden"
        aria-label="Toggle dark mode"
      >
        {/* Sun icon with rays animation */}
        <motion.div
          initial={false}
          animate={{ 
            rotate: isDark ? 45 : 0, 
            opacity: isDark ? 0 : 1,
            scale: isHovered && !isDark ? 1.2 : 1
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: isHovered && !isDark ? 180 : 0 }}
            transition={{ duration: 2, repeat: isHovered && !isDark ? Infinity : 0, ease: "linear" }}
          >
            <Sun className="h-5 w-5 text-yellow-500" />
          </motion.div>
        </motion.div>
        
        {/* Moon icon with stars animation */}
        <motion.div
          initial={false}
          animate={{ 
            rotate: isDark ? 0 : -45, 
            opacity: isDark ? 1 : 0,
            scale: isHovered && isDark ? 1.2 : 1
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-blue-400" />
          
          {/* Animated stars around moon when hovered */}
          {isHovered && isDark && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  repeatDelay: 0.5,
                  ease: "easeInOut" 
                }}
                style={{ 
                  position: 'absolute', 
                  top: '20%', 
                  right: '20%' 
                }}
              >
                <Stars size={8} className="text-blue-200" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  delay: 0.3,
                  repeatDelay: 0.7,
                  ease: "easeInOut" 
                }}
                style={{ 
                  position: 'absolute', 
                  bottom: '25%', 
                  left: '20%' 
                }}
              >
                <Stars size={8} className="text-blue-200" />
              </motion.div>
            </>
          )}
        </motion.div>
        
        {/* Background ripple effect on toggle */}
        <motion.div
          initial={false}
          animate={{ 
            scale: [0, 2],
            opacity: [0.7, 0] 
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut" 
          }}
          key={isDark ? "dark" : "light"}
          className={`absolute inset-0 rounded-full ${
            isDark ? "bg-blue-400" : "bg-yellow-400"
          }`}
        />
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
