
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Shield, 
  User, 
  Mail, 
  UserMinus,
  UserCog,
  MapPin
} from 'lucide-react';

interface UserTableProps {
  onAddUser: () => void;
}

const UserManagementTable: React.FC<UserTableProps> = ({ onAddUser }) => {
  const { getAllUsers } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get users from auth context
  const users = getAllUsers();
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRoleChange = (userId: string, newRole: 'admin' | 'user') => {
    // In a real app, this would call an API to update the user's role
    toast({
      title: "Role Updated",
      description: `User role changed to ${newRole}`,
    });
  };

  const handleBlockUser = (userId: string, username: string) => {
    toast({
      title: "User Blocked",
      description: `${username} has been blocked from accessing the system`,
    });
  };

  const handleAssignZone = (userId: string, username: string) => {
    toast({
      title: "Zone Assignment",
      description: `Zone assignment for ${username} updated`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search users..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={onAddUser} 
          className="bg-captureShield-teal hover:bg-captureShield-darkBlue"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>
      
      {filteredUsers.length > 0 ? (
        <Table>
          <TableCaption>List of registered users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email/ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    {user.fullName || user.username}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    {user.email && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Mail className="h-3 w-3 mr-1" /> {user.email}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">ID: {user.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={user.role === 'admin' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}>
                    {user.role === 'admin' ? (
                      <Shield className="h-3 w-3 mr-1" />
                    ) : (
                      <User className="h-3 w-3 mr-1" />
                    )}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Active</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}>
                        <UserCog className="h-4 w-4 mr-2" />
                        {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignZone(user.id, user.username)}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Assign to Zone
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => handleBlockUser(user.id, user.username)}
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Block User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 border rounded-md bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No users found matching your search.</p>
        </div>
      )}
      
      <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
        <h4 className="font-medium mb-2">User Status Monitoring</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500 dark:text-gray-400">Active Users</span>
              <span className="font-medium">{users.length}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500 dark:text-gray-400">Admins</span>
              <span className="font-medium">{users.filter(user => user.role === 'admin').length}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-red-500 rounded-full" 
                style={{ width: `${(users.filter(user => user.role === 'admin').length / users.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500 dark:text-gray-400">Blocked</span>
              <span className="font-medium">0</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-gray-500 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-block" />
            <Label htmlFor="auto-block">Auto-block after 5 failed login attempts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="activity-alerts" />
            <Label htmlFor="activity-alerts">Alert on suspicious activity</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;
