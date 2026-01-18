'use client';

import { motion } from 'framer-motion';
import { 
  IconClipboardList, 
  IconBook, 
  IconCalendarEvent, 
  IconUserCircle, 
  IconReportAnalytics, 
  IconShieldLock,
  IconSchool
} from '@tabler/icons-react';
import SectionBadge from './ui/SectionBadge';

interface RegisterFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const registerFeatures: RegisterFeature[] = [
  {
    icon: <IconClipboardList size={32} />,
    title: 'ลงทะเบียนนักเรียนใหม่',
    description: 'ระบบรับสมัครนักเรียนใหม่ออนไลน์ ลดการกรอกเอกสารซ้ำซ้อน',
    highlight: 'ลด 80% เวลาลงทะเบียน'
  },
  {
    icon: <IconBook size={32} />,
    title: 'จัดการรายวิชา',
    description: 'เพิ่ม ลบ แก้ไขรายวิชา กำหนดหน่วยกิต และเงื่อนไขการลงทะเบียน',
    highlight: 'ยืดหยุ่น 100%'
  },
  {
    icon: <IconCalendarEvent size={32} />,
    title: 'ตารางเรียน/ตารางสอน',
    description: 'สร้างตารางเรียนอัตโนมัติ จัดสรรห้องเรียนและครูผู้สอน',
    highlight: 'Auto Scheduling'
  },
  {
    icon: <IconUserCircle size={32} />,
    title: 'จัดการข้อมูลนักเรียน',
    description: 'เก็บข้อมูลประวัติ ผลการเรียน และข้อมูลติดต่อผู้ปกครอง',
    highlight: 'ครบทุกข้อมูล'
  },
  {
    icon: <IconReportAnalytics size={32} />,
    title: 'รายงานและสถิติ',
    description: 'ดูสถิติการลงทะเบียน จำนวนนักเรียน และรายงานต่างๆ',
    highlight: 'Real-time Report'
  },
  {
    icon: <IconShieldLock size={32} />,
    title: 'ระบบความปลอดภัย',
    description: 'การเข้าถึงตามสิทธิ์ บันทึก Log และการสำรองข้อมูล',
    highlight: '99.9% Secure'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export default function FeaturesRegisterSection() {
  return (
    <section className="section-padding overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="text-center relative">
          <SectionBadge icon={IconSchool} text="ระบบทะเบียน" className="mb-6" />
          
          <h2 className="heading-lg text-foreground mb-4">
            ฟีเจอร์ระบบทะเบียน
            <br />
            <span className="text-primary-orange">ที่ครบครันและทันสมัย</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            จัดการงานทะเบียนทั้งหมดได้ในที่เดียว ตั้งแต่รับสมัครจนถึงจบการศึกษา
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {registerFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`group relative ${index % 2 === 1 ? 'lg:translate-y-8' : ''}`}
            >
              <div className="relative h-full overflow-hidden rounded-3xl bg-card border border-border/50 p-6 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="relative mb-5">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFCF9A] to-[#FFE3BB] flex items-center justify-center text-foreground shadow-lg"
                    >
                      {feature.icon}
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-orange transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                    {feature.highlight}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCF9A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
