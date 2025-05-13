
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { Shield, KeyRound } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState('');
  const { verifyOTP, loading, currentOTPPhone } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "Missing information",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }
    
    await verifyOTP(otp);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <motion.div 
          className="mx-auto w-12 h-12 rounded-full bg-captureShield-darkBlue flex items-center justify-center mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <KeyRound className="h-7 w-7 text-white" />
        </motion.div>
        <CardTitle className="text-2xl font-bold text-captureShield-darkBlue dark:text-white">
          Verify Your Phone
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Enter the verification code sent to {currentOTPPhone ? currentOTPPhone : "your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp" className="dark:text-gray-200">Verification Code</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white text-center text-2xl tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Didn't receive a code? For the demo, use "123456"
              </p>
            </div>
            <div className="mt-2">
              <Button 
                type="submit" 
                className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue transition-colors dark:text-white"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Phone'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <div className="text-sm text-muted-foreground dark:text-gray-400 text-center">
          <p>This is a security feature to protect your account.</p>
          <p className="mt-1">Your phone will be used for authentication and notifications.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OtpVerificationForm;
