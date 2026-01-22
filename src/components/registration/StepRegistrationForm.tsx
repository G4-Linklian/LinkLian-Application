import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ArrowLeft, Upload, FileText, Image, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DataReviewDialog from './DataReviewDialog';
import { submitRegistration, uploadFile } from '@/services/registration';
import { 
  registrationFormSchema, 
  validateFile, 
  validateRegistration,
  FILE_LIMITS,
  type RegistrationFormData 
} from '@/lib/validations/registration';

interface StepRegistrationFormProps {
  email: string;
  onNext: () => void;
  onBack: () => void;
}

export default function StepRegistrationForm({ email, onNext, onBack }: StepRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateFile(file, 'logo');
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, logoFile: validation.error! }));
        return;
      }
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.logoFile;
        return newErrors;
      });
      setLogoFile(file);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateFile(file, 'document');
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, documentFile: validation.error! }));
        return;
      }
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.documentFile;
        return newErrors;
      });
      setDocumentFile(file);
    }
  };

  const handleOpenReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = validateRegistration(
      formData as RegistrationFormData, 
      logoFile, 
      documentFile
    );
    
    if (!validation.valid) {
      setErrors(validation.errors);
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    
    setShowReviewDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);

    try {
      let logoUrl = '';
      let docsUrl = '';

      // Upload logo ถ้ามีไฟล์
      if (logoFile) {
        console.log('📤 Uploading Logo...');
        const logoUpload = await uploadFile(logoFile, 'logo');
        if (logoUpload.success && logoUpload.data?.fileUrl) {
          logoUrl = logoUpload.data.fileUrl;
          console.log('✅ Logo URL from Blob:', logoUrl);
        } else {
          console.warn('⚠️ Logo upload failed, continuing without logo');
        }
      }

      // Upload document ถ้ามีไฟล์
      if (documentFile) {
        console.log('📤 Uploading Document...');
        const docUpload = await uploadFile(documentFile, 'document');
        if (docUpload.success && docUpload.data?.fileUrl) {
          docsUrl = docUpload.data.fileUrl;
          console.log('✅ Document URL from Blob:', docsUrl);
        } else {
          console.warn('⚠️ Document upload failed, continuing without document');
        }
      }

      // แปลงข้อมูล form ให้ตรงกับ backend
      const submitData = {
        inst_email: email,
        inst_password: 'tempPassword',
        inst_name_th: formData.institutionName,
        inst_name_en: formData.institutionNameEn,
        inst_abbr_th: formData.institutionAbbr,
        inst_abbr_en: formData.institutionAbbrEn,
        inst_type: formData.institutionType,
        inst_phone: formData.contactPhone,
        website: formData.website,
        address: formData.address,
        subdistrict: formData.subDistrict,
        district: formData.district,
        province: formData.province,
        postal_code: formData.postalCode,
        logo_url: logoUrl,
        docs_url: docsUrl, 
        flag_valid: true,
      };

      console.log('📤 Submitting Registration Data with Blob URLs:', submitData);

      const response = await submitRegistration(submitData);

      if (response.success) {
        console.log('✅ Registration Submitted:', response.data);
        setShowReviewDialog(false);
        onNext();
      } else {
        setErrors({ submit: response.error || 'เกิดข้อผิดพลาด ลองอีกครั้ง' });
      }
    } catch (err) {
      console.error('Submit Error:', err);
      setErrors({ submit: 'เกิดข้อผิดพลาดในการส่งข้อมูล' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (field: string) => {
    if (!errors[field]) return null;
    return (
      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </p>
    );
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
        </div>

        <form onSubmit={handleOpenReview} className="space-y-6">
          {/* Institution Names */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b pb-2">ข้อมูลสถาบัน</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="institutionName">ชื่อสถาบัน (ภาษาไทย) *</Label>
                <Input
                  id="institutionName"
                  placeholder="โรงเรียน / มหาวิทยาลัย / วิทยาลัย"
                  value={formData.institutionName}
                  onChange={(e) => handleChange('institutionName', e.target.value)}
                  disabled={isLoading}
                  maxLength={200}
                  className={errors.institutionName ? 'border-destructive' : ''}
                />
                {renderFieldError('institutionName')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionAbbr">ตัวย่อ (ไทย)</Label>
                <Input
                  id="institutionAbbr"
                  placeholder="เช่น จุฬาฯ"
                  value={formData.institutionAbbr}
                  onChange={(e) => handleChange('institutionAbbr', e.target.value)}
                  disabled={isLoading}
                  maxLength={20}
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="institutionNameEn">ชื่อสถาบัน (ภาษาอังกฤษ) *</Label>
                <Input
                  id="institutionNameEn"
                  placeholder="Institution Name in English"
                  value={formData.institutionNameEn}
                  onChange={(e) => handleChange('institutionNameEn', e.target.value)}
                  disabled={isLoading}
                  maxLength={200}
                  className={errors.institutionNameEn ? 'border-destructive' : ''}
                />
                {renderFieldError('institutionNameEn')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institutionAbbrEn">ตัวย่อ (EN)</Label>
                <Input
                  id="institutionAbbrEn"
                  placeholder="e.g., CU"
                  value={formData.institutionAbbrEn}
                  onChange={(e) => handleChange('institutionAbbrEn', e.target.value)}
                  disabled={isLoading}
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          {/* Institution Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b pb-2">รายละเอียดสถาบัน</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institutionType">ประเภทสถาบัน *</Label>
                <Select
                  value={formData.institutionType}
                  onValueChange={(value) => handleChange('institutionType', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className={errors.institutionType ? 'border-destructive' : ''}>
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
                {renderFieldError('institutionType')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">เว็บไซต์สถาบัน</Label>
                <Input
                  id="website"
                  placeholder="https://www.example.ac.th"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  disabled={isLoading}
                  maxLength={500}
                  className={errors.website ? 'border-destructive' : ''}
                />
                {renderFieldError('website')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">เบอร์โทรศัพท์ *</Label>
                <Input
                  id="contactPhone"
                  placeholder="08X-XXX-XXXX"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  disabled={isLoading}
                  maxLength={15}
                  className={errors.contactPhone ? 'border-destructive' : ''}
                />
                {renderFieldError('contactPhone')}
              </div>
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
                  maxLength={500}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {renderFieldError('address')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subDistrict">แขวง/ตำบล *</Label>
                <Input
                  id="subDistrict"
                  placeholder="แขวง/ตำบล"
                  value={formData.subDistrict}
                  onChange={(e) => handleChange('subDistrict', e.target.value)}
                  disabled={isLoading}
                  maxLength={100}
                  className={errors.subDistrict ? 'border-destructive' : ''}
                />
                {renderFieldError('subDistrict')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">เขต/อำเภอ *</Label>
                <Input
                  id="district"
                  placeholder="เขต/อำเภอ"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  disabled={isLoading}
                  maxLength={100}
                  className={errors.district ? 'border-destructive' : ''}
                />
                {renderFieldError('district')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">จังหวัด *</Label>
                <Input
                  id="province"
                  placeholder="จังหวัด"
                  value={formData.province}
                  onChange={(e) => handleChange('province', e.target.value)}
                  disabled={isLoading}
                  maxLength={100}
                  className={errors.province ? 'border-destructive' : ''}
                />
                {renderFieldError('province')}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">รหัสไปรษณีย์ *</Label>
                <Input
                  id="postalCode"
                  placeholder="10XXX"
                  value={formData.postalCode}
                  onChange={(e) => {
                    // Only allow digits
                    const value = e.target.value.replace(/\D/g, '');
                    handleChange('postalCode', value);
                  }}
                  disabled={isLoading}
                  maxLength={5}
                  className={errors.postalCode ? 'border-destructive' : ''}
                />
                {renderFieldError('postalCode')}
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b pb-2">เอกสารประกอบการลงทะเบียน</h3>
            
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>โลโก้สถาบัน <span className="text-muted-foreground text-xs">(ไม่เกิน {FILE_LIMITS.logo.maxSize / (1024 * 1024)}MB)</span></Label>
              <input
                ref={logoInputRef}
                type="file"
                accept={FILE_LIMITS.logo.allowedExtensions.join(',')}
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
                  className={`w-full h-20 border-dashed ${errors.logoFile ? 'border-destructive' : ''}`}
                  onClick={() => logoInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">คลิกเพื่ออัพโหลดโลโก้</span>
                  </div>
                </Button>
              )}
              {renderFieldError('logoFile')}
            </div>

            {/* Document Upload - Highly Emphasized */}
            <motion.div 
              className={`relative overflow-hidden rounded-2xl border-2 ${errors.documentFile ? 'border-destructive' : 'border-primary'} bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-lg`}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative corner accent */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <Label className="text-lg font-bold text-foreground">
                      เอกสารขอใช้ระบบ *
                    </Label>
                    <p className="text-xs text-primary font-medium">
                      จำเป็นต้องแนบเอกสาร (ไม่เกิน {FILE_LIMITS.document.maxSize / (1024 * 1024)}MB)
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 pl-1">
                  กรุณาอัพโหลดเอกสารขอใช้ระบบจากสถาบันของท่าน เช่น หนังสือขออนุญาต หรือ หนังสือรับรอง
                </p>
                
                <input
                  ref={documentInputRef}
                  type="file"
                  accept={FILE_LIMITS.document.allowedExtensions.join(',')}
                  onChange={handleDocumentChange}
                  className="hidden"
                  disabled={isLoading}
                />
                
                {documentFile ? (
                  <div className="flex items-center gap-3 p-4 bg-background rounded-xl border-2 border-primary/40 shadow-inner">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{documentFile.name}</p>
                      <p className="text-xs text-muted-foreground">อัพโหลดเรียบร้อย</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDocumentFile(null)}
                      disabled={isLoading}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full h-28 border-2 border-dashed ${errors.documentFile ? 'border-destructive' : 'border-primary/50 hover:border-primary'} hover:bg-primary/10 transition-all duration-300 group`}
                    onClick={() => documentInputRef.current?.click()}
                    disabled={isLoading}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-semibold text-primary block">คลิกเพื่ออัพโหลดเอกสาร</span>
                        <span className="text-xs text-muted-foreground">รองรับไฟล์ PDF, DOC, DOCX</span>
                      </div>
                    </div>
                  </Button>
                )}
                {renderFieldError('documentFile')}
              </div>
            </motion.div>
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
              disabled={isLoading}
            >
              <span className="flex items-center gap-2">
                ตรวจสอบข้อมูล
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </form>

        {/* Data Review Dialog */}
        <DataReviewDialog
          open={showReviewDialog}
          onClose={() => setShowReviewDialog(false)}
          onConfirm={handleConfirmSubmit}
          formData={formData}
          logoFile={logoFile}
          documentFile={documentFile}
          email={email}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
}
