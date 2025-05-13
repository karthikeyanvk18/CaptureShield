
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { toast } from "@/components/ui/use-toast";

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();

  React.useEffect(() => {
    if (user && isAdmin()) {
      // Log admin access for audit trail
      console.log(`Admin access: ${user.username} at ${new Date().toISOString()}`);
      
      // Show welcome toast
      toast({
        title: "Welcome to Admin Dashboard",
        description: `Logged in as ${user.username} with admin privileges.`,
      });
    }
  }, [user, isAdmin]);

  // Redirect non-admin users
  if (!user || !isAdmin()) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin dashboard.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <AdminDashboardLayout />;
};

export default AdminDashboardPage;
