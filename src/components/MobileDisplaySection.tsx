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
          
          {/* Back Phone (Left) - positioned behind and to the left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-[5%] top-[8%] z-10 sm:left-[10%]"
          >
            <div className="relative h-[380px] w-[180px] sm:h-[460px] sm:w-[220px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[2.8rem] border-[12px] border-gray-900 bg-white shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-50 h-7 w-28 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>
                
                {/* Screen Content */}
                <div className="flex h-full flex-col p-4">
                  {/* Header - Logo placeholder */}
                  <div className="mb-3 flex items-center gap-2 mt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                      <IconUser size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">Hi Sugiwa</div>
                      <div className="text-[10px] text-gray-500">Good morning</div>
                    </div>
                  </div>

                  {/* App Icons Grid */}
                  <div className="mb-3 grid grid-cols-4 gap-2">
                    <div className="aspect-square rounded-xl bg-blue-500"></div>
                    <div className="aspect-square rounded-xl bg-primary"></div>
                    <div className="aspect-square rounded-xl bg-amber-500"></div>
                    <div className="aspect-square rounded-xl bg-red-500"></div>
                  </div>

                  {/* Blue Card */}
                  <div className="mb-2 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 p-3 text-white">
                    <div className="mb-1 flex items-center gap-2">
                      <IconBook size={16} />
                      <div className="text-[10px] font-semibold">Today's Classes</div>
                    </div>
                    <div className="text-[10px] opacity-90">4 subjects remaining</div>
                  </div>

                  {/* Stats Card */}
                  <div className="mb-2 rounded-xl bg-blue-50 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-gray-700">Progress</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-600">
                        3.7
                        <IconStar size={10} className="text-amber-500 fill-amber-500" />
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-3/4 rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-auto grid grid-cols-4 gap-2 pt-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                        <IconHome size={14} className="text-white" />
                      </div>
                      <div className="h-0.5 w-4 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
                        <IconChartBar size={14} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
                        <IconMessage size={14} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
                        <IconUser size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Front Phone (Right) - positioned in front and to the right, overlapping */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-[5%] top-[18%] z-20 sm:right-[10%]"
          >
            <div className="relative h-[380px] w-[180px] sm:h-[460px] sm:w-[220px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[2.8rem] border-[12px] border-gray-900 bg-white shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-50 h-7 w-28 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>
                
                {/* Screen Content */}
                <div className="flex h-full flex-col p-4">
                  {/* Header */}
                  <div className="mb-2 flex items-center gap-2 mt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                      <IconUser size={18} className="text-foreground" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">Naghma Sahu</div>
                      <div className="text-[10px] text-gray-500">Director Management</div>
                    </div>
                  </div>

                  {/* Payment Card */}
                  <div className="mb-2 rounded-xl bg-gradient-to-br from-primary to-red-500 p-3 text-white shadow-lg">
                    <div className="mb-0.5 flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/30">
                        <IconCreditCard size={12} />
                      </div>
                      <span className="text-[10px] font-semibold">Payment</span>
                    </div>
                    <div className="mb-0.5 text-2xl font-bold">15+</div>
                    <div className="text-[10px] opacity-90">Channel payment method</div>
                  </div>

                  {/* Feature Icons */}
                  <div className="mb-2 grid grid-cols-2 gap-1.5">
                    <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 p-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100">
                        <IconSchool size={12} className="text-blue-600" />
                      </div>
                      <span className="text-[8px] font-semibold text-gray-700">Student Number</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 p-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent">
                        <IconDeviceTablet size={12} className="text-foreground" />
                      </div>
                      <span className="text-[8px] font-semibold text-gray-700">Phone Number</span>
                    </div>
                  </div>

                  {/* University Section */}
                  <div className="mb-2 rounded-xl bg-blue-600 p-3 text-white">
                    <div className="mb-1 flex items-center gap-2">
                      <IconSchool size={14} />
                      <span className="text-[10px] font-semibold">University</span>
                    </div>
                    <div className="text-[9px] opacity-90">University Institute of Knowledge</div>
                  </div>

                  {/* Bottom Indicators */}
                  <div className="mt-auto flex items-center justify-center gap-2 pt-2">
                    <div className="h-1 w-6 rounded-full bg-primary"></div>
                    <div className="h-1 w-1.5 rounded-full bg-gray-300"></div>
                    <div className="h-1 w-1.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Cards - Positioned outside phones to not block */}
          {/* Top right - Purple card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
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

          {/* Left side - Blue chart card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -left-4 top-[35%] z-30 rounded-2xl bg-[#FFF5E6] px-4 py-3 shadow-xl animate-float-slow sm:-left-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <IconChartBar size={20} className="text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">200k+</div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-pink-400"></span>
                  <span className="text-xs text-gray-600">8 Launches</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom left - Star rating card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -left-4 bottom-[15%] z-30 rounded-2xl bg-[#FFF5E6] px-4 py-3 shadow-xl animate-float sm:-left-6"
          >
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-base font-bold text-gray-900">
                <IconStar size={16} className="fill-amber-400 text-amber-400" /> 4.9
              </div>
              <div className="text-sm font-semibold text-gray-700">189</div>
              <div className="text-xs text-gray-500">Good Responses</div>
            </div>
          </motion.div>

          {/* Bottom right - Efficiency card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute right-0 bottom-[8%] z-30 rounded-2xl bg-[#FFF5E6] px-4 py-3 shadow-xl animate-float-slow sm:right-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-400">
                <IconChartLine size={20} className="text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">92.5%</div>
                <div className="text-xs text-gray-600">Work more efficient</div>
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
