import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, History, Target, Shield, Heart, Users, BookOpen, Trophy, GraduationCap } from 'lucide-react';
import exteriorImg from '@assets/generated_images/exterior.jpg';
import heroCampusImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';
import prayerAssemblyImg from '@assets/generated_images/prayer_assembly.jpg';
import annualFunctionImg from '@assets/generated_images/annual_function.jpg';
import principalImg from '@assets/generated_images/principal.jpg';
import classroomImg from '@assets/generated_images/classroom.jpg';
import elearningFounderImg from '@assets/dev_sir_image-removebg-preview_(1)_1784785284046.png';

const milestones = [
  { year: '1995', event: 'School established by local community leaders in Jakhouli village, Kaithal.' },
  { year: '2000', event: 'Received official affiliation from Board of School Education Haryana (BSEH).' },
  { year: '2005', event: 'Senior Secondary (Class XI–XII) classes introduced with Science and Arts streams.' },
  { year: '2010', event: 'Commerce stream added; new library and science laboratory block constructed.' },
  { year: '2015', event: 'Computer lab with 40 PCs inaugurated; school crossed 800 student enrollment.' },
  { year: '2020', event: 'Smart classrooms installed with digital boards in all Senior Secondary sections.' },
  { year: '2024', event: '100% pass rate achieved in BSEH Board; district topper from Adarsh School.' },
];

