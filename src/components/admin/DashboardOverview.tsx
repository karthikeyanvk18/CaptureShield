
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, UserPlus, AlertTriangle, Map, Users, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import RecentActivityList from './RecentActivityList';
import QuickAddZoneForm from './QuickAddZoneForm';
import QuickAddUserForm from './QuickAddUserForm';

const DashboardOverview = () => {
  const stats = [
    { title: "Total Zones", value: "24", icon: Map, color: "bg-gradient-to-r from-blue-500 to-blue-600" },
    { title: "Active Users", value: "156", icon: Users, color: "bg-gradient-to-r from-green-500 to-green-600" },
    { title: "Violations", value: "7", icon: AlertTriangle, color: "bg-gradient-to-r from-amber-500 to-amber-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border border-gray-200 shadow-sm">
              <CardHeader className={`${stat.color} text-white p-4`}>
                <CardTitle className="flex items-center justify-between text-lg">
                  {stat.title}
                  <stat.icon className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-captureShield-teal" />
                Add Geofence Zone
              </CardTitle>
              <CardDescription>Create a new restricted camera zone</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <QuickAddZoneForm />
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/zones">Manage All Zones</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-captureShield-teal" />
                Invite User
              </CardTitle>
              <CardDescription>Add a new user to your organization</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <QuickAddUserForm />
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/users">Manage All Users</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="border-b pb-3">
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-captureShield-teal" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest events from users and zones</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <RecentActivityList />
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/logs">View All Logs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
