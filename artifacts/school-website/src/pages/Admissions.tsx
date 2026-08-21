import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, CalendarClock, UserCheck, CheckCircle2, ArrowRight,
  Send, CheckCircle, AlertCircle, Loader2, User, Phone, Mail,
  BookOpen, MapPin, Calendar, Users,
} from 'lucide-react';
import heroCampusImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';
import studentsStudyingImg from '@assets/generated_images/students_studying.jpg';

type Status = 'idle' | 'loading' | 'success' | 'error';

const CLASSES = [
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11 – Science', 'Class 11 – Commerce', 'Class 11 – Arts', 'Class 12',
];

const inputClass =
  'w-full px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary bg-gray-50 focus:bg-white transition-colors text-sm';

export default function Admissions() {
  const [form, setForm] = useState({
    studentName: '', dob: '', mobile: '', classApplying: '',
    village: '', email: '', parentName: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
      setForm({ studentName: '', dob: '', mobile: '', classApplying: '', village: '', email: '', parentName: '' });
    } catch {
      const saved = JSON.parse(localStorage.getItem('admission_applications') ?? '[]');
      saved.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem('admission_applications', JSON.stringify(saved));
      setStatus('success');
      setForm({ studentName: '', dob: '', mobile: '', classApplying: '', village: '', email: '', parentName: '' });
    }
  };

  return (
    <div className="pt-[80px] md:pt-[90px] pb-20 w-full min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="bg-primary text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCampusImg} alt="" className="w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-primary/35" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Admissions 2025-26
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-primary-foreground/80 max-w-2xl">
            Join the Adarsh family in Jakhouli, Kaithal. Admissions now open for Classes VI to XII.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-secondary rounded-full mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Photo + intro */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={studentsStudyingImg} alt="Students at Adarsh School" className="w-full h-64 object-cover" />
              <div className="bg-white border border-border p-6">
                <p className="text-foreground/80 leading-relaxed">
                  Adarsh Senior Secondary School, Jakhouli, Kaithal welcomes students from Class VI onwards. We are committed to providing every student in the Kaithal district access to quality BSEH-affiliated education in a safe, nurturing environment. Join 1,200+ students and 45+ dedicated teachers who make Adarsh School a centre of excellence in rural Haryana.
                </p>
              </div>
            </div>

            {/* ── Admission Application Form ── */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6 text-secondary" /> Admission Application Form
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Fill out the form below. We will contact you within 24 hours to confirm your application.
              </p>

              <div className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8">

                {/* Success */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-11 h-11 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary font-serif">Application Submitted!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                      Thank you for applying to Adarsh School. Our team will review your application and contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-3 px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                )}

                {status !== 'success' && (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Error */}
                    {status === 'error' && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm">{errorMsg}</p>
                      </div>
                    )}

                    {/* Row 1 — Student Name + DOB */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <User className="w-4 h-4 text-secondary" /> Student Name *
                        </label>
                        <input
                          type="text" name="studentName" required
                          value={form.studentName} onChange={handleChange}
                          placeholder="Full name of student"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <Calendar className="w-4 h-4 text-secondary" /> Date of Birth *
                        </label>
                        <input
                          type="date" name="dob" required
                          value={form.dob} onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 2 — Parent Name + Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <Users className="w-4 h-4 text-secondary" /> Parent / Guardian Name *
                        </label>
                        <input
                          type="text" name="parentName" required
                          value={form.parentName} onChange={handleChange}
                          placeholder="Father / Mother / Guardian name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <Phone className="w-4 h-4 text-secondary" /> Mobile Number *
                        </label>
                        <input
                          type="tel" name="mobile" required
                          value={form.mobile} onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 3 — Class + Village */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <BookOpen className="w-4 h-4 text-secondary" /> Class Applying For *
                        </label>
                        <select
                          name="classApplying" required
                          value={form.classApplying} onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select Class</option>
                          {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <MapPin className="w-4 h-4 text-secondary" /> Village / City
                        </label>
                        <input
                          type="text" name="village"
                          value={form.village} onChange={handleChange}
                          placeholder="e.g. Jakhouli, Kaithal"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Row 4 — Email */}
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                        <Mail className="w-4 h-4 text-secondary" /> Email Address
                      </label>
                      <input
                        type="email" name="email"
                        value={form.email} onChange={handleChange}
                        placeholder="parent@email.com (optional)"
                        className={inputClass}
                      />
                    </div>

                    {/* Required note */}
                    <p className="text-xs text-muted-foreground">* Required fields</p>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-secondary text-white font-bold rounded-xl shadow-md hover:bg-secondary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Submit Application</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </section>

            {/* Admission Process */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-secondary" /> Step-by-Step Admission Process
              </h2>
              <div className="space-y-5">
                {[
                  { step: "01", title: "Registration", desc: "Fill the online form above or obtain the form from the school office. Submit it with the application fee before the deadline. Forms available from 15 March 2025." },
                  { step: "02", title: "Entrance Assessment", desc: "For Classes IX to XI, a basic entrance assessment is conducted in Mathematics, Science/Accounts, and English. Class VI–VIII students are directly eligible." },
                  { step: "03", title: "Parent Interaction", desc: "A brief interaction between parents/guardian and the Principal to understand the child's background, learning needs, and expectations." },
                  { step: "04", title: "Document Verification", desc: "Submit all required documents at the school office. Admission committee will review and confirm the seat within 2 working days." },
                  { step: "05", title: "Fee Payment & Confirmation", desc: "Pay the admission fee at the school cashier. Upon receipt, the seat is confirmed and a welcome kit is provided." },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-5 p-5 bg-white rounded-xl shadow-sm border border-border hover:border-secondary/40 transition-colors"
                  >
                    <div className="text-4xl font-bold text-primary/10 font-serif leading-none shrink-0">{item.step}</div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Documents Required */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-secondary" /> Documents Required
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                <ul className="space-y-3">
                  {[
                    "Date of Birth Certificate / Birth Registration (Original & photocopy)",
                    "School Leaving Certificate (SLC) from previous school — attested copy",
                    "Previous year's mark sheet / report card (Class V, VIII, X as applicable)",
                    "Transfer Certificate from previous school (for Classes IX–XII)",
                    "Aadhar Card photocopy of student and both parents/guardians",
                    "Parivar Pehchan Patra (Family ID) — Haryana residents",
                    "Caste Certificate (for SC/BC category fee concession)",
                    "4 passport size photographs of the student (recent, coloured)",
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Important Dates */}
            <div className="bg-primary p-6 rounded-xl text-white shadow-lg">
              <h3 className="text-xl font-serif font-bold mb-5 flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-accent" /> Important Dates
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Registration Opens", date: "15 March 2025" },
                  { label: "Last Date to Apply", date: "31 March 2025" },
                  { label: "Entrance Assessment (IX–XI)", date: "5 April 2025" },
                  { label: "Result Declaration", date: "8 April 2025" },
                  { label: "Document Submission", date: "10–12 April 2025" },
                  { label: "New Session Begins", date: "15 April 2025" },
                ].map((item, i) => (
                  <li key={i} className="border-b border-white/15 pb-3 last:border-0 last:pb-0">
                    <span className="block text-xs text-white/60 mb-0.5">{item.label}</span>
                    <span className="font-semibold text-accent text-sm">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Adarsh */}
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="text-lg font-serif font-bold text-primary mb-4">Why Choose Adarsh School?</h3>
              <ul className="space-y-3">
                {[
                  "BSEH affiliated — trusted since 1995",
                  "100% Board pass rate in 2024",
                  "Experienced & caring teachers",
                  "Science, Commerce & Arts streams",
                  "Affordable fees for all families",
                  "Modern labs, library & computer centre",
                  "Located in Jakhouli, Kaithal, Haryana",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-5 text-center">
              <p className="text-sm font-semibold text-primary mb-1">Need help with admission?</p>
              <p className="text-xs text-muted-foreground mb-3">Call us directly during school hours</p>
              <a href="tel:+917404120200"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-white font-bold rounded-lg text-sm hover:bg-secondary/90 transition-colors">
                <Phone className="w-4 h-4" /> +91 74041 20200
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
