
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import ZoneManagement from './ZoneManagement';
import UserManagement from './UserManagement';
import DeviceLogs from './DeviceLogs';
import ReportsPanel from './ReportsPanel';
import AdminSettings from './AdminSettings';
import SupportPanel from './SupportPanel';
import RoleManagement from './RoleManagement';
import AuditTrail from './AuditTrail';
import SessionManagement from './SessionManagement';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AdminDashboardContent = () => {
  const location = useLocation();

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
        >
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/zones" element={<ZoneManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/logs" element={<DeviceLogs />} />
            <Route path="/reports" element={<ReportsPanel />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/support" element={<SupportPanel />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/audit" element={<AuditTrail />} />
            <Route path="/sessions" element={<SessionManagement />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardContent;
