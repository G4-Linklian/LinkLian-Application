'use client';

import { motion } from 'framer-motion';
import { 
  IconBolt, 
  IconTarget, 
  IconShieldCheck, 
  IconMessageCircle, 
  IconChartPie, 
  IconWorld 
} from '@tabler/icons-react';
import SectionBadge from './ui/SectionBadge';
import { IconSparkles } from '@tabler/icons-react';

const benefits = [
  {
    icon: <IconBolt size={28} />,
    title: 'ประหยัดเวลา',
    description: 'ลดการทำงานด้วยมือมากกว่า 70% ด้วยระบบอัตโนมัติ',
    stat: '70%',
    statLabel: 'ลดเวลางาน'
  },
  {
    icon: <IconTarget size={28} />,
    title: 'เพิ่มประสิทธิภาพ',
    description: 'ทำให้การจัดการเรียนการสอนเป็นระเบียบและมีประสิทธิภาพ',
    stat: '3x',
    statLabel: 'เร็วขึ้น'
  },
  {
    icon: <IconShieldCheck size={28} />,
    title: 'ปลอดภัย',
    description: 'เก็บข้อมูลได้อย่างปลอดภัยและมีการสำรองข้อมูล',
    stat: '99.9%',
    statLabel: 'Uptime'
  },
  {
    icon: <IconMessageCircle size={28} />,
    title: 'สื่อสารดีขึ้น',
    description: 'ครู นักเรียน และผู้ปกครองสามารถสื่อสารได้ง่าย',
    stat: '24/7',
    statLabel: 'การสื่อสาร'
  },
  {
    icon: <IconChartPie size={28} />,
    title: 'วิเคราะห์ข้อมูล',
    description: 'ดูรายงานและข้อมูลแบบเรียลไทม์เพื่อการตัดสินใจ',
    stat: 'Real-time',
    statLabel: 'Analytics'
  },
  {
    icon: <IconWorld size={28} />,
    title: 'ใช้ได้ทุกที่',
    description: 'เข้าถึงได้จากที่ไหนก็ได้ อุปกรณ์ใดก็ได้ตลอด 24/7',
    stat: '∞',
    statLabel: 'Access'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
};

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-card">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="text-center">
          <SectionBadge icon={IconSparkles} text="ประโยชน์ที่ได้รับ" className="mb-6" />
          <h2 className="heading-lg text-foreground mb-4">
            LinkLian ช่วยให้สถาบันของคุณ
            <br />
            <span className="text-primary-orange">ทำงานได้อย่างมีประสิทธิภาพ</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            เปลี่ยนวิธีการจัดการการศึกษาของคุณด้วยเครื่องมือที่ทรงพลัง
          </p>
        </div>

        {/* Benefits Grid - Bento style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon with animation */}
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-foreground shadow-lg"
                  style={{ 
                    backgroundColor: '#FFCF9A',
                    boxShadow: '0 4px 20px -4px hsl(32 100% 80% / 0.5)' 
                  }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary-orange transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {benefit.description}
                </p>

                {/* Stat badge */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <span className="text-2xl font-bold text-primary-orange">{benefit.stat}</span>
                  <span className="text-sm text-muted-foreground">{benefit.statLabel}</span>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
