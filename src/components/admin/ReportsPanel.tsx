
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Calendar, Download, ChevronDown, BarChart2, PieChart, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const mockBarData = [
  { name: 'Office', value: 42 },
  { name: 'Research Lab', value: 28 },
  { name: 'Server Room', value: 17 },
  { name: 'Meeting Room', value: 12 },
  { name: 'Cafeteria', value: 5 },
];

const mockPieData = [
  { name: 'Camera Blocked', value: 78 },
  { name: 'Zone Entry', value: 120 },
  { name: 'Zone Exit', value: 115 },
  { name: 'Camera Unblocked', value: 75 },
];

const mockLineData = [
  { name: 'Mon', violations: 4, entries: 12 },
  { name: 'Tue', violations: 6, entries: 15 },
  { name: 'Wed', violations: 8, entries: 18 },
  { name: 'Thu', violations: 7, entries: 14 },
  { name: 'Fri', violations: 10, entries: 20 },
  { name: 'Sat', violations: 3, entries: 8 },
  { name: 'Sun', violations: 2, entries: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsPanel = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("charts");
  
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
  
  // Animation variants for the charts
  const chartAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
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
                <FileText className="mr-2 h-5 w-5 text-captureShield-teal" />
                Reports
              </CardTitle>
              <CardDescription>Analytics and reporting dashboard</CardDescription>
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
            <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="quarter">Last 3 Months</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="flex-shrink-0">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div variants={item}>
              <Tabs 
                defaultValue="charts" 
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="mb-4">
                  <TabsTrigger 
                    value="charts" 
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white"
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Charts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="zones" 
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-captureShield-teal data-[state=active]:to-captureShield-darkBlue data-[state=active]:text-white"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Top Zones
                  </TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  {activeTab === "charts" && (
                    <TabsContent value="charts" asChild>
                      <motion.div
                        key="charts"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <motion.div {...chartAnimation} transition={{ delay: 0.1 }}>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Zone Entry Activity</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                  <LineChart
                                    data={mockLineData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line 
                                      type="monotone" 
                                      dataKey="entries" 
                                      stroke="#0088cc" 
                                      strokeWidth={2} 
                                      activeDot={{ r: 8 }} 
                                    />
                                    <Line 
                                      type="monotone" 
                                      dataKey="violations" 
                                      stroke="#ff5722" 
                                      strokeWidth={2}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </CardContent>
                            </Card>
                          </motion.div>
                          
                          <motion.div {...chartAnimation} transition={{ delay: 0.2 }}>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Event Distribution</CardTitle>
                              </CardHeader>
                              <CardContent className="flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={300}>
                                  <RechartsPieChart>
                                    <Pie
                                      data={mockPieData}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                      {mockPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                  </RechartsPieChart>
                                </ResponsiveContainer>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  )}
                  
                  {activeTab === "zones" && (
                    <TabsContent value="zones" asChild>
                      <motion.div
                        key="zones"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Top Violated Zones</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <motion.div {...chartAnimation}>
                              <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                  data={mockBarData}
                                  layout="vertical"
                                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis type="number" />
                                  <YAxis dataKey="name" type="category" width={120} />
                                  <Tooltip />
                                  <Bar dataKey="value" fill="#0088cc" radius={[0, 4, 4, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  )}
                </AnimatePresence>
              </Tabs>
            </motion.div>
            
            <motion.div variants={item}>
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg">
                <motion.h3 
                  className="text-lg font-medium mb-6 text-center text-captureShield-darkBlue"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Reports Interface
                </motion.h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Visualization of zone entry statistics",
                    "Camera lock/unlock history charts",
                    "Top violated zones reports",
                    "Download logs functionality (CSV/PDF)"
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

export default ReportsPanel;
