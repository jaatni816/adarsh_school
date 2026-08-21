import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import heroCampusImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';

const MAPS_EMBED =
  'https://maps.google.com/maps?q=Adrash+Senior+Secondary+School,+Jakhouli,+Kaithal,+Haryana&t=&z=16&ie=UTF8&iwloc=&output=embed';

const MAPS_LINK =
  'https://maps.google.com/maps?q=Adrash+Senior+Secondary+School,+Jakhouli,+Kaithal,+Haryana';

export default function Contact() {
  return (
    <div className="pt-[80px] md:pt-[90px] pb-20 w-full min-h-screen bg-gray-50/50">

      {/* Hero */}
      <div className="bg-primary text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCampusImg} alt="" className="w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-primary/35" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg max-w-xl">
            Reach out to Adarsh Senior Secondary School, Jakhouli, Kaithal — we are always here to help.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-secondary rounded-full mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">

        {/* Contact Cards — 4-column grid */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">School Address</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Adarsh Sr. Sec. School,<br />
                Jakhouli Kassan Road,<br />
                Jakhouli (Kaithal), Haryana
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">Phone Numbers</h3>
              <p className="text-muted-foreground text-sm">+91 74041 20200</p>
              <p className="text-muted-foreground text-xs mt-1">(Mon–Sat, 8 AM – 3 PM)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">adarshschoolktl@gmail.com</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base mb-2">Office Hours</h3>
              <p className="text-muted-foreground text-sm">Monday – Friday: 8:00 AM – 4:00 PM</p>
              <p className="text-muted-foreground text-sm">Saturday: 8:00 AM – 1:00 PM</p>
              <p className="text-muted-foreground text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Map — full width, tall */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Find Us on the Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            {/* Map bar */}
            <div className="bg-primary px-5 py-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary shrink-0" />
              <span className="text-sm font-semibold text-white">
                Adarsh Sr. Sec. School — Jakhouli Kassan Road, Jakhouli, Kaithal, Haryana
              </span>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-secondary bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors shrink-0"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Maps embed */}
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Adarsh School Location — Jakhouli, Kaithal"
            />
          </div>

          {/* Direction note */}
          <div className="mt-4 bg-secondary/10 border border-secondary/20 rounded-xl p-5">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong className="text-primary">How to reach us:</strong> Adarsh Senior Secondary School is located on the Jakhouli–Kassan Road, Jakhouli, Kaithal district, Haryana.
              For directions, tap <strong>"Open in Google Maps"</strong> above or call us at{' '}
              <strong className="text-secondary">+91 74041 20200</strong> during school hours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
