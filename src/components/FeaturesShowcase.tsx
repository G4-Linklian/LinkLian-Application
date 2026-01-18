'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: '📍',
    title: 'Presence',
    description: 'ระบบบันทึกสถานที่เรียน เช็คชื่อแบบดิจิทัล ติดตามการเข้าเรียน',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    icon: '✍️',
    title: 'Assignment',
    description: 'ส่งการบ้านออนไลน์ ให้ครูปรับแต่งเวลาส่ง และแสดงข้อเสนอแนะ',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    icon: '💳',
    title: 'Bill Payment',
    description: 'ชำระเงินค่าเรียน ค่าธรรมเนียมต่างๆ ผ่านแอปแบบออนไลน์',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    icon: '📚',
    title: 'KRS/KRSS',
    description: 'ลงทะเบียนเรียน ดูตารางเรียน และจัดการวิชาต่างๆ',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 5,
    icon: '🧪',
    title: 'Final Exam',
    description: 'สอบปลายภาค ดูผลการสอบ และวิเคราะห์ความแข็งแกร่ง',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 6,
    icon: '📅',
    title: 'Events',
    description: 'ดูกิจกรรม ประกาศข่าวสาร และรับการแจ้งเตือนต่างๆ',
    color: 'from-teal-500 to-cyan-500'
  },
];

export default function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const activeData = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="features" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-cta p-8 md:p-12 lg:p-16"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="heading-lg text-primary-foreground mb-4">
              ฟีเจอร์ที่มี
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              ทั้งหมด 6 ฟีเจอร์หลักที่ได้รับการออกแบบมาให้ใช้งานได้สะดวก
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Feature Tabs - Left side */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'bg-white shadow-lg scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    activeFeature === feature.id
                      ? `bg-gradient-to-br ${feature.color}`
                      : 'bg-white/20'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${
                      activeFeature === feature.id ? 'text-foreground' : 'text-primary-foreground'
                    }`}>
                      {feature.title}
                    </h3>
                    {activeFeature === feature.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm text-muted-foreground mt-1"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    activeFeature === feature.id ? 'bg-primary scale-150' : 'bg-white/30'
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Feature Preview - Right side */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-white rounded-3xl p-8 shadow-2xl"
                >
                  {/* Phone mockup style preview */}
                  <div className="relative mx-auto w-48 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-xl">
                    <div className="relative h-full bg-white rounded-[2rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-gray-100 to-transparent flex items-center justify-center">
                        <div className="w-16 h-1 bg-gray-300 rounded-full" />
                      </div>
                      
                      {/* Content */}
                      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeData.color} flex items-center justify-center mb-4`}
                        >
                          <span className="text-3xl">{activeData.icon}</span>
                        </motion.div>
                        <h4 className="font-bold text-lg text-foreground mb-2">{activeData.title}</h4>
                        <p className="text-xs text-muted-foreground">{activeData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full blur-xl" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
