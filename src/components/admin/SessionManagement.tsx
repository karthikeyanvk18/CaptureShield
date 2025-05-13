
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MonitorSmartphone, LogOut, Clock, Shield } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SessionManagement = () => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center">
          <MonitorSmartphone className="mr-2 h-5 w-5 text-captureShield-teal" />
          Session Management
        </CardTitle>
        <CardDescription>Monitor and control active user sessions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 grid md:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2" /> Session Policy
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="30 min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2" /> Security Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="enforce-2fa">Enforce 2FA for Admins</Label>
                <Switch id="enforce-2fa" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ip-restriction">Enable IP Restriction</Label>
                <Switch id="ip-restriction" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <LogOut className="h-4 w-4 mr-2" /> Auto-Logout Triggers
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="logout-inactivity">On Inactivity</Label>
                <Switch id="logout-inactivity" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="logout-tab-close">On Tab Close</Label>
                <Switch id="logout-tab-close" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
          
          <Table>
            <TableCaption>Current active user sessions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Device / Browser</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">admin</TableCell>
                <TableCell>Chrome on Windows</TableCell>
                <TableCell>192.168.1.105</TableCell>
                <TableCell>Just now</TableCell>
                <TableCell><Badge className="bg-green-500">Current Session</Badge></TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">admin</TableCell>
                <TableCell>Safari on iPhone</TableCell>
                <TableCell>203.0.113.42</TableCell>
                <TableCell>5 minutes ago</TableCell>
                <TableCell><Badge>Active</Badge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-1" /> Terminate
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sarah</TableCell>
                <TableCell>Edge on Windows</TableCell>
                <TableCell>198.51.100.73</TableCell>
                <TableCell>15 minutes ago</TableCell>
                <TableCell><Badge>Active</Badge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-1" /> Terminate
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">John</TableCell>
                <TableCell>Firefox on Android</TableCell>
                <TableCell>203.0.113.15</TableCell>
                <TableCell>25 minutes ago</TableCell>
                <TableCell><Badge variant="outline" className="text-amber-500 border-amber-500">Idle</Badge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-1" /> Terminate
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
          <h3 className="text-md font-medium mb-3">IP Whitelist</h3>
          
          <div className="grid md:grid-cols-4 gap-2 mb-3">
            <div className="md:col-span-3">
              <Input placeholder="Add IP address (e.g., 192.168.1.1)" />
            </div>
            <Button className="bg-captureShield-teal hover:bg-captureShield-darkBlue">Add IP</Button>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between p-2 border rounded bg-white dark:bg-gray-700">
              <span>192.168.1.105</span>
              <span className="text-xs text-gray-500">Added by admin on May 5, 2025</span>
              <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">Remove</Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded bg-white dark:bg-gray-700">
              <span>203.0.113.42</span>
              <span className="text-xs text-gray-500">Added by admin on May 3, 2025</span>
              <Button variant="ghost" size="sm" className="text-red-500 h-8 px-2">Remove</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManagement;
