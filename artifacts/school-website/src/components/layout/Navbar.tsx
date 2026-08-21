import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '@assets/generated_images/logo.png';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/academics', label: 'Academics' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Main Navbar */}
      <div 
        className={`w-full bg-white transition-all duration-300 shadow-md py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <img 
              src={logoImg} 
              alt="Adarsh School Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-2xl text-primary leading-tight">
                Adarsh Sr. Sec. School
              </span>
              <span className="text-xs md:text-sm text-secondary font-medium tracking-wide">
                Est. 1995 • Jakhouli, Kaithal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              const isContact = link.href === '/contact';
              return (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`px-2 xl:px-3 py-2 rounded-md font-medium text-xs xl:text-sm transition-colors relative group cursor-pointer whitespace-nowrap inline-flex items-center
                      ${isContact
                        ? `border border-secondary/50 bg-secondary/10 font-semibold ${isActive ? 'text-secondary' : 'text-secondary hover:bg-secondary/20'}`
                        : isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'}
                    `}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-secondary transition-all duration-300
                      ${isContact ? 'hidden' : ''}
                      ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'}
                    `} />
                  </span>
                </Link>
              );
            })}
            <Link href="/admissions">
              <span className="ml-1 xl:ml-3 px-3 xl:px-4 py-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-xs xl:text-sm rounded-md shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap">
                Apply Now
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden absolute w-full shadow-lg"
            style={{ top: isScrolled ? '100%' : 'calc(100% + 36px)' }}
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`block text-lg font-medium py-2 px-3 rounded-md border-b border-border/50 ${
                    link.href === '/contact'
                      ? 'text-secondary bg-secondary/10 border-secondary/40 font-semibold'
                      : location === link.href ? 'text-primary border-secondary' : 'text-foreground'
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/admissions">
                <span className="inline-block mt-4 text-center w-full px-6 py-3 bg-secondary text-white font-semibold rounded-md shadow-sm">
                  Apply Now
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
