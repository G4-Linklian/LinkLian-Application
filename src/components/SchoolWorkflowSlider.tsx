'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'หน้าแรกระบบ',
    description: 'แดชบอร์ดหลักของ LinkLian แสดงข้อมูลสรุปอย่างชัดเจน',
    icon: '🏠'
  },
  {
    id: 2,
    title: 'จัดการนักเรียน',
    description: 'ระบบจัดการข้อมูลนักเรียนแบบครบวงจร',
    icon: '👥'
  },
  {
    id: 3,
    title: 'ตารางเรียน',
    description: 'จัดการตารางเรียนและห้องเรียนได้ง่าย',
    icon: '📅'
  },
  {
    id: 4,
    title: 'การบ้านและคะแนน',
    description: 'ติดตามการบ้านและให้คะแนนแบบเรียลไทม์',
    icon: '📝'
  },
  {
    id: 5,
    title: 'สื่อสารกับผู้ปกครอง',
    description: 'ส่งข้อความแจ้งข้อมูลความก้าวหน้าให้ผู้ปกครอง',
    icon: '💬'
  },
  {
    id: 6,
    title: 'รายงานผลการเรียน',
    description: 'ดูรายงานผลการเรียนแบบรายตัวและรายชั้น',
    icon: '📊'
  },
  {
    id: 7,
    title: 'ระบบเงิน',
    description: 'จัดการค่าเรียน ค่าธรรมเนียม และการชำระเงิน',
    icon: '💳'
  },
  {
    id: 8,
    title: 'วิเคราะห์ข้อมูล',
    description: 'Dashboard ข้อมูลแบบเรียลไทม์และการวิเคราะห์',
    icon: '📈'
  }
];

export default function SchoolWorkflowSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="heading-lg text-foreground mb-4">
            ระบบการทำงานของโรงเรียน
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ดูตัวอย่างการใช้งาน LinkLian ในระบบสถาบันการศึกษา
          </p>
        </div>

        {/* Modern MacBook Mockup */}
        <div className="relative mx-auto max-w-5xl">
          {/* Laptop Frame */}
          <div className="relative">
            {/* Screen bezel */}
            <div className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-2xl p-3 pb-0">
              {/* Camera notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-600 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
              </div>
              
              {/* Screen */}
              <div className="relative bg-gradient-to-br from-secondary to-accent rounded-t-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6"
                    >
                      <span className="text-5xl">{slides[currentSlide].icon}</span>
                    </motion.div>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-2xl md:text-3xl font-bold text-foreground mb-3"
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-lg text-muted-foreground max-w-md"
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Laptop base/keyboard area */}
            <div className="h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl shadow-lg">
              <div className="h-full flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-500 rounded-full" />
              </div>
            </div>
            
            {/* Stand shadow */}
            <div className="mx-auto w-3/4 h-2 bg-gray-300/50 rounded-full blur-sm" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 p-3 rounded-full bg-card shadow-lg text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 p-3 rounded-full bg-card shadow-lg text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide indicators - Modern pill style */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(index);
                }}
                className={`relative transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-12 h-3 bg-primary rounded-full'
                    : 'w-3 h-3 bg-muted hover:bg-muted-foreground/30 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
          
          <p className="text-sm font-medium text-muted-foreground">
            {currentSlide + 1} / {slides.length} • {slides[currentSlide].title}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
