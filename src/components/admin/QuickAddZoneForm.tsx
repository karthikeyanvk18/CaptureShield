
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const QuickAddZoneForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Zone Added",
        description: "The geofence zone has been created successfully",
      });
      
      // Reset form (in a real app, you'd use React Hook Form or similar)
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="zone-name">Zone Name</Label>
        <Input id="zone-name" placeholder="e.g. Research Lab" required />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input id="latitude" placeholder="e.g. 37.7749" required />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input id="longitude" placeholder="e.g. -122.4194" required />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="radius">Radius (meters)</Label>
          <Input id="radius" type="number" placeholder="e.g. 100" min="1" required />
        </div>
        <div>
          <Label htmlFor="zone-type">Zone Type</Label>
          <Select defaultValue="office">
            <SelectTrigger id="zone-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="office">Office</SelectItem>
              <SelectItem value="lab">Laboratory</SelectItem>
              <SelectItem value="secure">Secure Area</SelectItem>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
              <SelectItem value="military">Military</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue" disabled={isLoading}>
        {isLoading ? "Adding Zone..." : "Add Geofence Zone"}
      </Button>
    </form>
  );
};

export default QuickAddZoneForm;
