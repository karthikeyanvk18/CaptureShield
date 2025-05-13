
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    const success = await login(username, password);
    if (success) {
      // Navigate will happen through the auth context's useEffect
      console.log("Login successful");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-captureShield-darkBlue flex items-center justify-center mb-4">
          <Shield className="h-7 w-7 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-captureShield-darkBlue dark:text-white">CaptureShield</CardTitle>
        <CardDescription className="dark:text-gray-300">Login to access secure camera control</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username" className="dark:text-gray-200">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-2">
              <Button 
                type="submit" 
                className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors dark:text-white"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t p-4">
        <div className="text-sm text-center w-full">
          <p className="dark:text-gray-300">Don't have an account?{" "}
            <Link to="/create-account" className="text-captureShield-teal font-medium hover:underline dark:text-captureShield-teal">
              Create Account
            </Link>
          </p>
        </div>
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          <p>Demo credentials:</p>
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>User:</strong> user / user123</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
