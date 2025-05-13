
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentActivityList = () => {
  const activities = [
    { 
      id: 1, 
      type: "zone_entry", 
      user: "alex.wong", 
      location: "Research Lab", 
      time: "Just now",
      icon: MapPin,
      badge: { label: "Zone Entry", variant: "outline" }
    },
    { 
      id: 2, 
      type: "camera_blocked", 
      user: "sarah.johnson", 
      location: "Conference Room", 
      time: "5 mins ago",
      icon: Camera,
      badge: { label: "Camera Blocked", variant: "destructive" }
    },
    { 
      id: 3, 
      type: "user_login", 
      user: "admin", 
      location: "System", 
      time: "10 mins ago",
      icon: User,
      badge: { label: "User Login", variant: "default" }
    },
    { 
      id: 4, 
      type: "zone_exit", 
      user: "michael.chen", 
      location: "Server Room", 
      time: "25 mins ago",
      icon: MapPin,
      badge: { label: "Zone Exit", variant: "outline" }
    },
    { 
      id: 5, 
      type: "camera_unlocked", 
      user: "jessica.lee", 
      location: "Office Building", 
      time: "1 hour ago",
      icon: Lock,
      badge: { label: "Camera Unlocked", variant: "success" }
    }
  ];

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <motion.tr
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100"
            >
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <activity.icon className="h-4 w-4 text-gray-500" />
                  <Badge variant={activity.badge.variant as any}>
                    {activity.badge.label}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.location}</TableCell>
              <TableCell>{activity.time}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentActivityList;
