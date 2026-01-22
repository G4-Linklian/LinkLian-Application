'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconRocket, IconArrowRight, IconMail, IconCheck } from '@tabler/icons-react';
import SectionBadge from './ui/SectionBadge';

export default function ButtomSection() {
  return (
    <section id="contact" className="section-padding">
      {/* Top Badge - Outside the card */}
      <div className="text-center mb-8">
        <SectionBadge icon={IconRocket} text="เริ่มต้นใช้งานวันนี้" className="bg-[#FFCF9A]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-[#FFD9A8] p-8 md:p-12 lg:p-16 text-center"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_60%)] opacity-5" />
          </div>
        </div>

        <div className="relative z-10">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="heading-lg text-foreground mb-4"
          >
            เริ่มต้นการเปลี่ยนแปลง
            <br />
            ในสถาบันของคุณ
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-foreground/90 max-w-2xl mx-auto mb-10"
          >
            ลงทะเบียนฟรี และเข้าใช้งาน LinkLian ได้เลยวันนี้ 
            <br className="hidden sm:block" />
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/institution-register"
              className="group flex h-14 w-full items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-foreground transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg sm:w-auto border border-[hsl(25,95%,53%)]"
            >
              ลงทะเบียนสถาบัน
            </Link>
          </motion.div>

          {/* Email Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <p className="text-sm text-foreground/70 mb-2">สอบถามเพิ่มเติม</p>
            <a 
              href="mailto:linklian.edu@gmail.com"
              className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-white transition-colors"
            >
              <IconMail size={20} />
              linklian.edu@gmail.com
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
