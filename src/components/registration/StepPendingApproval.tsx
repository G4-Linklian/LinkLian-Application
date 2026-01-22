import { motion } from 'framer-motion';
import { Clock, Mail, Phone, ShieldCheck, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { verifyEmail } from '@/services/registration';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface StepPendingApprovalProps {
  email: string;
  initialStatus?: ApprovalStatus;
  rejectionReason?: string;
  onNext?: () => void;
  onStatusChange?: (status: ApprovalStatus) => void;
  onResubmit?: () => void;
}

export default function StepPendingApproval({ 
  email, 
  initialStatus = 'pending',
  rejectionReason = '',
  onNext,
  onStatusChange,
  onResubmit
}: StepPendingApprovalProps) {
  const [status, setStatus] = useState<ApprovalStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectionMsg, setRejectionMsg] = useState(rejectionReason);
  const [institutionData, setInstitutionData] = useState<any>(null);

  // ดึงข้อมูล institution และ approve_status
  useEffect(() => {
    const fetchApprovalStatus = async () => {
      setIsLoading(true);
      try {
        const response = await verifyEmail(email);
        
        console.log('📊 Approval Status Response:', response);

        if (response.success && response.data?.data && response.data.data.length > 0) {
          const institution = response.data.data[0];
          setInstitutionData(institution);

          // ตรวจสอบ approve_status
          const approveStatus = institution.approve_status?.toLowerCase();
          
          if (approveStatus === 'approved') {
            setStatus('approved');
            // ไม่เรียก onStatusChange ให้แสดงผลก่อน user click ปุ่มถัดไป
          } else if (approveStatus === 'rejected' || approveStatus === 'reject') {
            setStatus('rejected');
            onStatusChange?.('rejected');
            setRejectionMsg(institution.reject_reason || 'ไม่มีข้อมูลเหตุผล');
          } else {
            setStatus('pending');
            onStatusChange?.('pending');
          }

          console.log('✅ Institution Data:', institution);
        }
      } catch (err) {
        console.error('❌ Error fetching approval status:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovalStatus();
  }, [email, onStatusChange]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border text-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">กำลังตรวจสอบสถานะ...</p>
          </div>
        ) : (
          <>
            <motion.div 
              key={status}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-20 h-20 ${getStatusConfig().bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              {getStatusConfig().icon}
            </motion.div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {getStatusConfig().title}
            </h2>
            
            <p className="text-muted-foreground mb-6">
              {getStatusConfig().description}
            </p>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">อีเมลที่ลงทะเบียน</p>
              <p className="text-foreground font-medium">{email}</p>
            </div>

            {/* Rejection Reason */}
            {status === 'rejected' && rejectionMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-1">เหตุผลที่ไม่ผ่านการอนุมัติ</p>
                    <p className="text-sm text-red-700">{rejectionMsg}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'pending' && (
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span>ระยะเวลาพิจารณาประมาณ 1-3 วันทำการ</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span>หากมีข้อสงสัย ติดต่อ linklian.edu@gmail.com</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {status === 'rejected' && onResubmit && (
                <Button 
                  onClick={onResubmit}
                  variant="outline"
                  className="w-full"
                >
                  ยื่นคำขอใหม่
                </Button>
              )}

              <Link to="/">
                <Button variant="outline" className="w-full">
                  กลับหน้าหลัก
                </Button>
              </Link>

              {status === 'approved' && onNext && (
                <Button onClick={onNext} className="w-full border-0">
                  ขั้นตอนถัดไป
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
