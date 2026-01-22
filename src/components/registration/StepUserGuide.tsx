import { motion } from 'framer-motion';
import { CheckCircle, LogIn, Mail, Lock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StepUserGuideProps {
  email: string;
}

const guides = [
  {
    icon: Mail,
    title: 'ตรวจสอบอีเมลของคุณ',
    description: 'เราได้ส่งรหัสผ่านไปยังอีเมล โปรดตรวจสอบ',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Lock,
    title: 'เตรียมรหัสผ่าน',
    description: 'ใช้อีเมลและรหัสผ่านที่ได้รับเพื่อเข้าสู่ระบบ',
    color: 'text-amber-500',
    bgColor: 'bg-amber-100',
  },
  {
    icon: LogIn,
    title: 'เข้าสู่ระบบได้แล้ว',
    description: 'เข้าสู่ระบบได้ที่ https://uat-webapp.linklian.org/registration',
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

        <h3 className="font-semibold text-foreground mb-4">ขั้นตอนการเข้าสู่ระบบ</h3>
        
        <div className="space-y-3 mb-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
            >
              <div className={`w-12 h-12 ${guide.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <guide.icon className={`w-6 h-6 ${guide.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{guide.title}</h4>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <a href="https://uat-webapp.linklian.org/registration/login" target="_blank" rel="noopener noreferrer">
            <Button className="w-full h-12">
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                เข้าสู่ระบบ
              </span>
            </Button>
          </a>

          <Link to="/">
            <Button variant="outline" className="w-full h-12">
              กลับหน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
