import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { BookOpen, Trophy, Users, GraduationCap, ChevronRight, ChevronLeft, ArrowRight, Star, Award, Leaf, X, ZoomIn } from 'lucide-react';
import logoImg from '@assets/generated_images/logo.png';
import heroBannerImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';
import classroomImg from '@assets/generated_images/classroom.jpg';
import sportsDayImg from '@assets/generated_images/sports_day.jpg';
import annualFunctionImg from '@assets/generated_images/annual_function.jpg';
import prayerAssemblyImg from '@assets/generated_images/prayer_assembly.jpg';
import studentsStudyingImg from '@assets/generated_images/students_studying.jpg';
import schoolBuilding2Img from '@assets/generated_images/school_building2.jpg';
import achievementsImg from '@assets/generated_images/achievements.jpg';
import nationalAwardImg from '@assets/generated_images/national_award.jpg';

const stats = [
  { label: 'Students', value: 1200, suffix: '+', icon: Users },
  { label: 'Expert Teachers', value: 45, suffix: '+', icon: BookOpen },
  { label: 'Years of Excellence', value: 28, suffix: '', icon: Trophy },
  { label: 'Pass Percentage', value: 100, suffix: '%', icon: GraduationCap },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: '-15% 0px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, isInView]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function Home() {
  const [lightbox, setLightbox] = useState<number>(-1);

  const gallery = [
    { img: prayerAssemblyImg,  label: 'Morning Assembly' },
    { img: classroomImg,       label: 'School Campus' },
    { img: sportsDayImg,       label: 'NCC Events' },
    { img: annualFunctionImg,  label: 'School Activities' },
    { img: studentsStudyingImg,label: 'Students' },
    { img: schoolBuilding2Img, label: 'School Front View' },
    { img: achievementsImg,    label: 'Student Achievements' },
    { img: nationalAwardImg,   label: 'National & State Awards' },
  ];

  const isOpen = lightbox >= 0;
  const prev = () => setLightbox((p) => (p - 1 + gallery.length) % gallery.length);
  const next = () => setLightbox((p) => (p + 1) % gallery.length);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(-1);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, lightbox]);

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen w-full bg-primary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBannerImg} alt="Adarsh School Campus" className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/20 to-primary/55" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-32 md:py-40">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, type: 'spring' }}
            className="mb-6"
          >
            <img
              src={logoImg}
              alt="Adarsh School Crest"
              className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl bg-white rounded-full p-2 border-4 border-accent/60"
            />
          </motion.div>

          {/* School Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-serif mb-4 drop-shadow-lg leading-tight"
          >
            Adarsh Senior Secondary
            <br />
            <span className="text-accent">School, Jakhouli</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base sm:text-xl text-white/85 max-w-2xl mb-4 font-medium"
          >
            Nurturing rural talent to achieve global standards of excellence since 1995.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-sm sm:text-base text-white/70 mb-10 font-normal"
          >
            Affiliated to Board of School Education Haryana (BSEH) &bull; Jakhouli, Kaithal, Haryana
          </motion.p>

          {/* CTA Buttons — clearly visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 z-20 relative"
          >
            <Link href="/admissions">
              <span className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-lg shadow-2xl hover:bg-secondary/90 hover:scale-105 transition-all cursor-pointer text-base sm:text-lg border-2 border-secondary">
                Apply for Admission <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link href="/about">
              <span className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-lg shadow-2xl hover:bg-white/20 hover:scale-105 transition-all cursor-pointer text-base sm:text-lg border-2 border-white/70">
                Discover Our School <ChevronRight className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,123.82,192.27,108.86,236.4,98.4,281.4,79.16,321.39,56.44Z" className="fill-background"></path>
          </svg>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 bg-background relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-xl p-5 md:p-8 flex flex-col items-center text-center border-t-4 border-secondary hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-primary font-serif mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-muted-foreground font-medium text-xs md:text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Principal's Message ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm border border-secondary/20">
                Welcome to Adarsh School
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">
                Empowering Rural India Through Quality Education
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Located in the serene environment of Jakhouli village, Adarsh Senior Secondary School has been a beacon of learning for over two decades. We believe that true education goes beyond textbooks — shaping character, instilling values, and preparing students for the challenges of tomorrow.
              </p>
              <p className="text-base text-foreground/70 leading-relaxed">
                Our institution proudly serves the Kaithal district with a strong tradition of academic discipline, cultural richness, and community service. Every child who enters our gates carries with them the hope of a brighter Haryana.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">HBSE Affiliated</h4>
                    <p className="text-sm text-muted-foreground">State board curriculum for holistic growth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-secondary shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Excellent Results</h4>
                    <p className="text-sm text-muted-foreground">Consistent top performers in Kaithal district.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/about">
                  <span className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors cursor-pointer group">
                    Read More About Us
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── School Life Photos ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Life at Adarsh School</h2>
            <p className="text-muted-foreground text-lg">A glimpse into the vibrant academic and cultural life of our school in Jakhouli, Kaithal.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setLightbox(i)}
                className="relative rounded-xl overflow-hidden aspect-square group shadow-md hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-secondary/50"
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-between p-3">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow" />
                  <span className="text-white text-sm font-semibold w-full text-left">{item.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer shadow-md">
                View Full Gallery <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Campus & Facilities</h2>
            <p className="text-lg text-muted-foreground">State-of-the-art infrastructure designed to provide a conducive environment for both academic and extracurricular excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Smart Classrooms', img: classroomImg, desc: 'Interactive digital boards and ergonomic seating for focused learning.' },
              { title: 'Sports & NCC', img: sportsDayImg, desc: 'Cricket, volleyball, kabaddi and NCC activities for physical and moral development.' },
              { title: 'School Activities', img: annualFunctionImg, desc: 'Cultural events, annual functions and extracurricular programmes throughout the year.' },
              { title: 'Student Life', img: studentsStudyingImg, desc: 'A vibrant campus where students grow academically and personally every day.' },
              { title: 'Sports Grounds', img: sportsDayImg, desc: 'Expansive fields for athletics, cricket, and courts for volleyball and kabaddi.' },
              { title: 'Cultural Hall', img: annualFunctionImg, desc: 'Large auditorium for annual functions, debates, and prayer assemblies.' },
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={facility.img} alt={facility.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 font-serif">{facility.title}</h3>
                  <p className="text-muted-foreground text-sm">{facility.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements Banner ── */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Achievements</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Adarsh School has produced outstanding results and proud alumni across all disciplines.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Star, title: 'District Topper 2024', desc: 'Our student scored 98% in Class XII BSEH Board Examinations.' },
              { icon: Award, title: 'Best School Award', desc: 'Recognized by Kaithal District Education Dept. for academic excellence.' },
              { icon: Leaf, title: '100% Pass Rate', desc: 'Maintained 100% pass rate in Class X & XII for 5 consecutive years.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/10 border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-colors"
              >
                <item.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold font-serif mb-3">{item.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Admissions Open for Session 2025-26</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Give your child the gift of quality education in Jakhouli, Kaithal. Enroll today and be a part of the Adarsh family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admissions">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-lg shadow-lg hover:bg-secondary/90 hover:scale-105 transition-all cursor-pointer text-lg">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 hover:scale-105 transition-all cursor-pointer text-lg">
                  Contact Us
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={() => setLightbox(-1)}
        >
          {/* Image card — stop propagation so clicking image doesn't close */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <div className="mb-3 text-white/60 text-sm font-medium tracking-wide">
              {lightbox + 1} / {gallery.length}
            </div>

            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={gallery[lightbox].img}
                alt={gallery[lightbox].label}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              {/* Label bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
                <p className="text-white font-semibold text-lg">{gallery[lightbox].label}</p>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-6 mt-5">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/15 hover:bg-secondary flex items-center justify-center text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox(idx)}
                    className={`rounded-full transition-all ${idx === lightbox ? 'w-6 h-2.5 bg-secondary' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/15 hover:bg-secondary flex items-center justify-center text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setLightbox(-1)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}

    </div>
  );
}
