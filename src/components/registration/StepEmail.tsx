import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StepEmailProps {
  onNext: (email: string, status: 'new' | 'pending' | 'approved') => void;
}

export default function StepEmail({ onNext }: StepEmailProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('กรุณากรอกอีเมลให้ถูกต้อง');
      return;
    }

    setIsLoading(true);

    // Mock API call - simulate checking email status
    // In real implementation, this would check the database
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo: 
    // - emails ending with @approved.com -> approved (go to step 4)
    // - emails ending with @pending.com -> pending (go to step 3)
    // - emails ending with @registered.com -> registered but pending (go to step 3)
    // - other emails -> new registration (go to step 2)
    let status: 'new' | 'pending' | 'approved' = 'new';
    if (email.endsWith('@approved.com')) {
      status = 'approved';
    } else if (email.endsWith('@pending.com') || email.endsWith('@registered.com')) {
      status = 'pending';
    }

    setIsLoading(false);
    onNext(email, status);
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
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                กำลังตรวจสอบ...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                ถัดไป
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          หากมีปัญหาในการลงทะเบียน กรุณาติดต่อ support@linklian.com
        </p>
      </div>
    </motion.div>
  );
}
