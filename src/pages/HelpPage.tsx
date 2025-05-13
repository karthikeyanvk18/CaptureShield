
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Book, Phone, Video, MessageSquare } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const HelpPage = () => {
  const { user } = useAuth();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const faqItems = [
    {
      question: "What is CaptureShield?",
      answer: "CaptureShield is a security application that helps organizations enforce camera usage policies in restricted areas through geofencing technology. It automatically disables device cameras when users enter designated sensitive zones."
    },
    {
      question: "How does geofencing work?",
      answer: "Geofencing creates virtual boundaries around physical locations. CaptureShield uses your device's GPS to determine if you're within a restricted zone. When you enter such a zone, the app automatically triggers camera restrictions based on the zone policy."
    },
    {
      question: "Can I customize geofence zones?",
      answer: "Administrators can create and customize geofence zones through the admin dashboard. Standard users can view the zones that apply to them but cannot modify them."
    },
    {
      question: "Is my location data secure?",
      answer: "Yes, all location data is processed locally on your device for privacy. When syncing with servers, data is encrypted during transmission. CaptureShield does not continuously track your location outside of determining zone entry/exit events."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-captureShield-darkBlue flex items-center justify-center gap-2 mb-2">
          <span className="text-captureShield-teal">Help & Support</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get assistance with CaptureShield features and functionality
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <motion.div 
          custom={0}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
        >
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
            <Book className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Documentation</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Comprehensive guides and documentation for using CaptureShield
          </p>
          <Button variant="outline" className="w-full">View Docs</Button>
        </motion.div>

        <motion.div 
          custom={1}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
        >
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20 mb-4">
            <Phone className="h-8 w-8 text-teal-500 dark:text-teal-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Contact Support</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get in touch with our support team for assistance
          </p>
          <Button variant="outline" className="w-full">Contact Us</Button>
        </motion.div>

        <motion.div 
          custom={2}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
        >
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20 mb-4">
            <Video className="h-8 w-8 text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Learn with guided video walkthroughs of features
          </p>
          <Button variant="outline" className="w-full">Watch Videos</Button>
        </motion.div>
      </div>

      <Tabs defaultValue="faq" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="faq">
            Frequently Asked Questions
          </TabsTrigger>
          <TabsTrigger value="contact">
            Contact Support
          </TabsTrigger>
          <TabsTrigger value="bug">
            Report a Bug
          </TabsTrigger>
          <TabsTrigger value="question">
            Ask a Question
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about CaptureShield</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form 
                action="https://formspree.io/f/mzzrvoqo" 
                method="POST"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUpVariants} custom={0} className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Your name" 
                    defaultValue={user?.fullName || user?.username || ""}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={1} className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Your email address" 
                    defaultValue={user?.email || ""}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={2} className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Support request subject" 
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={3} className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Describe your issue or question in detail" 
                    rows={6} 
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={4} className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue hover:opacity-90"
                  >
                    Submit Request
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bug">
          <Card>
            <CardHeader>
              <CardTitle>Report a Bug</CardTitle>
              <CardDescription>Help us improve by reporting bugs or issues</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form 
                action="https://formspree.io/f/xovdlrzz" 
                method="POST"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUpVariants} custom={0} className="grid gap-2">
                  <Label htmlFor="bug-name">Name</Label>
                  <Input 
                    id="bug-name" 
                    name="name" 
                    placeholder="Your name" 
                    defaultValue={user?.fullName || user?.username || ""}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={1} className="grid gap-2">
                  <Label htmlFor="bug-email">Email</Label>
                  <Input 
                    id="bug-email" 
                    name="email" 
                    type="email" 
                    placeholder="Your email address" 
                    defaultValue={user?.email || ""}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={2} className="grid gap-2">
                  <Label htmlFor="bug-location">Where did you find the bug?</Label>
                  <Input 
                    id="bug-location" 
                    name="bugLocation" 
                    placeholder="E.g., Camera page, Settings, etc." 
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={3} className="grid gap-2">
                  <Label htmlFor="bug-steps">Steps to reproduce</Label>
                  <Textarea 
                    id="bug-steps" 
                    name="bugSteps" 
                    placeholder="Describe what you were doing when the bug occurred" 
                    rows={3} 
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={4} className="grid gap-2">
                  <Label htmlFor="bug-description">Describe the bug</Label>
                  <Textarea 
                    id="bug-description" 
                    name="bugDescription"
                    placeholder="What happened? What did you expect to happen?" 
                    rows={4}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={5} className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue hover:opacity-90"
                  >
                    Submit Bug Report
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="question">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>Have a question that isn't answered in our FAQs?</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form 
                action="https://formspree.io/f/mpwdlbev" 
                method="POST"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={fadeInUpVariants} custom={0} className="grid gap-2">
                  <Label htmlFor="question-name">Name</Label>
                  <Input 
                    id="question-name" 
                    name="name" 
                    placeholder="Your name" 
                    defaultValue={user?.fullName || user?.username || ""}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={1} className="grid gap-2">
                  <Label htmlFor="question-email">Email</Label>
                  <Input 
                    id="question-email" 
                    name="email" 
                    type="email" 
                    placeholder="Your email address" 
                    defaultValue={user?.email || ""}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={2} className="grid gap-2">
                  <Label htmlFor="question-topic">Question Topic</Label>
                  <select 
                    id="question-topic" 
                    name="topic"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="account">Account</option>
                    <option value="camera">Camera Functionality</option>
                    <option value="geofencing">Geofencing</option>
                    <option value="security">Security</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={3} className="grid gap-2">
                  <Label htmlFor="question-text">Your Question</Label>
                  <Textarea 
                    id="question-text" 
                    name="question"
                    placeholder="Type your question here..." 
                    rows={6}
                    required 
                  />
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} custom={4} className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-captureShield-teal to-captureShield-darkBlue hover:opacity-90"
                  >
                    Submit Question
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div 
        className="bg-gradient-to-r from-captureShield-darkBlue to-captureShield-teal p-8 rounded-lg text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
        <p className="mb-6">Our support team is available to help you with any questions</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="text-white border-white hover:bg-white/10">
            <Phone className="mr-2 h-4 w-4" />
            Call Support
          </Button>
          <Button variant="secondary" className="bg-white text-captureShield-darkBlue hover:bg-white/90">
            <MessageSquare className="mr-2 h-4 w-4" />
            Live Chat
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpPage;
