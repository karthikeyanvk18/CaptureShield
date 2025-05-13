
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LifeBuoy, MessageSquare, Bug, FileQuestion, BookOpen, HelpCircle, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const SupportPanel = () => {
  const [supportMessage, setSupportMessage] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [bugEmail, setBugEmail] = useState('');
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Submitted",
      description: "We'll get back to you as soon as possible.",
    });
    setSupportMessage('');
  };

  const handleBugReport = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Bug Report Submitted",
      description: "Thank you for helping us improve CaptureShield.",
    });
    setBugDescription('');
  };

  const faqData = [
    { 
      question: "How do I create a new restricted zone?", 
      answer: "Navigate to the Manage Zones section, click the 'Create New Zone' button, then fill in the zone details including name, coordinates, and radius. You can also use the interactive map to select the location." 
    },
    { 
      question: "Can I temporarily disable a restricted zone?", 
      answer: "Yes, you can disable a zone without deleting it by accessing the zone details and toggling the 'Active' switch to off. This will temporarily suspend camera restrictions in that area." 
    },
    { 
      question: "How do I add a new user to the system?", 
      answer: "Go to the Manage Users section, click 'Add New User', and fill in their details. You can assign them user or admin roles depending on their responsibilities." 
    },
    { 
      question: "What happens if a user needs to use their camera in a restricted zone?", 
      answer: "Users who need temporary camera access in restricted zones can request an exception. Admins can then approve these requests and generate a time-limited access code from the Admin Dashboard." 
    },
    { 
      question: "How do I access detailed logs of camera restrictions?", 
      answer: "Navigate to the Device Logs section where you can view, filter, and export comprehensive logs of all camera access events, restrictions, and zone entries/exits." 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="border-b pb-3">
          <CardTitle className="flex items-center">
            <LifeBuoy className="mr-2 h-5 w-5 text-captureShield-teal" />
            Support
          </CardTitle>
          <CardDescription>Get help and provide feedback</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item}>
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="contact" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </TabsTrigger>
                  <TabsTrigger value="bugs" className="flex items-center">
                    <Bug className="h-4 w-4 mr-2" />
                    Report a Bug
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="flex items-center">
                    <FileQuestion className="h-4 w-4 mr-2" />
                    FAQ
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Contact Support Team</CardTitle>
                      <CardDescription>We typically respond within 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSupportSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="support-email">Email Address</Label>
                          <Input 
                            id="support-email" 
                            placeholder="your.email@example.com" 
                            value={supportEmail}
                            onChange={(e) => setSupportEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="support-message">How can we help?</Label>
                          <Textarea 
                            id="support-message" 
                            placeholder="Describe the issue or question you have..." 
                            className="min-h-[150px]"
                            value={supportMessage}
                            onChange={(e) => setSupportMessage(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue">
                            <Send className="h-4 w-4 mr-2" /> Submit Request
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bugs">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Report a Bug</CardTitle>
                      <CardDescription>Help us improve by reporting any issues</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleBugReport} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bug-email">Email Address</Label>
                          <Input 
                            id="bug-email" 
                            placeholder="your.email@example.com" 
                            value={bugEmail}
                            onChange={(e) => setBugEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bug-description">Bug Description</Label>
                          <Textarea 
                            id="bug-description" 
                            placeholder="Please describe what happened, including any error messages..." 
                            className="min-h-[150px]"
                            value={bugDescription}
                            onChange={(e) => setBugDescription(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bug-screenshot">Attach Screenshot (optional)</Label>
                          <Input 
                            id="bug-screenshot" 
                            type="file" 
                            accept="image/*"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue">
                            <Bug className="h-4 w-4 mr-2" /> Submit Bug Report
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="faq">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                      <CardDescription>Find quick answers to common questions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {faqData.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="hover:text-captureShield-teal">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-4 border-l-2 border-captureShield-teal/30">
                                {faq.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" /> View Full Documentation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
            
            <motion.div variants={item}>
              <div className="p-6 text-center text-muted-foreground bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-medium mb-6">Support Interface</h3>
                <ul className="list-disc text-left max-w-lg mx-auto space-y-3">
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    In-app feedback form
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Bug report system
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Live chat/support ticketing
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Help documentation
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    Frequently asked questions
                  </motion.li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              variants={item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-captureShield-teal/10 to-captureShield-darkBlue/10 rounded-lg p-5 border border-captureShield-teal/20"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
                  <HelpCircle className="h-6 w-6 text-captureShield-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Need additional help?</h3>
                  <p className="text-sm text-muted-foreground">Contact our dedicated support team</p>
                </div>
                <div className="ml-auto">
                  <Button className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue">
                    <MessageSquare className="h-4 w-4 mr-2" /> Chat Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SupportPanel;
