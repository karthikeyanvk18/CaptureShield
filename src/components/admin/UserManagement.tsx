
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, UserPlus } from 'lucide-react';
import UserManagementTable from './UserManagementTable';
import QuickAddUserForm from './QuickAddUserForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const UserManagement = () => {
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-captureShield-teal" />
          User Management
        </CardTitle>
        <CardDescription>Manage users and their permissions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <UserManagementTable onAddUser={() => setAddUserDialogOpen(true)} />
        
        {/* Add User Dialog */}
        <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-captureShield-teal" />
                Add New User
              </DialogTitle>
            </DialogHeader>
            <QuickAddUserForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
