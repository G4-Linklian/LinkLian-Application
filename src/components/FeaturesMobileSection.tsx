'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconMapPin, 
  IconPencil, 
  IconCreditCard, 
  IconBook, 
  IconFlask, 
  IconCalendarEvent,
  IconHome,
  IconDeviceMobile
} from '@tabler/icons-react';
import SectionBadge from './ui/SectionBadge';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  { id: 1, icon: <IconMapPin size={24} />, title: 'Presence', description: 'ระบบบันทึกสถานที่เรียน เช็คชื่อแบบดิจิทัล ติดตามการเข้าเรียน', color: 'from-blue-500 to-blue-600' },
  { id: 2, icon: <IconPencil size={24} />, title: 'Assignment', description: 'ส่งการบ้านออนไลน์ ให้ครูปรับแต่งเวลาส่ง และแสดงข้อเสนอแนะ', color: 'from-purple-500 to-purple-600' },
  { id: 3, icon: <IconCreditCard size={24} />, title: 'Bill Payment', description: 'ชำระเงินค่าเรียน ค่าธรรมเนียมต่างๆ ผ่านแอปแบบออนไลน์', color: 'from-green-500 to-green-600' },
  { id: 4, icon: <IconBook size={24} />, title: 'KRS/KRSS', description: 'ลงทะเบียนเรียน ดูตารางเรียน และจัดการวิชาต่างๆ', color: 'from-amber-500 to-orange-500' },
  { id: 5, icon: <IconFlask size={24} />, title: 'Final Exam', description: 'สอบปลายภาค ดูผลการสอบ และวิเคราะห์ความแข็งแกร่ง', color: 'from-red-500 to-pink-500' },
  { id: 6, icon: <IconCalendarEvent size={24} />, title: 'Events', description: 'ดูกิจกรรม ประกาศข่าวสาร และรับการแจ้งเตือนต่างๆ', color: 'from-teal-500 to-cyan-500' },
];

export default function FeaturesMobileSection() {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const activeData = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="features" className="section-padding">
      {/* Section Badge outside */}
      <div className="text-center mb-8">
        <SectionBadge icon={IconDeviceMobile} text="ฟีเจอร์แอปพลิเคชัน" className="bg-[#FFCF9A]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-[#FFD9A8] p-8 md:p-12 lg:p-16"
      >
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="heading-lg text-foreground mb-4">
              ฟีเจอร์ที่มี
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
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
                      : 'bg-[#FBBA7A] hover:bg-[#FFC48A]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activeFeature === feature.id
                      ? `bg-gradient-to-br ${feature.color} text-white`
                      : 'bg-white/50 text-foreground'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">
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
                    activeFeature === feature.id ? 'bg-[#F97316] scale-150' : 'bg-white/40'
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Feature Preview - Right side with Phone Mockup */}
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
                  {/* Phone mockup with placeholder */}
                  <div className="relative mx-auto w-48 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-xl">
                    <div className="relative h-full bg-gray-100 rounded-[2rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-gray-200 to-transparent flex items-center justify-center z-10">
                        <div className="w-16 h-1 bg-gray-400 rounded-full" />
                      </div>
                      
                      {/* Mockup content */}
                      <div className="h-full flex flex-col">
                        {/* App header - Logo placeholder */}
                        <div className="bg-[#FFCF9A] p-4 pt-8">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
                              <span className="text-xs font-bold text-foreground">L</span>
                            </div>
                            <div className="flex-1">
                              <div className="h-3 w-20 bg-white/50 rounded" />
                              <div className="h-2 w-14 bg-white/30 rounded mt-1" />
                            </div>
                          </div>
                          <div className="h-16 bg-white/30 rounded-xl" />
                        </div>
                        
                        {/* Content area */}
                        <div className="flex-1 p-4 space-y-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeData.color} flex items-center justify-center mx-auto text-white`}
                          >
                            {activeData.icon}
                          </motion.div>
                          
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto" />
                            <div className="h-2 bg-gray-200 rounded w-full" />
                            <div className="h-2 bg-gray-200 rounded w-5/6" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="h-16 bg-gray-200 rounded-lg" />
                            <div className="h-16 bg-gray-200 rounded-lg" />
                          </div>
                          
                          <div className="h-12 bg-[#FFCF9A] rounded-xl mt-4" />
                        </div>
                        
                        {/* Bottom nav - Logo placeholder area */}
                        <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-around px-4">
                          <div className="w-6 h-6 rounded-full bg-[#FFCF9A] flex items-center justify-center">
                            <IconHome size={14} className="text-foreground" />
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-300" />
                          <div className="w-6 h-6 rounded-full bg-gray-300" />
                          <div className="w-6 h-6 rounded-full bg-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature info */}
                  <div className="text-center mt-6">
                    <h4 className="font-bold text-lg text-foreground mb-2">{activeData.title}</h4>
                    <p className="text-sm text-muted-foreground">{activeData.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
