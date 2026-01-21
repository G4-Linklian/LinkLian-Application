import { motion } from 'framer-motion';
import { Clock, Mail, Phone, ShieldCheck, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface StepPendingApprovalProps {
  email: string;
  isApproved?: boolean;
  onNext?: () => void;
  onApprovalChange?: (approved: boolean) => void;
}

export default function StepPendingApproval({ 
  email, 
  isApproved: initialApproved = false, 
  onNext,
  onApprovalChange 
}: StepPendingApprovalProps) {
  const [isApproved, setIsApproved] = useState(initialApproved);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setIsApproved(initialApproved);
  }, [initialApproved]);

  const handleSimulateApproval = () => {
    setIsSimulating(true);
    // จำลองการรอการอนุมัติ 2 วินาที
    setTimeout(() => {
      setIsApproved(true);
      setIsSimulating(false);
      onApprovalChange?.(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border text-center">
        <motion.div 
          key={isApproved ? 'approved' : 'pending'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-20 h-20 ${isApproved ? 'bg-green-100' : 'bg-amber-100'} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          {isSimulating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Clock className="w-10 h-10 text-amber-600" />
            </motion.div>
          ) : isApproved ? (
            <ShieldCheck className="w-10 h-10 text-green-600" />
          ) : (
            <Clock className="w-10 h-10 text-amber-600" />
          )}
        </motion.div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isSimulating ? 'กำลังตรวจสอบ...' : isApproved ? 'ได้รับการอนุมัติแล้ว' : 'รอการอนุมัติ'}
        </h2>
        
        <p className="text-muted-foreground mb-6">
          {isSimulating ? (
            <>
              กำลังจำลองการพิจารณาคำขอ
              <br />
              กรุณารอสักครู่...
            </>
          ) : isApproved ? (
            <>
              คำขอลงทะเบียนของคุณได้รับการอนุมัติแล้ว
              <br />
              คุณสามารถเริ่มใช้งานระบบได้ทันที
            </>
          ) : (
            <>
              คำขอลงทะเบียนของคุณอยู่ระหว่างการพิจารณา
              <br />
              เราจะแจ้งผลผ่านอีเมลเมื่อดำเนินการเสร็จสิ้น
            </>
          )}
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">อีเมลที่ลงทะเบียน</p>
          <p className="text-foreground font-medium">{email}</p>
        </div>

        {!isApproved && !isSimulating && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>ระยะเวลาพิจารณาประมาณ 1-3 วันทำการ</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span>หากมีข้อสงสัย โทร 02-XXX-XXXX</span>
            </div>
          </div>
        )}

        {isSimulating && (
          <div className="mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!isApproved && !isSimulating && (
            <Button 
              onClick={handleSimulateApproval}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Play className="w-4 h-4 mr-2" />
              จำลองการอนุมัติ (Demo)
            </Button>
          )}
          <Link to="/">
            <Button variant="outline" className="w-full">
              กลับหน้าหลัก
            </Button>
          </Link>
          {isApproved && onNext && (
            <Button onClick={onNext} className="w-full">
              ไปหน้าคู่มือการใช้งาน
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
