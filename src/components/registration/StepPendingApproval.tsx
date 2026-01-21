import { motion } from 'framer-motion';
import { Clock, Mail, Phone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StepPendingApprovalProps {
  email: string;
  isApproved?: boolean;
  onNext?: () => void;
}

export default function StepPendingApproval({ email, isApproved = false, onNext }: StepPendingApprovalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border text-center">
        <div className={`w-20 h-20 ${isApproved ? 'bg-green-100' : 'bg-amber-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {isApproved ? (
            <ShieldCheck className="w-10 h-10 text-green-600" />
          ) : (
            <Clock className="w-10 h-10 text-amber-600" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isApproved ? 'ได้รับการอนุมัติแล้ว' : 'รอการอนุมัติ'}
        </h2>
        
        <p className="text-muted-foreground mb-6">
          {isApproved ? (
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

        {!isApproved && (
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

        <div className="flex flex-col gap-3">
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