export default function About() {
  return (
    <div className="pt-[80px] md:pt-[90px] pb-20 w-full min-h-screen">

      {/* Page Header */}
      <div className="bg-primary text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCampusImg} alt="" className="w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-primary/35" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            About Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-primary-foreground/80 text-lg max-w-2xl">
            Serving the rural heartland of Haryana with pride, values, and academic excellence since 1995.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-secondary rounded-full mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">

        {/* ── Elearning Pathshala ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-primary shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] items-center">
            <div className="relative z-10 p-8 md:p-12">
              <div className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/25 mb-5">
                Digital Learning Initiative
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent mb-5">
                Elearning Pathshala
              </h2>
              <div className="space-y-4 text-primary-foreground/90 text-sm md:text-base leading-relaxed max-w-3xl">
                <p>
                  <strong className="text-white">Elearningpathshala</strong> is a platform made by <strong className="text-white">Dr. Devender Arya (Founder)</strong> and team members from IITs and leading universities around the world. It was created during the <strong className="text-white">COVID-19 pandemic</strong> to help students continue learning when schools were closed.
                </p>
                <p>
                  The platform helps <strong className="text-white">students learn</strong> and <strong className="text-white">parents earn money</strong> through a full-fledged online and offline education solution.
                </p>
                <p>
                  Elearning Pathshala provides well-researched digital study material at students’ doorsteps, helping them build a clear understanding of every basic concept.
                </p>
              </div>
            </div>
            <div className="relative flex min-h-[280px] items-end justify-center overflow-hidden border-t-4 border-accent/40 bg-gradient-to-br from-amber-50 via-white to-sky-50 px-6 pt-8 lg:border-l-4 lg:border-t-0">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-2xl" />
              <img
                src={elearningFounderImg}
                alt="Dr. Devender Arya, founder of Elearning Pathshala"
                className="relative z-10 max-h-[330px] w-auto max-w-full rounded-2xl bg-white/85 p-2 object-contain object-bottom shadow-2xl ring-1 ring-primary/10"
              />
            </div>
          </div>
        </motion.section>

        {/* ── School History ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-5">
              <History className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-serif font-bold text-primary">Our Legacy</h2>
            </div>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-base">
              <p>
                Established in <strong>1995</strong>, Adarsh Senior Secondary School was born out of a noble vision to bring high-quality, holistic education to the rural heartland of Haryana. Located in the peaceful village of <strong>Jakhouli, Kaithal</strong>, we started with a modest building and a handful of dedicated teachers who believed every child deserved the best.
              </p>
              <p>
                Over the past 28+ years, we have grown into a premier institution recognized by the <strong>Board of School Education Haryana (BSEH)</strong>. We have proudly educated thousands of students who have gone on to excel in fields ranging from medicine, engineering, and civil services to agriculture and entrepreneurship.
              </p>
              <p>
                Our roots are deeply Indian, and we pride ourselves on maintaining a balance between modern pedagogical methods and traditional moral values. The school stands as a pillar of education for the entire Jakhouli and Kaithal region.
              </p>
              <p>
                Today, Adarsh School is not merely an institution — it is a movement that brings hope, opportunity, and dignity to every family in the village who believes in the power of education.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-2xl rotate-2" />
            <img src={exteriorImg} alt="Adarsh School Building" className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-5 -right-5 bg-secondary text-white px-5 py-3 rounded-xl shadow-lg font-bold text-sm">
              Est. 1995 &bull; Jakhouli, Kaithal
            </div>
          </motion.div>
        </div>

        {/* ── Milestone Timeline ── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-3">Our Journey Through the Years</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Key milestones that shaped Adarsh School into the institution it is today.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary/30 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12 text-left'}`}>
                    <div className="bg-white border border-border rounded-xl p-5 shadow-sm inline-block text-left max-w-sm">
                      <p className="text-foreground/80 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center md:w-0">
                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-md">
                      {m.year.slice(2)}
                    </div>
                    <span className="text-xs font-bold text-secondary mt-1 whitespace-nowrap">{m.year}</span>
                  </div>
                  <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? 'md:hidden' : 'md:pl-12'}`}>
                    <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
                      <p className="text-foreground/80 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Vision & Mission ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary p-8 md:p-12 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <Target className="w-12 h-12 text-accent mb-6 opacity-80" />
            <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
            <p className="text-primary-foreground/90 leading-relaxed text-lg mb-6">
              "To be a centre of excellence in rural education, empowering students with the knowledge, skills, and values required to become responsible, innovative, and compassionate global citizens."
            </p>
            <p className="text-primary-foreground/75 text-sm leading-relaxed">
              We envision every student from Jakhouli and Kaithal district having access to world-class education that builds both intellect and character.
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-white border-2 border-primary/10 p-8 md:p-12 rounded-2xl shadow-xl">
            <Shield className="w-12 h-12 text-secondary mb-6 opacity-80" />
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Our Mission</h3>
            <ul className="space-y-4">
              {[
                "Provide accessible, high-quality education to every student in the rural community.",
                "Foster an inclusive environment that promotes intellectual and emotional growth.",
                "Blend modern technology with traditional Indian moral values.",
                "Encourage active participation in sports, arts, and community service.",
                "Prepare students for competitive examinations including JEE, NEET, and UPSC.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-foreground/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── School Life Photos ── */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-primary mb-3">Our School in Pictures</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Life at Adarsh School — from morning assemblies to annual day celebrations in Jakhouli.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src={prayerAssemblyImg} alt="Morning Prayer Assembly" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src={classroomImg} alt="Smart Classroom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src={annualFunctionImg} alt="Annual Function" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="bg-primary rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {[
              { icon: Users, val: '1200+', label: 'Total Students' },
              { icon: BookOpen, val: '45+', label: 'Qualified Teachers' },
              { icon: Trophy, val: '28+', label: 'Years of Service' },
              { icon: GraduationCap, val: '100%', label: 'Board Pass Rate' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <s.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold font-serif mb-1">{s.val}</div>
                <div className="text-primary-foreground/70 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Core Values ── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-3">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The pillars that support our educational philosophy and shape our students' character every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Integrity", icon: Shield, desc: "Doing the right thing always, even when no one is watching. Honesty is the foundation of our school culture." },
              { title: "Excellence", icon: Target, desc: "Striving for the highest standards in academics, sports, and character development in every endeavor." },
              { title: "Respect", icon: Heart, desc: "Valuing diversity and treating every student, teacher, and community member with dignity and kindness." },
              { title: "Responsibility", icon: CheckCircle2, desc: "Taking ownership of our actions and contributing positively to our school, village, and nation." },
            ].map((val, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-muted/40 p-6 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-border"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <val.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2 font-serif">{val.title}</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
