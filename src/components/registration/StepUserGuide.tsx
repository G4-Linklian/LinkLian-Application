import { motion } from 'framer-motion';
import { CheckCircle, Download, PlayCircle, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StepUserGuideProps {
  email: string;
}

const guides = [
  {
    icon: PlayCircle,
    title: 'วิดีโอแนะนำการใช้งาน',
    description: 'เรียนรู้การใช้งานเบื้องต้นผ่านวิดีโอ 5 นาที',
    action: 'ดูวิดีโอ',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
  },
  {
    icon: Download,
    title: 'ดาวน์โหลดคู่มือ PDF',
    description: 'คู่มือฉบับเต็มสำหรับผู้ดูแลระบบ',
    action: 'ดาวน์โหลด',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    icon: BookOpen,
    title: 'บทความช่วยเหลือ',
    description: 'คำถามที่พบบ่อยและวิธีแก้ไขปัญหา',
    action: 'อ่านบทความ',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
  },
];

export default function StepUserGuide({ email }: StepUserGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            ยินดีต้อนรับสู่ LinkLian!
          </h2>
          <p className="text-muted-foreground">
            สถาบันของคุณได้รับการอนุมัติแล้ว
            <br />
            เริ่มต้นใช้งานได้เลย
          </p>
          <p className="text-sm text-primary mt-2">{email}</p>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-foreground mb-2">ข้อมูลการเข้าสู่ระบบ</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">อีเมล</p>
              <p className="text-foreground font-medium">{email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">รหัสผ่าน</p>
              <p className="text-foreground font-medium">ส่งไปยังอีเมลของคุณแล้ว</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-4">เริ่มต้นใช้งาน</h3>
        
        <div className="space-y-3 mb-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className={`w-12 h-12 ${guide.bgColor} rounded-xl flex items-center justify-center`}>
                <guide.icon className={`w-6 h-6 ${guide.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{guide.title}</h4>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                {guide.action}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-12">
              กลับหน้าหลัก
            </Button>
          </Link>
          <Button className="flex-1 h-12">
            เข้าสู่ระบบ
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
