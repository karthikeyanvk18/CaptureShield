
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ZapOff, 
  Zap, 
  LayoutGrid, 
  Palette,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnimationSettingsProps {
  className?: string;
}

const AnimationSettings: React.FC<AnimationSettingsProps> = ({ className }) => {
  const { toast } = useToast();
  const [animationLevel, setAnimationLevel] = useState<string>("medium");
  const [animationSpeed, setAnimationSpeed] = useState<number[]>([50]);
  const [enableParticles, setEnableParticles] = useState<boolean>(false);
  const [enableTransitions, setEnableTransitions] = useState<boolean>(true);
  const [colorTheme, setColorTheme] = useState<string>("default");
  
  const handleSave = () => {
    toast({
      title: "Animation settings saved!",
      description: "Your preferences have been applied.",
      variant: "default",
    });
  };
  
  return (
    <Card className={`overflow-hidden border-2 border-captureShield-teal/20 shadow-lg ${className}`}>
      <CardHeader className="bg-gradient-to-r from-captureShield-purple to-captureShield-pink text-white">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
          Animation Settings
        </CardTitle>
        <CardDescription className="text-white/80">
          Customize the animations and visual effects
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <ZapOff className="h-4 w-4 text-muted-foreground" />
            Animation Level
          </h3>
          
          <RadioGroup 
            defaultValue={animationLevel} 
            onValueChange={setAnimationLevel}
            className="grid grid-cols-3 gap-2"
          >
            <div>
              <RadioGroupItem value="low" id="low" className="peer sr-only" />
              <Label
                htmlFor="low"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <ZapOff className="mb-3 h-6 w-6" />
                Minimal
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
              <Label
                htmlFor="medium"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Zap className="mb-3 h-6 w-6" />
                Balanced
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="high" id="high" className="peer sr-only" />
              <Label
                htmlFor="high"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <Sparkles className="mb-3 h-6 w-6" />
                </motion.div>
                Maximal
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="font-medium flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              Animation Speed
            </h3>
            <span className="text-sm text-muted-foreground">
              {animationSpeed[0] < 25 
                ? "Slow" 
                : animationSpeed[0] < 75 
                  ? "Normal" 
                  : "Fast"}
            </span>
          </div>
          
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-full"
            value={animationSpeed}
            onValueChange={setAnimationSpeed}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            Animation Features
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Particle Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Floating particles and ambient effects
                </p>
              </div>
              <Switch
                checked={enableParticles}
                onCheckedChange={setEnableParticles}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Page Transitions</Label>
                <p className="text-sm text-muted-foreground">
                  Smooth animations between pages
                </p>
              </div>
              <Switch
                checked={enableTransitions}
                onCheckedChange={setEnableTransitions}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            Color Theme
          </h3>
          
          <Select value={colorTheme} onValueChange={setColorTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Blue</SelectItem>
              <SelectItem value="purple">Purple Haze</SelectItem>
              <SelectItem value="sunset">Sunset Orange</SelectItem>
              <SelectItem value="green">Emerald Green</SelectItem>
              <SelectItem value="rainbow">Rainbow Spectrum</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-5 gap-2 mt-2">
            <motion.div 
              className={`h-6 rounded-full bg-captureShield-teal ${colorTheme === 'default' ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className={`h-6 rounded-full bg-captureShield-purple ${colorTheme === 'purple' ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className={`h-6 rounded-full bg-captureShield-orange ${colorTheme === 'sunset' ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className={`h-6 rounded-full bg-captureShield-emerald ${colorTheme === 'green' ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className={`h-6 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 ${colorTheme === 'rainbow' ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </div>
        
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            onClick={handleSave} 
            className="w-full bg-gradient-to-r from-captureShield-teal to-blue-500 hover:opacity-90"
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Save Preferences
            </motion.div>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AnimationSettings;
