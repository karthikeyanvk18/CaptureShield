
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

// Types for our authentication
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  fullName?: string;
  email?: string;
  phone?: string;
  organizationCode?: string;
  verified?: boolean;
  otpCode?: string;
  bio?: string; // Added bio property
  profilePicture?: string; // Added profile picture property
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  register: (userData: RegistrationData) => Promise<boolean>;
  getAllUsers: () => User[];
  verifyOTP: (otp: string) => Promise<boolean>;
  sendOTP: (phone: string) => Promise<boolean>;
  verifyPhone: (phone: string, otp: string) => Promise<boolean>;
  currentOTPPhone: string | null;
  setCurrentOTPPhone: (phone: string | null) => void;
  updateUserProfile: (profileData: Partial<User>) => void;
}

interface RegistrationData {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  organizationCode?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

// Mock users for demo purposes
const mockUsers = [
  { 
    id: '1', 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin' as const, 
    fullName: 'Administrator',
    email: 'admin@example.com',
    verified: true,
    profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120"
  },
  { 
    id: '2', 
    username: 'user', 
    password: 'user123', 
    role: 'user' as const,
    fullName: 'Test User',
    email: 'user@example.com',
    verified: true,
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120"
  }
];

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentOTPPhone, setCurrentOTPPhone] = useState<string | null>(null);
  const [users, setUsers] = useState<Array<User & { password: string }>>(() => {
    // Load users from localStorage or use mock users if none exist
    const storedUsers = localStorage.getItem('captureShieldUsers');
    return storedUsers ? JSON.parse(storedUsers) : mockUsers;
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('captureShieldUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('captureShieldUser');
      }
    }
    setLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('captureShieldUsers', JSON.stringify(users));
  }, [users]);

  // Update user profile
  const updateUserProfile = (profileData: Partial<User>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      });
      return;
    }
    
    // Update the current user
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    
    // Save to localStorage
    localStorage.setItem('captureShieldUser', JSON.stringify(updatedUser));
    
    // Update the user in the users array
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === user.id ? { ...u, ...profileData } : u
      )
    );
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  // Generate a random 6-digit OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send OTP (simulated)
  const sendOTP = async (phone: string): Promise<boolean> => {
    setLoading(true);
    
    // Check if phone exists
    const userWithPhone = users.find(u => u.phone === phone);
    if (!userWithPhone) {
      toast({
        title: "Phone not found",
        description: "No account associated with this phone number",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // In real world, send OTP via SMS API
    console.log(`Sending OTP ${otp} to ${phone}`);
    
    // Update user with OTP
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.phone === phone ? { ...u, otpCode: otp } : u
      )
    );
    
    // Store phone number for verification flow
    setCurrentOTPPhone(phone);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${phone}`,
    });
    
    setLoading(false);
    return true;
  };

  // Verify OTP during login
  const verifyOTP = async (otp: string): Promise<boolean> => {
    setLoading(true);
    
    if (!currentOTPPhone) {
      toast({
        title: "Error",
        description: "No phone number provided for verification",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
    
    // Find user with this phone
    const userWithPhone = users.find(u => u.phone === currentOTPPhone);
    if (!userWithPhone) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check OTP - in development, we'll use the mock OTP
    const validOTP = userWithPhone.otpCode === otp || otp === '123456';
    
    if (validOTP) {
      // Login the user
      const { password, otpCode, ...userWithoutSensitiveData } = userWithPhone;
      setUser({
        ...userWithoutSensitiveData,
        verified: true
      });
      localStorage.setItem('captureShieldUser', JSON.stringify({
        ...userWithoutSensitiveData,
        verified: true
      }));
      
      // Update the user's verified status
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.phone === currentOTPPhone ? { ...u, verified: true } : u
        )
      );
      
      toast({
        title: "Verification Successful",
        description: "Your phone number has been verified",
      });
      
      // Reset OTP phone
      setCurrentOTPPhone(null);
      
      setLoading(false);
      return true;
    } else {
      toast({
        title: "Invalid OTP",
        description: "The verification code you entered is incorrect",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };
  
  // Verify phone during registration
  const verifyPhone = async (phone: string, otp: string): Promise<boolean> => {
    // In a real implementation, this would verify the OTP with an SMS API
    // For demo purposes, we'll accept any 6-digit code with delay
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For the demo, we'll accept any 6-digit code or "123456" as valid
    const isValid = otp.length === 6 || otp === "123456";
    
    if (isValid) {
      toast({
        title: "Phone Verified",
        description: "Your phone number has been successfully verified",
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "Invalid verification code",
        variant: "destructive",
      });
    }
    
    setLoading(false);
    return isValid;
  };

  // Register function
  const register = async (userData: RegistrationData): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username already exists
    const userExists = users.some(u => u.username === userData.username);
    if (userExists) {
      toast({
        title: "Registration failed",
        description: "Username already exists",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }

    // Check if phone is already in use by another account
    const phoneExists = users.some(u => u.phone === userData.phone);
    if (phoneExists && userData.phone) {
      toast({
        title: "Registration failed",
        description: "Phone number is already in use",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }

    // Create new user
    const newUser = {
      id: String(Date.now()),
      username: userData.username,
      password: userData.password,
      role: userData.role,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      organizationCode: userData.organizationCode,
      securityQuestion: userData.securityQuestion,
      securityAnswer: userData.securityAnswer,
      verified: false,
      otpCode: generateOTP()
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    
    toast({
      title: "Registration successful",
      description: "You can now login with your credentials",
    });
    
    setLoading(false);
    return true;
  };

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      // For users that need verification, send to OTP flow
      if (!foundUser.verified && foundUser.phone) {
        sendOTP(foundUser.phone);
        setLoading(false);
        return true; // Return true to indicate successful credential check
      }
      
      // Create a copy without the password
      const { password, otpCode, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('captureShieldUser', JSON.stringify(userWithoutPassword));
      
      // Log access for audit trail
      console.info(`${foundUser.role === 'admin' ? 'Admin' : 'User'} access: ${username} at ${new Date().toISOString()}`);
      
      toast({
        title: "Login successful",
        description: `Welcome, ${username}!`,
      });
      setLoading(false);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('captureShieldUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Get all users (for admin purposes)
  const getAllUsers = (): User[] => {
    if (user?.role !== 'admin') return [];
    
    return users.map(({ password, otpCode, ...userWithoutSensitiveData }) => userWithoutSensitiveData);
  };

  // Check if user is admin
  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  // Value object to be provided to consumers
  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    register,
    getAllUsers,
    verifyOTP,
    sendOTP,
    verifyPhone,
    currentOTPPhone,
    setCurrentOTPPhone,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
