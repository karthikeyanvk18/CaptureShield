
import React, { useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Upload, ImageIcon } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface ProfilePictureSelectorProps {
  username: string;
  fullName?: string;
  onPictureChange: (url: string) => void;
  selectedPicture: string;
}

const ProfilePictureSelector = ({ 
  username, 
  fullName, 
  onPictureChange, 
  selectedPicture 
}: ProfilePictureSelectorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedProfilePic, setUploadedProfilePic] = useState<string | null>(null);
  
  // Profile picture options
  const profilePicOptions = [
    "/placeholder.svg",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120",
  ];
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setUploadedProfilePic(imageUrl);
      onPictureChange(imageUrl);
      
      toast({
        title: "Photo Uploaded",
        description: "Your profile picture has been updated",
      });
    }
  };
  
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-24 h-24 rounded-full overflow-hidden mb-4 relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Avatar className="w-24 h-24">
            <AvatarImage src={selectedPicture} alt="Profile" className="object-cover" />
            <AvatarFallback>
              {fullName ? fullName.charAt(0) : username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>
      
      <h3 className="text-sm font-medium text-center">Select Profile Picture</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {profilePicOptions.map((pic, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer ${selectedPicture === pic ? 'ring-2 ring-captureShield-teal' : 'ring-1 ring-gray-200'}`}
            onClick={() => onPictureChange(pic)}
          >
            <img 
              src={pic} 
              alt={`Option ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      
      {/* Upload button and hidden file input */}
      <div className="mt-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <Button 
          type="button" 
          onClick={triggerFileUpload}
          variant="outline" 
          size="sm"
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Photo
        </Button>
      </div>
      
      {uploadedProfilePic && (
        <div className="mt-2">
          <p className="text-xs text-green-600 dark:text-green-400 text-center">
            ✓ Custom photo uploaded
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureSelector;
