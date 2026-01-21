import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ArrowLeft, Upload, FileText, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    institutionNameEn: '',
    institutionAbbr: '',
    institutionAbbrEn: '',
    institutionType: '',
    website: '',
    contactPhone: '',
    address: '',
    district: '',
    subDistrict: '',
    province: '',
    postalCode: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const isFormValid = () => {
    return (
      formData.institutionName &&
      formData.institutionNameEn &&
      formData.institutionType &&
      formData.contactPhone &&
      formData.address &&
      formData.district &&
      formData.subDistrict &&
      formData.province &&
      formData.postalCode &&
      documentFile
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
          {/* Institution Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="institutionName">ชื่อสถาบัน (ภาษาไทย) *</Label>
              <Input
                id="institutionName"
                placeholder="โรงเรียน / มหาวิทยาลัย / วิทยาลัย"
                value={formData.institutionName}
                onChange={(e) => handleChange('institutionName', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institutionAbbr">ตัวย่อสถาบัน (ภาษาไทย)</Label>
              <Input
                id="institutionAbbr"
                placeholder="เช่น จุฬาฯ, มก., มธ."
                value={formData.institutionAbbr}
                onChange={(e) => handleChange('institutionAbbr', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="institutionNameEn">ชื่อสถาบัน (ภาษาอังกฤษ) *</Label>
              <Input
                id="institutionNameEn"
                placeholder="Institution Name in English"
                value={formData.institutionNameEn}
                onChange={(e) => handleChange('institutionNameEn', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institutionAbbrEn">ตัวย่อสถาบัน (ภาษาอังกฤษ)</Label>
              <Input
                id="institutionAbbrEn"
                placeholder="e.g., CU, KU, TU"
                value={formData.institutionAbbrEn}
                onChange={(e) => handleChange('institutionAbbrEn', e.target.value)}
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
              <Label htmlFor="website">เว็บไซต์สถาบัน</Label>
              <Input
                id="website"
                placeholder="https://www.example.ac.th"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
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
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b pb-2">ที่อยู่สถาบัน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">ที่อยู่ *</Label>
                <Input
                  id="address"
                  placeholder="เลขที่ ถนน ซอย"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subDistrict">แขวง/ตำบล *</Label>
                <Input
                  id="subDistrict"
                  placeholder="แขวง/ตำบล"
                  value={formData.subDistrict}
                  onChange={(e) => handleChange('subDistrict', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">เขต/อำเภอ *</Label>
                <Input
                  id="district"
                  placeholder="เขต/อำเภอ"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">จังหวัด *</Label>
                <Input
                  id="province"
                  placeholder="จังหวัด"
                  value={formData.province}
                  onChange={(e) => handleChange('province', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">รหัสไปรษณีย์ *</Label>
                <Input
                  id="postalCode"
                  placeholder="10XXX"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  disabled={isLoading}
                  maxLength={5}
                />
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b pb-2">เอกสารประกอบการลงทะเบียน</h3>
            
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>โลโก้สถาบัน</Label>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                disabled={isLoading}
              />
              {logoFile ? (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                  <Image className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-sm truncate">{logoFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setLogoFile(null)}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-20 border-dashed"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">คลิกเพื่ออัพโหลดโลโก้</span>
                  </div>
                </Button>
              )}
            </div>

            {/* Document Upload - Emphasized */}
            <div className="space-y-2 p-4 bg-primary/5 rounded-xl border-2 border-primary/20">
              <Label className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                เอกสารขอใช้ระบบ *
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                กรุณาอัพโหลดเอกสารขอใช้ระบบจากสถาบันของท่าน (รองรับไฟล์ PDF, DOC, DOCX)
              </p>
              <input
                ref={documentInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleDocumentChange}
                className="hidden"
                disabled={isLoading}
              />
              {documentFile ? (
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-primary/30">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-sm truncate">{documentFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setDocumentFile(null)}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-24 border-dashed border-primary/30 hover:bg-primary/5"
                  onClick={() => documentInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-primary">คลิกเพื่ออัพโหลดเอกสาร</span>
                    <span className="text-xs text-muted-foreground">PDF, DOC, DOCX</span>
                  </div>
                </Button>
              )}
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
