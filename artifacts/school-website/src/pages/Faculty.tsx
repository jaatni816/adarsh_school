import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import exteriorImg from '@assets/generated_images/exterior.jpg';

const facultyList = [
  {
    name: "Mrs. Sunita Sharma",
    role: "Vice Principal / PGT",
    subject: "English Literature",
    qual: "M.A. (English), B.Ed.",
    exp: "18 Years",
  },
  {
    name: "Mr. Amit Singh",
    role: "PGT Science",
    subject: "Physics & Chemistry",
    qual: "M.Sc. (Physics), B.Ed.",
    exp: "14 Years",
  },
  {
    name: "Mrs. Meena Devi",
    role: "TGT Languages",
    subject: "Hindi & Sanskrit",
    qual: "M.A. (Hindi), B.Ed.",
    exp: "16 Years",
  },
  {
    name: "Mr. Rakesh Ahlawat",
    role: "PTI",
    subject: "Physical Education",
    qual: "B.P.Ed.",
    exp: "10 Years",
  },
  {
    name: "Ms. Priya Verma",
    role: "PGT Computer",
    subject: "Computer Science",
    qual: "B.Tech (CS), B.Ed.",
    exp: "8 Years",
  },
  {
    name: "Mr. Om Prakash",
    role: "PGT Mathematics",
    subject: "Mathematics",
    qual: "M.Sc. (Maths), B.Ed.",
    exp: "20 Years",
  },
];

export default function Faculty() {
  return (
    <div className="pt-[80px] md:pt-[90px] pb-20 w-full min-h-screen">

      {/* Header */}
      <div className="bg-primary text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={exteriorImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-3">
            Faculty & Staff
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg max-w-2xl">
            Dedicated, experienced, and passionate educators who are the backbone of Adarsh School, Jakhouli.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-secondary rounded-full mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Meet Our Educators</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our teachers are highly qualified, deeply experienced, and passionately committed to rural education in Haryana. They serve not just as instructors but as mentors, guides, and role models for every student at Adarsh School.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyList.map((staff, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl shadow-md border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className="h-24 bg-primary/10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-primary font-serif mb-1">{staff.name}</h4>
                <span className="text-sm font-semibold text-secondary block mb-1">{staff.role}</span>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block mb-3">{staff.subject}</span>
                <div className="flex justify-center gap-4 text-xs text-muted-foreground border-t border-border pt-3 mt-1">
                  <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {staff.qual}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-secondary font-semibold mt-2">
                  <Award className="w-3.5 h-3.5" /> {staff.exp} Experience
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why our teachers are special */}
        <div className="mt-20 bg-muted/30 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Why Our Teachers Make the Difference</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Every teacher at Adarsh School, Jakhouli undergoes regular professional training workshops organized by BSEH and DSE Haryana. We believe that a great teacher is a lifelong learner. Our staff takes pride in their deep roots in the Kaithal community and their commitment to student success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'BSEH Certified', desc: 'All teachers are certified by Board of School Education Haryana.' },
              { label: 'Regular Training', desc: 'Ongoing professional development and annual pedagogy workshops.' },
              { label: 'Community Bond', desc: 'Teachers deeply connected to the Jakhouli community and student families.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <div className="text-lg font-bold text-primary mb-2 font-serif">{item.label}</div>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
