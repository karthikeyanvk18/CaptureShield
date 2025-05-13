
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Phone, KeyRound } from "lucide-react";

interface PhoneVerificationProps {
  phone: string;
  onVerificationComplete: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ phone, onVerificationComplete }) => {
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { verifyPhone, loading } = useAuth();

  const handleSendCode = () => {
    // In a real app, this would send the actual OTP
    setShowOtpInput(true);
    toast({
      title: "Verification code sent",
      description: "For the demo, use '123456' as the code",
    });
  };

  const handleVerify = async () => {
    if (!otp) {
      toast({
        title: "Missing code",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    const success = await verifyPhone(phone, otp);
    if (success) {
      onVerificationComplete();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Phone className="mr-2 h-5 w-5 text-captureShield-teal" />
          Verify Phone Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!showOtpInput ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone-display">Phone Number</Label>
              <Input 
                id="phone-display" 
                value={phone} 
                disabled 
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We'll send a verification code to this number to confirm it belongs to you.
            </p>
            <Button 
              onClick={handleSendCode}
              className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue" 
              disabled={loading}
            >
              Send Verification Code
            </Button>
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                <KeyRound className="h-6 w-6 text-captureShield-teal" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter the code sent to {phone}
              </p>
            </div>
            <div>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                For demo purposes, use "123456"
              </p>
            </div>
            <Button 
              onClick={handleVerify} 
              className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
