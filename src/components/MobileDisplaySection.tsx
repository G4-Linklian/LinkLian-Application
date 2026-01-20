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
        className="grid items-center gap-12 md:grid-cols-2"
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
              ใช้งานจาก tablet หรือมือถือได้เต็มที่ สำหรับนักเรียน ครู ผู้ปกครอง และบุคลากรสถาบัน
            </p>
          </div>

          <Link
            to="/institution-register"
            className="btn-hero inline-flex"
          >
            <IconDeviceMobile size={20} />
            ดาวน์โหลดแอป
          </Link>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <IconStar size={24} className="text-primary-orange fill-primary-orange" />
                <span className="text-3xl font-bold text-foreground">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground">คะแนน</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">
                500+
              </div>
              <p className="text-sm text-muted-foreground">สถาบันใช้งาน</p>
            </div>
          </div>
        </div>

        {/* Right Content - Dual Phone Mockup like reference image */}
        <div className="relative h-[580px] sm:h-[680px] flex items-center justify-center">
          {/* Warm Gradient Background */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 opacity-40"></div>
          
          {/* Back Phone (Left) - รูปสีขาว ll2 อยู่ด้านหลัง */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-[5%] top-[8%] z-10 sm:left-[10%]"
          >
            <div className="h-[380px] w-[185px] sm:h-[460px] sm:w-[225px] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img 
                src="/mobile/phone-right.png" 
                alt="LinkLian App - คณิตศาสตร์พื้นฐาน" 
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Front Phone (Right) - รูปสีส้ม ll1 อยู่ด้านหน้า */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-[5%] top-[18%] z-20 sm:right-[10%]"
          >
            <div className="h-[380px] w-[185px] sm:h-[460px] sm:w-[225px] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img 
                src="/mobile/phone-left.png" 
                alt="LinkLian App - ห้องเรียนของคุณ" 
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Floating Cards - Positioned to not block phones */}
          {/* Top left of left phone - 200k+ card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute left-0 top-0 z-30 rounded-2xl bg-gradient-to-br from-emerald-300 to-green-400 px-4 py-3 shadow-xl animate-float sm:left-0"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconChartBar size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">200k+</div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-white/60"></span>
                  <span className="text-xs opacity-90">8 Launches</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top right - Purple card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute right-0 -top-2 z-30 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 px-4 py-3 shadow-xl animate-float sm:right-0"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconUsers size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">50+</div>
                <div className="text-xs opacity-90">Monthly Partner</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom left - Pink star rating card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -left-4 bottom-[12%] z-30 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-400 px-4 py-3 shadow-xl animate-float sm:-left-6"
          >
            <div className="text-center text-white">
              <div className="mb-1 flex items-center justify-center gap-1 text-base font-bold">
                <IconStar size={16} className="fill-white text-white" /> 4.9
              </div>
              <div className="text-sm font-semibold">189</div>
              <div className="text-xs opacity-90">Good Responses</div>
            </div>
          </motion.div>

          {/* Bottom right - Blue efficiency card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute right-0 bottom-[8%] z-30 rounded-2xl bg-gradient-to-br from-sky-300 to-blue-400 px-4 py-3 shadow-xl animate-float-slow sm:right-0"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <IconChartLine size={20} />
              </div>
              <div>
                <div className="text-lg font-bold">92.5%</div>
                <div className="text-xs opacity-90">Work more efficient</div>
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
