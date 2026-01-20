'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IconDeviceMobile, 
  IconStar, 
  IconUsers, 
  IconChartBar, 
  IconMessage, 
  IconUser, 
  IconHome, 
  IconBook, 
  IconSchool, 
  IconCreditCard,
  IconChartLine,
  IconDeviceTablet
} from '@tabler/icons-react';

export default function MobileDisplaySection() {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid items-center gap-16 md:grid-cols-2"
      >
        {/* Left Content */}
        <div className="space-y-6">
          <div>
            <h2 className="heading-lg text-foreground mb-4">
              แอปพลิเคชันที่ออกแบบ
              <br />
              <span className="text-primary-orange">สำหรับทุกคนในสถาบัน</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              ใช้งานได้จากหลากหลายอุปกรณ์ สำหรับนักเรียน ครู อาจารย์ และบุคลากรสถาบันของสถานศึกษา
            </p>
          </div>

          <Link
            to="/institution-register"
            className="btn-hero inline-flex"
          >
            <IconDeviceMobile size={20} />
            ดาวน์โหลดแอปพลิเคชัน
          </Link>
        </div>

        {/* Right Content - Dual Phone Mockup like reference image */}
        <div className="relative h-[580px] sm:h-[680px] flex items-center justify-center">
          {/* White Background */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-white"></div>
          
          {/* Back Phone (Left) - positioned behind and to the left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-[5%] top-[8%] z-10 sm:left-[10%]"
          >
            <img 
              src="/mobile/phone-right.png" 
              alt="LinkLian App - ห้องเรียนของคุณ" 
              className="h-[380px] w-auto sm:h-[460px] drop-shadow-2xl"
            />
          </motion.div>

          {/* Front Phone (Right) - positioned in front and to the right, overlapping */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-[5%] top-[18%] z-20 sm:right-[10%]"
          >
            <img 
              src="/mobile/phone-left.png" 
              alt="LinkLian App - คณิตศาสตร์พื้นฐาน" 
              className="h-[380px] w-auto sm:h-[460px] drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating Cards - Positioned to not block phones */}
          {/* Top left of left phone - 200k+ card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute left-0 top-0 z-30 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 px-4 py-3 shadow-xl animate-float sm:left-0"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconSchool size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">จัดการคลาส</div>
                <div className="text-xs opacity-90">ง่ายสะดวก</div>
              </div>
            </div>
          </motion.div>

          {/* Top right - Purple card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute right-0 top-[8%] z-30 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 px-4 py-3 shadow-xl animate-float sm:right-0"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconUsers size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">หลากหลาย</div>
                <div className="text-xs opacity-90">บทบาทผู้ใช้</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom left - Pink star rating card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -left-4 bottom-[12%] z-30 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 px-4 py-3 shadow-xl animate-float sm:-left-6"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconMessage size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">แจ้งเตือน</div>
                <div className="text-xs opacity-90">ข้อความ & ข่าวสาร</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom right - Blue efficiency card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute right-0 bottom-[8%] z-30 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 px-4 py-3 shadow-xl animate-float-slow sm:right-0"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconBook size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">สะดวก</div>
                <div className="text-xs opacity-90">ใช้งานง่าย</div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Gradient Blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-30">
            <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-gradient-to-br from-orange-300 via-pink-300 to-red-300 blur-3xl"></div>
            <div className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-yellow-300 via-orange-300 to-pink-300 blur-3xl"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
