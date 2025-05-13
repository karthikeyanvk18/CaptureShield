
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const CameraWarningBanner = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 border-l-4 border-captureShield-teal p-3 mb-4 rounded-md shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-4 w-4 text-captureShield-teal" />
        </div>
        <div className="ml-2">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            This is a demo application. Camera control would be enforced by device policies.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraWarningBanner;
