'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/app/components/Button';
import { Card } from '@/app/components/Card';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers/FirebaseAuthProvider';
import { useRouter } from 'next/navigation';

// AI Network Animation Component
const AINetworkAnimation = ({ complexity = 1 }) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  // Different network complexities based on tier
  const nodes = complexity === 1 ? 8 : complexity === 2 ? 15 : 25;
  const connections = complexity === 1 ? 15 : complexity === 2 ? 30 : 50;
  
  // Generate random positions for nodes
  const nodePositions = Array.from({ length: nodes }, () => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  }));
  
  // Generate connections between nodes
  const nodeConnections = Array.from({ length: connections }, () => {
    const from = Math.floor(Math.random() * nodes);
    let to = Math.floor(Math.random() * nodes);
    while (to === from) {
      to = Math.floor(Math.random() * nodes);
    }
    return { from, to };
  });
  
  // Animation speed based on complexity
  const animationDuration = complexity === 1 ? 2.5 : complexity === 2 ? 2 : 1.5;
  
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        style={{ 
          background: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
          borderRadius: '0.5rem'
        }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Connections */}
        {nodeConnections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            x1={nodePositions[conn.from].x}
            y1={nodePositions[conn.from].y}
            x2={nodePositions[conn.to].x}
            y2={nodePositions[conn.to].y}
            stroke={theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
            strokeWidth="0.5"
            className="animate-pulse"
            style={{ 
              animationDuration: `${animationDuration}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodePositions.map((pos, i) => (
          <circle
            key={`node-${i}`}
            cx={pos.x}
            cy={pos.y}
            r={complexity === 1 ? 1.2 : complexity === 2 ? 1.5 : 1.8}
            fill={theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
            className="animate-pulse"
            style={{ 
              animationDuration: `${animationDuration}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Data flow animations */}
        {Array.from({ length: complexity * 3 }).map((_, i) => {
          const startNode = Math.floor(Math.random() * nodes);
          const endNode = Math.floor(Math.random() * nodes);
          const duration = 2 + Math.random() * 2;
          
          return (
            <circle
              key={`flow-${i}`}
              r="0.5"
              fill={theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'}
            >
              <animateMotion
                path={`M ${nodePositions[startNode].x} ${nodePositions[startNode].y} L ${nodePositions[endNode].x} ${nodePositions[endNode].y}`}
                dur={`${duration}s`}
                repeatCount="indefinite"
                begin={`${Math.random() * 2}s`}
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
};

export default function PricingPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSignIn = () => {
    router.push('/auth/login');
  };
  
  const handleSignUp = () => {
    router.push('/auth/signup');
  };
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  if (!mounted) return null;
  
  const pricingPlans = [
    {
      name: 'Basic',
      price: { monthly: 0, yearly: 0 },
      description: 'Technicals practice only. Fundamental questions. Basic functionality.',
      features: [
        { text: 'Full Access to IB Fundamentals Collection (279 questions)', included: true },
        { text: 'No Access to "IB Vine Select" and "Reported in Interviews" Premium Collections', included: false },
        { text: 'Filter to Single Specific Collection & Topic', included: true },
        { text: 'Save Up to 5 Questions (With a Registered Account)', included: true },
        { text: 'N/A', included: false }
      ],
      complexity: 1,
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 10, yearly: 15 },
      description: 'Technicals practice only. Go beyond the fundamentals. Practice like a pro.',
      features: [
        { text: 'Full Access to All Technical Collections (553 total questions), including "IB Vine Select" (154 questions) and "Reported in Interviews" (120 questions across 19 banks) Premium Collections, as well as future additions', included: true },
        { text: 'Combine Unlimited Filters to Create Custom Question Banks', included: true },
        { text: 'Save Unlimited Questions', included: true }
      ],
      complexity: 2,
      cta: 'Upgrade to Pro Now',
      popular: false
    },
    {
      name: 'Diamond',
      price: { monthly: 15, yearly: 25 },
      description: 'Full-stack prep for your investment banking interviews.',
      features: [
        { text: 'Everything in Pro Tier, plus Access to', included: true },
        { text: '104 Behavioral Questions with Guidance', included: true },
        { text: '7 Review Modules for Core Technical Topics (Finance Fundamentals, Accounting, Enterprise & Equity Value, Valuation, Discounted Cash Flow, Mergers & Acquisitions, Leveraged Buyouts)', included: true },
        { text: '125 Minutes of Audio Lessons', included: true },
        { text: 'Add Personal Notes & Commentary to Each Question', included: true }
      ],
      complexity: 3,
      cta: 'Upgrade to Diamond Now',
      popular: false
    }
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      {/* Fixed Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                AIquisition
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/review" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Review
              </Link>
              <Link href="/practice" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Practice
              </Link>
              <Link href="/pricing" className="nav-link font-bold text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                Pricing
              </Link>
              {user && (
                <Link href="/account" className="nav-link text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
                  Account
                </Link>
              )}
            </div>

            {/* Auth Buttons and Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  Sign Out
                </button>
              )}
              {!user && (
                <button onClick={handleSignIn} className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                  Sign In
                </button>
              )}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pricing Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect plan for your investment banking interview preparation journey
            </p>
            
            {/* Early Bird Banner */}
            <div className="mt-6 inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
              ✨ Early Bird Discount (Ends May 25, 2025*)
            </div>
            
            {/* Billing Toggle */}
            <div className="mt-8 flex justify-center items-center space-x-4">
              <span className={`text-sm ${selectedInterval === 'monthly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setSelectedInterval(selectedInterval === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 bg-gray-200 dark:bg-gray-700"
                style={{ backgroundColor: selectedInterval === 'yearly' ? 'rgb(147, 51, 234)' : undefined }}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    selectedInterval === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm ${selectedInterval === 'yearly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                Yearly <span className="text-green-500">(2 Months Free)</span>
              </span>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                  selectedPlan === plan.name
                    ? 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-xl scale-105' 
                    : 'shadow-lg'
                } bg-white dark:bg-black border border-gray-200 dark:border-gray-800`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      ${selectedInterval === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  
                  {/* AI Network Animation */}
                  <div className="mb-6">
                    <AINetworkAnimation complexity={plan.complexity} />
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button 
                      className={`w-full ${
                        plan.name === 'Basic' 
                          ? 'bg-gray-800 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100' 
                          : 'bg-purple-600 hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-100'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Can I switch plans later?</h3>
                <p className="text-gray-600 dark:text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div className="bg-gray-50 dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Is there a refund policy?</h3>
                <p className="text-gray-600 dark:text-gray-400">We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team.</p>
              </div>
              <div className="bg-gray-50 dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Do you offer student discounts?</h3>
                <p className="text-gray-600 dark:text-gray-400">Yes, we offer a 20% discount for students with a valid .edu email address. Contact us for verification.</p>
              </div>
              <div className="bg-gray-50 dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-400">We accept all major credit cards, PayPal, and Apple Pay for subscription payments.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to ace your investment banking interviews?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Join thousands of successful candidates who have used AIquisition to prepare for their interviews.
            </p>
            <Link href="/auth/signup">
              <Button className="text-lg px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-gray-100">Get Started Today</Button>
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AIquisition. All rights reserved.</p>
            <p className="mt-2">* Early bird discount applies to annual plans only. Offer subject to change.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 