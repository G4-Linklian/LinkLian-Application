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
  screenshot: string;
}

const features: Feature[] = [
  { id: 1, icon: <IconDeviceMobile size={24} />, title: 'รองรับทุกอุปกรณ์', description: 'รองรับการใช้งานทุกอุปกรณ์ ใช้งานง่ายได้ทุกที่ ทุกเวลา', color: 'from-blue-500 to-blue-600', screenshot: '/mobile/feature-1.png' },
  { id: 2, icon: <IconPencil size={24} />, title: 'รูปแบบการส่งงาน', description: 'ส่งการบ้านออนไลน์ ให้ครูปรับแต่งเวลาส่งได้ตามใจต้องการ และให้ความเห็นต่อชิ้นงานของผู้เรียน', color: 'from-purple-500 to-purple-600', screenshot: '/mobile/feature-2.png' },
  { id: 3, icon: <IconBook size={24} />, title: 'เตรียมสอบได้ง่าย ๆ เพียงปลายนิ้ว', description: 'สามารถใช้ AI Summarize เพื่อเตรียมสอบ จากข้อมูลสื่อการสอนในห้องเรียนได้', color: 'from-green-500 to-green-600', screenshot: '/mobile/feature-3.png' },
  { id: 4, icon: <IconHome size={24} />, title: 'ชุมชนผู้เรียนสำหรับแบ่งปันความรู้', description: 'เปิดโอกาสให้ผู้เรียนที่มีความสนใจเหมือนกันเปิดชุมชนไว้สำหรับพูดคุยแลกเปลี่ยนความรู้', color: 'from-amber-500 to-orange-500', screenshot: '/mobile/feature-1.png' },
  { id: 5, icon: <IconCalendarEvent size={24} />, title: 'ดูข้อมูลเกี่ยวกับชั้นเรียนได้อย่างสะดวก', description: 'ดูตารางเรียน ผลคะแนนของการบ้านได้อย่างสะดวกสบาย', color: 'from-red-500 to-pink-500', screenshot: '/mobile/feature-2.png' },
  { id: 6, icon: <IconCalendarEvent size={24} />, title: 'แจ้งเตือนข่าวสาร', description: 'ดูกิจกรรม ประกาศข่าวสาร และรับการแจ้งเตือนต่างๆ ได้ทุกที่ ทุกเวลา', color: 'from-teal-500 to-cyan-500', screenshot: '/mobile/feature-3.png' },
];

export default function FeaturesMobileSection() {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const activeData = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="features" className="section-padding">
      {/* Section Badge outside */}
      <div className="text-center mb-8">
        <SectionBadge icon={IconDeviceMobile} text="จุดเด่นของแอปพลิเคชัน" className="bg-[#FFCF9A]" />
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
              จุดเด่นของแอปพลิเคชัน
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              6 ความสามารถที่ได้รับการออกแบบมาให้ใช้งานได้สะดวก
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

            {/* Feature Preview - Right side with White Card */}
            <div className="relative flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-white rounded-3xl p-8 shadow-2xl"
                >
                  {/* Real app screenshot centered */}
                  <div className="flex justify-center">
                    <img 
                      src={activeData.screenshot} 
                      alt={`LinkLian - ${activeData.title}`}
                      className="h-[360px] sm:h-[420px] w-auto drop-shadow-xl"
                    />
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
