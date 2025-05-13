
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClipboardList, Download, Search, Calendar, Filter } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-captureShield-teal" />
          Audit Trail
        </CardTitle>
        <CardDescription>Track and review all system activities</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search logs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            <Select>
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user1">John</SelectItem>
                <SelectItem value="user2">Sarah</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>
        
        <Table>
          <TableCaption>A log of all system activities</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">2025-05-09 14:32:15</TableCell>
              <TableCell>admin</TableCell>
              <TableCell>Created Zone</TableCell>
              <TableCell>"Temple Area" in North Campus</TableCell>
              <TableCell>192.168.1.105</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2025-05-09 14:28:03</TableCell>
              <TableCell>admin</TableCell>
              <TableCell>Updated User Role</TableCell>
              <TableCell>John promoted to Moderator</TableCell>
              <TableCell>192.168.1.105</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2025-05-09 13:45:22</TableCell>
              <TableCell>Sarah</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Successful login</TableCell>
              <TableCell>203.0.113.42</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2025-05-09 12:30:15</TableCell>
              <TableCell>admin</TableCell>
              <TableCell>System Settings</TableCell>
              <TableCell>Updated 2FA policy</TableCell>
              <TableCell>192.168.1.105</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2025-05-09 10:15:03</TableCell>
              <TableCell>John</TableCell>
              <TableCell>Login Failed</TableCell>
              <TableCell>Invalid password attempt</TableCell>
              <TableCell>198.51.100.73</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2025-05-09 09:42:57</TableCell>
              <TableCell>admin</TableCell>
              <TableCell>User Created</TableCell>
              <TableCell>Created account for Sarah</TableCell>
              <TableCell>192.168.1.105</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-captureShield-teal text-white hover:bg-captureShield-darkBlue">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditTrail;
