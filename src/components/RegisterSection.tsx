'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconHome, 
  IconUsers, 
  IconCalendar, 
  IconClipboard, 
  IconMessage, 
  IconChartBar, 
  IconCreditCard, 
  IconTrendingUp,
  IconChevronLeft,
  IconChevronRight,
  IconClipboardList,
  IconBook,
  IconCalendarEvent,
  IconUserCircle,
  IconReportAnalytics,
  IconShieldLock
} from '@tabler/icons-react';
import SectionBadge from './ui/SectionBadge';

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface RegisterFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const slides: Slide[] = [
  { id: 1, title: 'ลงทะเบียนนักเรียนใหม่', description: 'ระบบรับสมัครนักเรียนใหม่ออนไลน์', icon: <IconClipboardList size={48} /> },
  { id: 2, title: 'จัดการรายวิชา', description: 'เพิ่ม ลบ แก้ไขรายวิชา กำหนดหน่วยกิต', icon: <IconBook size={48} /> },
  { id: 3, title: 'ตารางเรียน/ตารางสอน', description: 'สร้างตารางเรียนอัตโนมัติ', icon: <IconCalendarEvent size={48} /> },
  { id: 4, title: 'จัดการข้อมูลนักเรียน', description: 'เก็บข้อมูลประวัติ ผลการเรียน', icon: <IconUserCircle size={48} /> },
  { id: 5, title: 'รายงานและสถิติ', description: 'ดูสถิติการลงทะเบียน จำนวนนักเรียน', icon: <IconReportAnalytics size={48} /> },
  { id: 6, title: 'ระบบความปลอดภัย', description: 'การเข้าถึงตามสิทธิ์ บันทึก Log', icon: <IconShieldLock size={48} /> },
];

const registerFeatures: RegisterFeature[] = [
  {
    icon: <IconClipboardList size={28} />,
    title: 'ลงทะเบียนนักเรียนใหม่',
    description: 'ระบบรับสมัครนักเรียนใหม่ออนไลน์ ลดการกรอกเอกสารซ้ำซ้อน',
    highlight: 'ลด 80% เวลา'
  },
  {
    icon: <IconBook size={28} />,
    title: 'จัดการรายวิชา',
    description: 'เพิ่ม ลบ แก้ไขรายวิชา กำหนดหน่วยกิต และเงื่อนไขการลงทะเบียน',
    highlight: 'ยืดหยุ่น 100%'
  },
  {
    icon: <IconCalendarEvent size={28} />,
    title: 'ตารางเรียน/ตารางสอน',
    description: 'สร้างตารางเรียนอัตโนมัติ จัดสรรห้องเรียนและครูผู้สอน',
    highlight: 'Auto Scheduling'
  },
  {
    icon: <IconUserCircle size={28} />,
    title: 'จัดการข้อมูลนักเรียน',
    description: 'เก็บข้อมูลประวัติ ผลการเรียน และข้อมูลติดต่อผู้ปกครอง',
    highlight: 'ครบทุกข้อมูล'
  },
  {
    icon: <IconReportAnalytics size={28} />,
    title: 'รายงานและสถิติ',
    description: 'ดูสถิติการลงทะเบียน จำนวนนักเรียน และรายงานต่างๆ',
    highlight: 'Real-time Report'
  },
  {
    icon: <IconShieldLock size={28} />,
    title: 'ระบบความปลอดภัย',
    description: 'การเข้าถึงตามสิทธิ์ บันทึก Log และการสำรองข้อมูล',
    highlight: '99.9% Secure'
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export default function RegisterSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);
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
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <SectionBadge icon={IconClipboardList} text="ระบบทะเบียน" className="mb-6" />
          <h2 className="heading-lg text-foreground mb-4">
            ระบบการทำงานของโรงเรียน
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ดูตัวอย่างการใช้งาน LinkLian ในระบบสถาบันการศึกษา
          </p>
        </div>

        {/* Main Content - Laptop Left, Features Right */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Smaller Laptop */}
          <div className="relative">
            {/* Laptop Frame - Smaller */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Screen bezel */}
              <div className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-xl p-2 pb-0">
                {/* Camera notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-600 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-gray-800" />
                </div>
                
                {/* Screen with real screenshot */}
                <div className="relative rounded-t-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <img 
                    src="/mobile/notebook-screen.png" 
                    alt="LinkLian Dashboard" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              
              {/* Laptop base/keyboard area */}
              <div className="h-3 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg shadow-lg">
                <div className="h-full flex items-center justify-center">
                  <div className="w-12 h-0.5 bg-gray-500 rounded-full" />
                </div>
              </div>
              
              {/* Stand shadow */}
              <div className="mx-auto w-3/4 h-1.5 bg-gray-300/50 rounded-full blur-sm" />
            </div>
          </div>

          {/* Right Side - Feature Cards with Navigation */}
          <div className="space-y-6">
            {/* Feature Card Display */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20" />
                    
                    <div className="relative z-10">
                      <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFCF9A] to-[#FFE3BB] flex items-center justify-center text-foreground shadow-lg mb-6"
                      >
                        {registerFeatures[currentSlide].icon}
                      </motion.div>

                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {registerFeatures[currentSlide].title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {registerFeatures[currentSlide].description}
                      </p>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                        {registerFeatures[currentSlide].highlight}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCF9A] to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-card shadow-lg text-muted-foreground hover:text-[#F97316] hover:scale-110 transition-all duration-300 border border-border/50"
                aria-label="Previous slide"
              >
                <IconChevronLeft size={24} />
              </button>

              {/* Slide indicators */}
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
                        ? 'w-10 h-3 bg-[#FFCF9A] rounded-full'
                        : 'w-3 h-3 bg-muted hover:bg-muted-foreground/30 rounded-full'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentSlide && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-[#FFCF9A] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-card shadow-lg text-muted-foreground hover:text-[#F97316] hover:scale-110 transition-all duration-300 border border-border/50"
                aria-label="Next slide"
              >
                <IconChevronRight size={24} />
              </button>
            </div>
            
            <p className="text-sm font-medium text-muted-foreground text-center">
              {currentSlide + 1} / {slides.length} • {slides[currentSlide].title}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
