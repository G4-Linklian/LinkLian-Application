import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailSchema } from '@/lib/validations/registration';

interface StepEmailProps {
  onNext: (email: string, status: 'new' | 'pending' | 'approved') => void;
}

export default function StepEmail({ onNext }: StepEmailProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate with zod schema
    const result = emailSchema.safeParse({ email: email.trim() });
    
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'รูปแบบอีเมลไม่ถูกต้อง');
      return;
    }

    onNext(result.data.email, 'new');
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
            disabled={!email.trim()}
          >
            <span className="flex items-center gap-2">
              ถัดไป
              <ArrowRight className="w-4 h-4" />
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
