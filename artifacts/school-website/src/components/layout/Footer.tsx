import React from 'react';
import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import logoImg from '@assets/generated_images/logo.png';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
                <img src={logoImg} alt="Adarsh School Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-xl font-serif font-bold text-white">Adarsh Sr. Sec. School</h2>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mt-4">
              Empowering minds, building character, and nurturing the future leaders of India from the heart of Haryana.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-accent">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Academic Programs', href: '/academics' },
                { label: 'Admissions 2025', href: '/admissions' },
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-primary-foreground/80 hover:text-accent hover:pl-2 transition-all cursor-pointer inline-block">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-accent">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Jakhouli Kassan Road, <br />Jakhouli (Kaithal), Haryana</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+91 74041 20200</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>adarshschoolktl@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Visiting Hours */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-accent">School Hours</h3>
            <ul className="space-y-4 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Summer Timings</p>
                  <p className="text-sm">Mon - Sat: 8:00 AM - 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Winter Timings</p>
                  <p className="text-sm">Mon - Sat: 9:00 AM - 3:00 PM</p>
                </div>
              </li>
              <li className="mt-4 p-3 bg-white/5 rounded-md border border-white/10">
                <p className="text-xs text-accent">Affiliated to BSEH (School Code: 10253)</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Adarsh Senior Secondary School. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/"><span className="hover:text-white cursor-pointer">Privacy Policy</span></Link>
            <Link href="/"><span className="hover:text-white cursor-pointer">Terms of Service</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
