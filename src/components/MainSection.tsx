'use client';

import { motion } from 'framer-motion';
import { IconChevronDown, IconStar } from '@tabler/icons-react';

export default function MainSection() {
  const handleScrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative py-12 lg:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/40 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-foreground text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse-soft" />
            แพลตฟอร์มการศึกษาแห่งอนาคต
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="heading-xl text-foreground mb-6"
        >
          ยกระดับการศึกษาของสถาบันคุณ
          <br />
          <span className="text-primary-orange">ด้วยแพลตฟอร์มเรียนการสอนอัจฉริยะ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
        >
          LinkLian เป็นแพลตฟอร์มเรียนการสอนทั้งหมดในตัว สำหรับโรงเรียน วิทยาลัย และมหาวิทยาลัย 
          จัดการชั้นเรียน ส่งการบ้าน และติดตามความก้าวหน้าของนักเรียนได้อย่างง่ายดาย
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#features"
            onClick={handleScrollToFeatures}
            className="btn-hero w-full sm:w-auto"
          >
            ดูฟีเจอร์ทั้งหมด
            <IconChevronDown size={20} stroke={2} />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-foreground">500+</span>
            <span className="text-sm">สถาบันใช้งาน</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-foreground">50K+</span>
            <span className="text-sm">ผู้ใช้งาน</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary-orange">4.8</span>
            <IconStar size={18} className="text-primary-orange fill-primary-orange" />
            <span className="text-sm">คะแนนรีวิว</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
