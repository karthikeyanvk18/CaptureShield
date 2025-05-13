
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface OtpVerificationProps {
  phoneNumber: string;
  onVerificationComplete: () => void;
  onCancel: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ phoneNumber, onVerificationComplete, onCancel }) => {
  const [otp, setOtp] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits of your OTP code",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, we'll accept any 6-digit OTP
    // In a real app, this would validate against a backend service
    toast({
      title: "Phone Verified",
      description: "Your phone number has been verified successfully",
    });
    onVerificationComplete();
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    
    setIsResending(true);
    setTimeout(() => {
      // Simulate OTP resend
      toast({
        title: "OTP Resent",
        description: `A new verification code has been sent to ${phoneNumber}`,
      });
      setTimeLeft(60);
      setIsResending(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-captureShield-darkBlue flex items-center justify-center mb-4">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-captureShield-darkBlue">Verify Your Phone</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {phoneNumber}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <div className="text-sm text-center text-muted-foreground">
              {timeLeft > 0 ? (
                <p>Resend code in {timeLeft} seconds</p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-captureShield-teal hover:underline disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </button>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={handleVerify} 
            className="w-full bg-captureShield-teal hover:bg-captureShield-darkBlue"
            disabled={otp.length !== 6}
          >
            Verify Phone Number
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="w-full"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OtpVerification;
