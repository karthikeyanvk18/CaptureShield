
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import OtpVerification from '@/components/OtpVerification';
import { toast } from "@/components/ui/use-toast";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [organizationCode, setOrganizationCode] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '', color: '' });

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength({ score: 0, message: '', color: '' });
      return;
    }
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    let message = '';
    let color = '';
    
    switch (score) {
      case 0:
      case 1:
        message = 'Weak';
        color = 'bg-red-500';
        break;
      case 2:
      case 3:
        message = 'Medium';
        color = 'bg-yellow-500';
        break;
      case 4:
        message = 'Strong';
        color = 'bg-green-500';
        break;
    }
    
    setPasswordStrength({ score, message, color });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Proceed to phone verification
    setStep(2);
    setLoading(false);
  };

  const handleVerificationComplete = async () => {
    // Register the user
    try {
      const success = await register({
        username,
        password,
        fullName,
        email,
        phone,
        role: role as 'admin' | 'user',
        organizationCode: organizationCode || undefined
      });

      if (success) {
        toast({
          title: "Account created successfully",
          description: "You can now login with your credentials",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-start justify-center">
      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-md"
        >
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-captureShield-darkBlue flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-captureShield-darkBlue">Create Account</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Fill out the form below to create your CaptureShield account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Used for two-factor authentication and alerts
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-1">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">{passwordStrength.message}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Must be at least 8 characters with one uppercase letter and one number
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="organizationCode">Organization Code (Optional)</Label>
                  <Input
                    id="organizationCode"
                    placeholder="Enter if provided by your organization"
                    value={organizationCode}
                    onChange={(e) => setOrganizationCode(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="role">Account Type</Label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors mt-4"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Continue'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-center w-full">
                Already have an account?{" "}
                <Link to="/" className="text-captureShield-teal font-medium hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <OtpVerification 
          phoneNumber={phone} 
          onVerificationComplete={handleVerificationComplete}
          onCancel={() => setStep(1)}
        />
      )}
    </div>
  );
};

export default CreateAccountPage;
