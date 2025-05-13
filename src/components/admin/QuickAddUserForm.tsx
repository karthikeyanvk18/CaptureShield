
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import PhoneVerification from '@/components/PhoneVerification';

const QuickAddUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'user',
    zone: 'all',
    phone: '',
    password: '',
    fullName: ''
  });
  const [showVerification, setShowVerification] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if all required fields are filled
    if (!formData.username || !formData.email || !formData.phone || !formData.password || !formData.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Proceed to phone verification
    setShowVerification(true);
    setIsLoading(false);
  };

  const handleVerificationComplete = async () => {
    setIsLoading(true);
    
    // Create the user account
    const success = await register({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role as 'admin' | 'user',
      organizationCode: formData.zone
    });
    
    if (success) {
      toast({
        title: "User Created",
        description: "The new user account has been created successfully",
      });
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        role: 'user',
        zone: 'all',
        phone: '',
        password: '',
        fullName: ''
      });
      setShowVerification(false);
    }
    
    setIsLoading(false);
  };

  if (showVerification) {
    return (
      <PhoneVerification 
        phone={formData.phone} 
        onVerificationComplete={handleVerificationComplete} 
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input 
          id="fullName" 
          placeholder="John Doe" 
          required 
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username" 
          placeholder="johndoe" 
          required 
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="user@example.com" 
          required 
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="+1 (555) 123-4567" 
          required 
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="Create a password" 
          required 
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="role">Role</Label>
          <Select 
            defaultValue={formData.role}
            onValueChange={(value) => handleSelectChange(value, 'role')}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="user">Regular User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="zone">Assign to Zone</Label>
          <Select 
            defaultValue={formData.zone}
            onValueChange={(value) => handleSelectChange(value, 'zone')}
          >
            <SelectTrigger id="zone">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="office">Office Building</SelectItem>
              <SelectItem value="research">Research Lab</SelectItem>
              <SelectItem value="server">Server Room</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-1">
        <Checkbox id="send-welcome-email" defaultChecked />
        <Label htmlFor="send-welcome-email" className="text-sm">
          Send welcome email with setup instructions
        </Label>
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue" disabled={isLoading}>
        {isLoading ? "Creating User..." : "Create User"}
      </Button>
    </form>
  );
};

export default QuickAddUserForm;
