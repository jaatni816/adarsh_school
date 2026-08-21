import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import exteriorImg from '@assets/generated_images/exterior.jpg';
import heroCampusImg from '@assets/Gemini_Generated_Image_cg9zk5cg9zk5cg9z_1784783539748.png';
import prayerAssemblyImg from '@assets/generated_images/prayer_assembly.jpg';
import classroomImg from '@assets/generated_images/classroom.jpg';
import sportsDayImg from '@assets/generated_images/sports_day.jpg';
import annualFunctionImg from '@assets/generated_images/annual_function.jpg';
import studentsStudyingImg from '@assets/generated_images/students_studying.jpg';
import schoolBuilding2Img from '@assets/generated_images/school_building2.jpg';
import achievementsImg from '@assets/generated_images/achievements.jpg';
import nationalAwardImg from '@assets/generated_images/national_award.jpg';
import admissionBannerImg from '@assets/generated_images/admission_banner.jpg';

const images = [
  { src: exteriorImg, title: 'School Main Building', category: 'Campus' },
  { src: schoolBuilding2Img, title: 'School Front View', category: 'Campus' },
  { src: admissionBannerImg, title: 'Adarsh School — Students & Streams', category: 'Campus' },
  { src: prayerAssemblyImg, title: 'Morning Prayer Assembly', category: 'Events' },
  { src: classroomImg, title: 'School Campus', category: 'Campus' },
  { src: studentsStudyingImg, title: 'Students Activity', category: 'Events' },
  { src: sportsDayImg, title: 'NCC & School Events', category: 'Sports' },
  { src: annualFunctionImg, title: 'School Activities', category: 'Events' },
  { src: achievementsImg, title: 'Student Achievements', category: 'Awards' },
  { src: nationalAwardImg, title: 'National & State Awards', category: 'Awards' },
];

const categories = ['All', 'Campus', 'Events', 'Sports', 'Awards'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [selectedIndex, filteredImages.length]);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredImages.length);
  }, [selectedIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') closeImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex, goPrev, goNext]);

  const currentImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

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
            Photo Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg max-w-xl">
            A window into the vibrant life at Adarsh Senior Secondary School, Jakhouli, Kaithal.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-secondary rounded-full mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setSelectedIndex(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                filter === cat
                  ? 'bg-secondary text-white shadow-md scale-105'
                  : 'bg-muted text-foreground/70 hover:bg-muted/80 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Count */}
        <p className="text-center text-muted-foreground text-sm mb-8">
          Showing <strong className="text-primary">{filteredImages.length}</strong> photos
          {filter !== 'All' ? ` in "${filter}"` : ' — click any photo to enlarge & scroll'}
        </p>

        {/* Photo Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35 }}
                key={img.src}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl aspect-[4/3] bg-muted cursor-pointer"
                onClick={() => openImage(index)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1 block">{img.category}</span>
                      <h4 className="text-white font-semibold text-sm">{img.title}</h4>
                    </div>
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <ZoomIn className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No photos in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox with scroll navigation */}
      <AnimatePresence>
        {currentImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeImage}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 p-2 rounded-full z-10"
              onClick={closeImage}
            >
              <X className="w-7 h-7" />
            </button>

            {/* Photo counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full">
              {selectedIndex + 1} / {filteredImages.length}
            </div>

            {/* Prev button */}
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 p-3 rounded-full backdrop-blur-sm transition-all z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage.src}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.2 }}
                src={currentImage.src}
                alt={currentImage.title}
                className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next button */}
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 p-3 rounded-full backdrop-blur-sm transition-all z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Title & keyboard hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-medium text-sm mb-1">{currentImage.title}</p>
              <p className="text-white/40 text-xs hidden md:block">← → keyboard arrows to navigate</p>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-14 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-2 px-4">
              {filteredImages.map((img, i) => (
                <button
                  key={img.src}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
                    i === selectedIndex ? 'border-secondary scale-110' : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
