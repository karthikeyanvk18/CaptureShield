
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Search, Download, Filter, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const mockLogData = [
  { id: 1, user: "john.doe", device: "iPhone 12", action: "Camera Blocked", location: "Office Building", timestamp: "2025-05-10T10:30:00" },
  { id: 2, user: "jane.smith", device: "Samsung S21", action: "Zone Entry", location: "Research Lab", timestamp: "2025-05-10T09:15:00" },
  { id: 3, user: "robert.johnson", device: "Pixel 6", action: "Camera Blocked", location: "Server Room", timestamp: "2025-05-09T16:45:00" },
  { id: 4, user: "susan.williams", device: "iPhone 13", action: "Zone Exit", location: "Office Building", timestamp: "2025-05-09T15:20:00" },
  { id: 5, user: "michael.brown", device: "Samsung S22", action: "Camera Unblocked", location: "Parking Lot", timestamp: "2025-05-09T14:10:00" }
];

const DeviceLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <motion.div
          initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          animate={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
          transition={{ duration: 1 }}
        >
          <CardHeader className="border-b pb-3 bg-white">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-captureShield-teal" />
                Device Logs
              </CardTitle>
              <CardDescription>Monitor camera access and zone entries</CardDescription>
            </motion.div>
          </CardHeader>
        </motion.div>
        <CardContent className="pt-6 bg-white">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search logs..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px] flex-shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="flex-shrink-0">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div variants={item}>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockLogData.map((log, index) => (
                        <motion.tr 
                          key={log.id}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => toggleRowExpansion(log.id)}
                          className="cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.device}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <motion.span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                log.action.includes("Blocked") ? "bg-red-100 text-red-800" :
                                log.action.includes("Unblocked") ? "bg-green-100 text-green-800" :
                                "bg-blue-100 text-blue-800"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {log.action}
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                            {new Date(log.timestamp).toLocaleString()}
                            {expandedRow === log.id ? 
                              <ChevronUp className="h-4 w-4 ml-2 text-gray-400" /> : 
                              <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
                            }
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={item}>
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg">
                <motion.h3 
                  className="text-lg font-medium mb-6 text-center text-captureShield-darkBlue"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Device Logs Interface
                </motion.h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Searchable camera lock/unlock history",
                    "Filter by date/zone/user",
                    "Export to CSV functionality",
                    "Real-time zone entry logs"
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start space-x-2 bg-white p-3 rounded-md shadow-sm border border-gray-100"
                      whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    >
                      <Badge variant="outline" className="bg-captureShield-teal/10 shrink-0 mt-0.5">
                        {i + 1}
                      </Badge>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DeviceLogs;
