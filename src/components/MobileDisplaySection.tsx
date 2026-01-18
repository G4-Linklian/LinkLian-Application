'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MobileAppDisplay() {
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
              <span className="text-primary">สำหรับทุกคนในสถาบัน</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              ใช้งานจาก tablet หรือมือถือได้เต็มที่ สำหรับนักเรียน ครู ผู้ปกครอง และบุคลากรสถาบัน
            </p>
          </div>

          <Link
            to="/institution-register"
            className="btn-hero inline-flex"
          >
            <span>📱</span>
            ดาวน์โหลดแอป
          </Link>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-2xl">⭐</span>
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

        {/* Right Content - Dual Phone Mockup */}
        <div className="relative h-[520px] sm:h-[620px]">
          {/* Warm Gradient Background */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 opacity-40"></div>
          
          {/* Back Phone (Left) - Blue themed */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-8 top-12 z-10 sm:left-12 sm:top-16"
          >
            <div className="relative h-[420px] w-[200px] sm:h-[480px] sm:w-[230px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[2.8rem] border-[12px] border-gray-900 bg-white shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-50 h-7 w-32 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>
                
                {/* Screen Content */}
                <div className="flex h-full flex-col p-5">
                  {/* Header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Hi Sugiwa</div>
                      <div className="text-xs text-gray-500">Good morning</div>
                    </div>
                  </div>

                  {/* App Icons Grid */}
                  <div className="mb-4 grid grid-cols-4 gap-3">
                    <div className="aspect-square rounded-2xl bg-blue-500"></div>
                    <div className="aspect-square rounded-2xl bg-primary"></div>
                    <div className="aspect-square rounded-2xl bg-amber-500"></div>
                    <div className="aspect-square rounded-2xl bg-red-500"></div>
                  </div>

                  {/* Blue Card */}
                  <div className="mb-3 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <div className="text-xs font-semibold">Today's Classes</div>
                    </div>
                    <div className="text-xs opacity-90">4 subjects remaining</div>
                  </div>

                  {/* Stats Card */}
                  <div className="mb-3 rounded-2xl bg-blue-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">Progress</span>
                      <span className="text-xs text-gray-600">3.7⭐</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-3/4 rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="mt-auto grid grid-cols-4 gap-4 pt-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
                        <span className="text-white">🏠</span>
                      </div>
                      <div className="h-1 w-6 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200">
                        <span className="text-gray-400">📊</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200">
                        <span className="text-gray-400">💬</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200">
                        <span className="text-gray-400">👤</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Front Phone (Right) - Orange/Payment themed */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-4 top-24 z-20 sm:right-8 sm:top-32"
          >
            <div className="relative h-[420px] w-[200px] sm:h-[480px] sm:w-[230px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 rounded-[2.8rem] border-[12px] border-gray-900 bg-white shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-50 h-7 w-32 -translate-x-1/2 rounded-b-3xl bg-gray-900"></div>
                
                {/* Screen Content */}
                <div className="flex h-full flex-col p-5">
                  {/* Header */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Naghma Sahu</div>
                      <div className="text-xs text-gray-500">Director Management</div>
                    </div>
                  </div>

                  {/* Payment Card */}
                  <div className="mb-3 rounded-2xl bg-gradient-to-br from-primary to-red-500 p-4 text-white shadow-lg">
                    <div className="mb-1 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                        <span className="text-xs">ℹ️</span>
                      </div>
                      <span className="text-xs font-semibold">Payment</span>
                    </div>
                    <div className="mb-1 text-3xl font-bold">15+</div>
                    <div className="text-xs opacity-90">Channel payment method</div>
                  </div>

                  {/* Feature Icons */}
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <span className="text-xs">🎓</span>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-700">Student Number</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                        <span className="text-xs">📱</span>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-700">Phone Number</span>
                    </div>
                  </div>

                  {/* University Section */}
                  <div className="mb-3 rounded-2xl bg-blue-600 p-4 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm">🏛️</span>
                      <span className="text-xs font-semibold">University</span>
                    </div>
                    <div className="text-xs opacity-90">University Institute of Knowledge</div>
                  </div>

                  {/* Study Program */}
                  <div className="mb-3 rounded-2xl bg-purple-50 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📚</span>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">Study Program</div>
                        <div className="text-[10px] text-gray-600">Course of Management</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Indicators */}
                  <div className="mt-auto flex items-center justify-center gap-2 pt-2">
                    <div className="h-1 w-8 rounded-full bg-primary"></div>
                    <div className="h-1 w-2 rounded-full bg-gray-300"></div>
                    <div className="h-1 w-2 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute right-0 top-4 z-30 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 p-4 shadow-xl animate-float sm:right-2"
          >
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <span className="text-lg">👥</span>
              </div>
              <div>
                <div className="text-lg font-bold">50+</div>
                <div className="text-xs opacity-90">Monthly Partner</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute left-0 top-1/3 z-30 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 p-4 shadow-xl animate-float-slow"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">200k+</div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400"></span>
                  <span className="text-xs text-gray-600">8 Launches</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-16 left-4 z-30 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 p-3 shadow-xl animate-float sm:left-8"
          >
            <div className="text-center">
              <div className="mb-1 text-sm font-bold text-gray-900">⭐ 4,9</div>
              <div className="text-xs text-gray-600">189</div>
              <div className="text-[10px] text-gray-500">Good Responses</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute bottom-4 right-4 z-30 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 p-3 shadow-xl animate-float-slow sm:right-8"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-400">
                <span className="text-white">📈</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">92,5%</div>
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
