import React from 'react';
import { Brush, User, Home, Paintbrush, Sprout, Hammer, Laptop, Wrench, Users, MessageCircle, ShoppingCart } from 'lucide-react';

// import { Button } from '@/components/ui/button'; // Removed problematic import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";


// Service data with icons
const servicesData = [
  {
    title: 'Grooming',
    description: 'Professional grooming services for all your needs.',
    icon: Brush,
    route: '/grooming',
  },
  {
    title: "Men's Beauty",
    description: 'Specialized beauty and personal care for men.',
    icon: User,
    route: '/mens-beauty',
  },
  {
    title: 'Cleaning Houses',
    description: 'Reliable and thorough house cleaning services.',
    icon: Home,
    route: '/house-cleaning',
  },
  {
    title: 'Paintings',
    description: 'High-quality painting services for your home or office.',
    icon: Paintbrush,
    route: '/painting',
  },
  {
    title: 'Gardening',
    description: 'Professional gardening and landscaping services.',
    icon: Sprout,
    route: '/gardening',
  },
  {
    title: 'Handyman',
    description: 'Versatile handyman services for repairs and maintenance.',
    icon: Hammer,
    route: '/handyman',
  },
  {
    title: 'Web Development',
    description: 'Custom web development and design services.',
    icon: Laptop,
    route: '/web-development',
  },
  {
    title: 'Repairs',
    description: 'General repairs services.',
    icon: Wrench,
    route: '/repairs',
  },
  {
    title: 'Community',
    description: 'Connect with others, join groups, and participate in discussions.',
    icon: Users,
    route: '/community',
  },
  {
    title: 'Blog',
    description: 'Read articles, share your thoughts, and engage in conversations.',
    icon: MessageCircle,
    route: '/blog',
  },
  {
    title: 'Shopping',
    description: 'Purchase products.',
    icon: ShoppingCart,
    route: '/shopping',
  },
];

const Services = () => {
  // Animation variants for the service cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    hover: { scale: 1.03 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore a wide range of services designed to meet your needs. We are
            committed to providing high-quality solutions and exceptional
            customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon; // Get the icon component
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="w-full" // Ensure cards take up full width of their column
              >
                <Card
                  className={cn(
                    "transition-all duration-300 transform",
                    "border border-gray-200 dark:border-gray-700",
                    "bg-white dark:bg-gray-800",
                    "hover:shadow-lg dark:hover:shadow-gray-700/50",
                    "overflow-hidden flex flex-col h-full" // Make card a flex container
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  <div className="p-4">
                    {/* Replaced problematic Button with a standard button */}
                    <a href={service.route} className={cn(
                        "w-full", // Make button take full width of card
                        "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded",
                        "dark:bg-blue-400 dark:hover:bg-blue-500",
                        "transition-colors duration-200 text-center"
                    )}>
                        Learn More <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Future Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Future Features
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are constantly working to improve our services and add new
            features.  Here are some upcoming additions:
          </p>
          <ul className="mt-8 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Personalized Recommendations:</span>
              AI-powered recommendations to suggest the best services for you.
            </li>
            <li>
              <span className="font-medium">Service Bundles:</span>
              Combine multiple services for discounted prices.
            </li>
            <li>
              <span className="font-medium">Subscription Plans:</span>
              регулярные услуги и дополнительные преимущества.
            </li>
            <li>
              <span className="font-medium">Enhanced Communication:</span>
              Direct messaging with service providers.
            </li>
            <li>
              <span className="font-medium">Loyalty Programs:</span>
              Earn points and rewards for frequent use.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
