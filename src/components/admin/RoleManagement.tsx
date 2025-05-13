
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus, Shield, Settings } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const RoleManagement = () => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-captureShield-teal" />
          Role-Based Access Control
        </CardTitle>
        <CardDescription>Create and manage roles with granular permissions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-medium">Available Roles</h3>
          <Button className="bg-captureShield-teal hover:bg-captureShield-darkBlue">
            <UserPlus className="h-4 w-4 mr-2" /> Add New Role
          </Button>
        </div>
        
        <Table>
          <TableCaption>Role-based access control management</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Super Admin</TableCell>
              <TableCell>Full system access with all permissions</TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  <Settings className="h-4 w-4 mr-1" /> Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Admin</TableCell>
              <TableCell>Can manage zones, users and view reports</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  <Settings className="h-4 w-4 mr-1" /> Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Moderator</TableCell>
              <TableCell>Can view zones and users but cannot edit</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  <Settings className="h-4 w-4 mr-1" /> Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-8 p-6 border rounded-md">
          <h3 className="text-lg font-medium mb-4">Super Admin Permissions</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="manage-roles" defaultChecked />
              <Label htmlFor="manage-roles">Manage Roles</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="manage-zones" defaultChecked />
              <Label htmlFor="manage-zones">Manage Zones</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="manage-users" defaultChecked />
              <Label htmlFor="manage-users">Manage Users</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="view-logs" defaultChecked />
              <Label htmlFor="view-logs">View Logs</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="edit-settings" defaultChecked />
              <Label htmlFor="edit-settings">Edit Settings</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="manage-api-keys" defaultChecked />
              <Label htmlFor="manage-api-keys">Manage API Keys</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="export-data" defaultChecked />
              <Label htmlFor="export-data">Export Data</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="system-backup" defaultChecked />
              <Label htmlFor="system-backup">System Backup</Label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">Cancel</Button>
            <Button className="bg-captureShield-teal hover:bg-captureShield-darkBlue">Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
