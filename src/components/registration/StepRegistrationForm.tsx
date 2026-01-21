import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepRegistrationFormProps {
  email: string;
  onNext: () => void;
  onBack: () => void;
}

export default function StepRegistrationForm({ email, onNext, onBack }: StepRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: '',
    contactName: '',
    contactPhone: '',
    address: '',
    studentCount: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.institutionName &&
      formData.institutionType &&
      formData.contactName &&
      formData.contactPhone &&
      formData.address
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;

    setIsLoading(true);

    // Mock API call - simulate submitting registration
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card rounded-2xl p-8 shadow-lg border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">ข้อมูลสถาบัน</h2>
          <p className="text-muted-foreground mt-2">
            กรอกรายละเอียดสถาบันของคุณเพื่อดำเนินการลงทะเบียน
          </p>
          <p className="text-sm text-primary mt-1">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="institutionName">ชื่อสถาบัน *</Label>
              <Input
                id="institutionName"
                placeholder="โรงเรียน / มหาวิทยาลัย / วิทยาลัย"
                value={formData.institutionName}
                onChange={(e) => handleChange('institutionName', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institutionType">ประเภทสถาบัน *</Label>
              <Select
                value={formData.institutionType}
                onValueChange={(value) => handleChange('institutionType', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">โรงเรียน</SelectItem>
                  <SelectItem value="university">มหาวิทยาลัย</SelectItem>
                  <SelectItem value="college">วิทยาลัย</SelectItem>
                  <SelectItem value="vocational">สถาบันอาชีวศึกษา</SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentCount">จำนวนนักเรียน/นักศึกษา (โดยประมาณ)</Label>
              <Select
                value={formData.studentCount}
                onValueChange={(value) => handleChange('studentCount', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกจำนวน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-100">1 - 100 คน</SelectItem>
                  <SelectItem value="101-500">101 - 500 คน</SelectItem>
                  <SelectItem value="501-1000">501 - 1,000 คน</SelectItem>
                  <SelectItem value="1001-5000">1,001 - 5,000 คน</SelectItem>
                  <SelectItem value="5000+">มากกว่า 5,000 คน</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">ชื่อผู้ติดต่อ *</Label>
              <Input
                id="contactName"
                placeholder="ชื่อ-นามสกุล"
                value={formData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">เบอร์โทรศัพท์ *</Label>
              <Input
                id="contactPhone"
                placeholder="08X-XXX-XXXX"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">ที่อยู่ *</Label>
              <Textarea
                id="address"
                placeholder="ที่อยู่สถาบัน"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isLoading}
              className="flex-1 h-12"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ย้อนกลับ
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12"
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  กำลังส่งข้อมูล...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  ส่งข้อมูลลงทะเบียน
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
