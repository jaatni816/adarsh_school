import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, CheckCircle, AlertCircle, Loader2, User, MessageSquare } from 'lucide-react';
import heroCampusImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';
import { apiUrl } from '../lib/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

const MAPS_EMBED =
  'https://maps.google.com/maps?q=Adrash+Senior+Secondary+School,+Jakhouli,+Kaithal,+Haryana&t=&z=16&ie=UTF8&iwloc=&output=embed';

const MAPS_LINK =
  'https://maps.google.com/maps?q=Adrash+Senior+Secondary+School,+Jakhouli,+Kaithal,+Haryana';

const inputClass =
  'w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary bg-gray-50 focus:bg-white transition-colors text-sm';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', phone: '', email: '', city: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    }
  };

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

        {/* Contact Cards */}
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

        {/* Map */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Find Us on the Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
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
          <div className="mt-4 bg-secondary/10 border border-secondary/20 rounded-xl p-5">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong className="text-primary">How to reach us:</strong> Adarsh Senior Secondary School is located on the Jakhouli–Kassan Road, Jakhouli, Kaithal district, Haryana.
              For directions, tap <strong>"Open in Google Maps"</strong> above or call us at{' '}
              <strong className="text-secondary">+91 74041 20200</strong> during school hours.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-2">Send Us a Message</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Have a question or feedback? Fill out the form below and we will get back to you.
          </p>

          <div className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12 gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-11 h-11 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-serif">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-3 px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}

            {status !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                      <User className="w-4 h-4 text-secondary" /> Full Name *
                    </label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                      <Phone className="w-4 h-4 text-secondary" /> Phone Number *
                    </label>
                    <input
                      type="tel" name="phone" required
                      value={form.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                      <Mail className="w-4 h-4 text-secondary" /> Email Address
                    </label>
                    <input
                      type="email" name="email"
                      value={form.email} onChange={handleChange}
                      placeholder="your@email.com (optional)"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                      <MapPin className="w-4 h-4 text-secondary" /> Village / City
                    </label>
                    <input
                      type="text" name="city"
                      value={form.city} onChange={handleChange}
                      placeholder="e.g. Jakhouli, Kaithal"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                    <MessageSquare className="w-4 h-4 text-secondary" /> Subject *
                  </label>
                  <input
                    type="text" name="subject" required
                    value={form.subject} onChange={handleChange}
                    placeholder="What is this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                    <MessageSquare className="w-4 h-4 text-secondary" /> Message *
                  </label>
                  <textarea
                    name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Write your message here..."
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <p className="text-xs text-muted-foreground">* Required fields</p>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-secondary text-white font-bold rounded-xl shadow-md hover:bg-secondary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
