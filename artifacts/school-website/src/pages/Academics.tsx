import React from 'react';
import { motion } from 'framer-motion';
import { Book, Microscope, Calculator, Globe, Code, Palette, CheckCircle2, TrendingUp } from 'lucide-react';
import scienceLabImg from '@assets/generated_images/science_lab.jpg';
import libraryImg from '@assets/generated_images/library.jpg';
import computerLabImg from '@assets/generated_images/computer_lab.jpg';
import exteriorImg from '@assets/generated_images/exterior.jpg';
import heroCampusImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';
import classroomImg from '@assets/generated_images/classroom.jpg';
import studentsStudyingImg from '@assets/generated_images/students_studying.jpg';
import sportsDayImg from '@assets/generated_images/sports_day.jpg';

export default function Academics() {
  return (
    <div className="pt-[80px] md:pt-[90px] pb-20 w-full min-h-screen">

      {/* Header */}
      <div className="bg-primary text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCampusImg} alt="" className="w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-primary/35" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Academics
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg max-w-2xl">
            BSEH-affiliated curriculum from Class VI to XII — Science, Commerce, and Arts streams.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-secondary rounded-full mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">

        {/* ── Curriculum Overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-serif font-bold text-primary mb-5">Curriculum Overview</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-base">
              <p>
                Adarsh Senior Secondary School is affiliated to the <strong>Board of School Education Haryana (BSEH)</strong>. We offer a comprehensive and rigorous academic program from <strong>Classes VI to XII</strong>, designed to prepare students for higher education and competitive examinations like JEE, NEET, CA Foundation, and UPSC.
              </p>
              <p>
                Our teaching methodology blends traditional chalkboard instruction with modern digital aids, ensuring concepts are understood deeply rather than rote-learned. Every student at Adarsh School is treated as an individual — their strengths nurtured, their weaknesses addressed with patience and care.
              </p>
              <p>
                Special coaching classes for Board Examinations are conducted from October onwards to ensure every student enters the hall fully prepared and confident.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Classes Offered', val: 'VI to XII' },
                { label: 'Streams Available', val: 'Science, Commerce, Arts' },
                { label: 'Board Affiliation', val: 'BSEH Haryana' },
                { label: 'Medium of Instruction', val: 'Hindi & English' },
              ].map((item, i) => (
                <div key={i} className="bg-muted/40 rounded-lg p-4 border border-border">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm font-bold text-primary">{item.val}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={studentsStudyingImg} alt="Students Studying" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
          </motion.div>
        </div>

        {/* ── Result Performance ── */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-3">Board Examination Results</h2>
            <p className="text-primary-foreground/75 max-w-xl mx-auto">Adarsh School consistently ranks among the top institutions in Kaithal district for BSEH Board results.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Class X Pass Rate (2024)', val: '100%' },
              { label: 'Class XII Pass Rate (2024)', val: '98%' },
              { label: 'Distinction Holders', val: '45+' },
              { label: 'District Toppers Produced', val: '12+' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <TrendingUp className="w-7 h-7 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold font-serif mb-1">{s.val}</div>
                <div className="text-primary-foreground/70 text-xs uppercase tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Middle & Secondary ── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-4 mb-8 border-b-2 border-border pb-4">
            <h3 className="text-2xl font-serif font-bold text-primary">Middle & Secondary Classes (VI – X)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mathematics", icon: Calculator, desc: "Building strong analytical and problem-solving foundations from basic arithmetic to algebra, geometry, and statistics." },
              { title: "Science", icon: Microscope, desc: "Physics, Chemistry, and Biology taught with hands-on experiments in our fully equipped laboratories." },
              { title: "Social Science", icon: Globe, desc: "History, Geography, Political Science, and Economics — connecting the past with present-day Haryana and India." },
              { title: "Languages", icon: Book, desc: "English, Hindi, and Sanskrit focusing on grammar, literature, and communication for confident expression." },
              { title: "Computer Science", icon: Code, desc: "Basic programming, IT skills, digital literacy, and internet safety for the modern world." },
              { title: "Co-Scholastic", icon: Palette, desc: "Art & Craft, Physical Education, and Moral Science — developing the whole student beyond academics." },
            ].map((subject, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-border p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                    <subject.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-primary">{subject.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{subject.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Senior Secondary Streams ── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-4 mb-8 border-b-2 border-border pb-4">
            <h3 className="text-2xl font-serif font-bold text-primary">Senior Secondary Streams (Classes XI – XII)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Science */}
            <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-blue-900 mb-2 font-serif">Science Stream</h4>
              <p className="text-blue-700/70 text-sm mb-5">Non-Medical (PCM) &amp; Medical (PCB)</p>
              <ul className="space-y-2.5 mb-5">
                {['Physics (Core)', 'Chemistry (Core)', 'Mathematics / Biology', 'English Core', 'Optional: Computer Sci / Physical Ed.'].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${i === 4 ? 'text-blue-300' : 'text-blue-500'}`} />
                    <span className={i === 4 ? 'text-blue-400 text-xs' : ''}>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-blue-600/70 border-t border-blue-100 pt-4">Ideal for JEE / NEET preparation. Regular doubt sessions conducted.</p>
            </div>

            {/* Commerce */}
            <div className="bg-gradient-to-b from-orange-50 to-white border border-orange-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-orange-900 mb-2 font-serif">Commerce Stream</h4>
              <p className="text-orange-700/70 text-sm mb-5">Business &amp; Finance track</p>
              <ul className="space-y-2.5 mb-5">
                {['Accountancy', 'Business Studies', 'Economics', 'English Core', 'Optional: Mathematics / Physical Ed.'].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${i === 4 ? 'text-orange-300' : 'text-orange-500'}`} />
                    <span className={i === 4 ? 'text-orange-400 text-xs' : ''}>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-orange-600/70 border-t border-orange-100 pt-4">Ideal for CA Foundation, MBA, and banking careers.</p>
            </div>

            {/* Arts */}
            <div className="bg-gradient-to-b from-green-50 to-white border border-green-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-green-900 mb-2 font-serif">Arts / Humanities</h4>
              <p className="text-green-700/70 text-sm mb-5">Social Sciences &amp; Languages</p>
              <ul className="space-y-2.5 mb-5">
                {['History / Political Science', 'Geography', 'Hindi (Elective)', 'English Core', 'Optional: Physical Ed. / Economics'].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${i === 4 ? 'text-green-300' : 'text-green-500'}`} />
                    <span className={i === 4 ? 'text-green-400 text-xs' : ''}>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-green-600/70 border-t border-green-100 pt-4">Ideal for UPSC, teaching, law, and journalism careers.</p>
            </div>
          </div>
        </motion.section>

        {/* ── Facilities with Images ── */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-3">Academic Facilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our campus in Jakhouli is equipped with modern facilities that support excellence in every area of learning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: scienceLabImg, title: 'Science Laboratory', desc: 'Physics, Chemistry & Biology labs with modern equipment, chemicals, and safety infrastructure for practical learning.' },
              { img: libraryImg, title: 'School Library', desc: '5,000+ books in Hindi & English across all subjects, along with newspapers, magazines, and reference materials.' },
              { img: computerLabImg, title: 'Computer Centre', desc: '40 desktops with high-speed broadband internet, Microsoft Office, and programming tools for Class IX onwards.' },
              { img: classroomImg, title: 'Smart Classrooms', desc: 'Digital boards, projectors, and ergonomic furniture in all Senior Secondary sections for interactive learning.' },
              { img: sportsDayImg, title: 'Sports Facilities', desc: 'Cricket ground, volleyball court, kabaddi field, and athletics track for physical development and inter-school competitions.' },
              { img: studentsStudyingImg, title: 'Study Rooms', desc: 'Dedicated quiet study rooms for Board students open till 5 PM with supervised preparation and group study sessions.' },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-44 overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2 font-serif">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
