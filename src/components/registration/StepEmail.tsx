import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailSchema } from '@/lib/validations/registration';
import { verifyEmail } from '@/services/registration';

interface StepEmailProps {
  onNext: (email: string, status: 'new' | 'pending' | 'approved') => void;
}

export default function StepEmail({ onNext }: StepEmailProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate with zod schema
    const result = emailSchema.safeParse({ email: email.trim() });
    
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'รูปแบบอีเมลไม่ถูกต้อง');
      setIsLoading(false);
      return;
    }

    // Define the expected response type
    type VerifyEmailResponse = {
      success: boolean;
      data?: any[] | { data?: any[] };
      error?: string;
    };

    try {
      // เรียก API ตรวจสอบ email ผ่าน POST /institution.get
      const response = await verifyEmail(result.data.email) as VerifyEmailResponse;
      
      console.log('📊 Verify Email Response:', response);
      
      if (response.success) {
        console.log('Data:', response.data, 'Type:', typeof response.data);
        
        // ถ้า data.length === 0 → email ใหม่ → ไป step 2
        // ถ้า data.length > 0 → email มีอยู่ → ไป step 3
        const dataArray = Array.isArray(response.data)
          ? response.data
          : (response.data && Array.isArray((response.data as any).data) ? (response.data as any).data : []);
        const isNewEmail = dataArray.length === 0;
        const status = isNewEmail ? 'new' : 'pending';
        
        console.log('🔍 Is New Email?:', isNewEmail, 'Status:', status);
        
        onNext(result.data.email, status);
      } else {
        setError(response.error || 'เกิดข้อผิดพลาด ลองอีกครั้ง');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ ลองอีกครั้ง');
      console.error('Email verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">ลงทะเบียนสถาบัน</h2>
          <p className="text-muted-foreground mt-2">
            กรอกอีเมลของสถาบันเพื่อเริ่มต้นการลงทะเบียน
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">อีเมลสถาบัน</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@institution.ac.th"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className="h-12"
              maxLength={255}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={!email.trim() || isLoading}
          >
            <span className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  กำลังตรวจสอบ...
                </>
              ) : (
                <>
                  ถัดไป
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </span>
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          หากมีปัญหาในการลงทะเบียน กรุณาติดต่อ support@linklian.com
        </p>
      </div>
    </motion.div>
  );
}
