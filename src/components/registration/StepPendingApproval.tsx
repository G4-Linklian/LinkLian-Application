import { motion } from 'framer-motion';
import { Clock, Mail, Phone, ShieldCheck, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface StepPendingApprovalProps {
  email: string;
  status: ApprovalStatus;
  rejectionReason?: string;
  onNext?: () => void;
  onRetry?: () => void;
}

export default function StepPendingApproval({ 
  email, 
  status = 'pending',
  rejectionReason,
  onNext,
  onRetry
}: StepPendingApprovalProps) {

  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
          bgColor: 'bg-green-100',
          title: 'ได้รับการอนุมัติแล้ว',
          description: (
            <>
              คำขอลงทะเบียนของคุณได้รับการอนุมัติแล้ว
              <br />
              คุณสามารถเริ่มใช้งานระบบได้ทันที
            </>
          )
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-10 h-10 text-red-600" />,
          bgColor: 'bg-red-100',
          title: 'ไม่ผ่านการอนุมัติ',
          description: (
            <>
              คำขอลงทะเบียนของคุณไม่ผ่านการพิจารณา
              <br />
              กรุณาตรวจสอบเหตุผลด้านล่างและดำเนินการแก้ไข
            </>
          )
        };
      default:
        return {
          icon: <Clock className="w-10 h-10 text-amber-600" />,
          bgColor: 'bg-amber-100',
          title: 'รอการอนุมัติ',
          description: (
            <>
              คำขอลงทะเบียนของคุณอยู่ระหว่างการพิจารณา
              <br />
              เราจะแจ้งผลผ่านอีเมลเมื่อดำเนินการเสร็จสิ้น
            </>
          )
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border text-center">
        <motion.div 
          key={status}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          {statusConfig.icon}
        </motion.div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {statusConfig.title}
        </h2>
        
        <p className="text-muted-foreground mb-6">
          {statusConfig.description}
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">อีเมลที่ลงทะเบียน</p>
          <p className="text-foreground font-medium">{email}</p>
        </div>

        {/* Rejection Reason */}
        {status === 'rejected' && rejectionReason && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">เหตุผลที่ไม่ผ่านการอนุมัติ</p>
                <p className="text-sm text-red-700">{rejectionReason}</p>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'pending' && (
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
          {status === 'rejected' && onRetry && (
            <Button onClick={onRetry} className="w-full">
              ยื่นคำขอใหม่
            </Button>
          )}

          <Link to="/">
            <Button variant="outline" className="w-full">
              กลับหน้าหลัก
            </Button>
          </Link>

          {status === 'approved' && onNext && (
            <Button onClick={onNext} className="w-full">
              ไปหน้าคู่มือการใช้งาน
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
