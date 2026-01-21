import { motion } from 'framer-motion';
import { FileText, Building2, MapPin, Phone, Globe, Image, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface FormData {
  institutionName: string;
  institutionNameEn: string;
  institutionAbbr: string;
  institutionAbbrEn: string;
  institutionType: string;
  website: string;
  contactPhone: string;
  address: string;
  district: string;
  subDistrict: string;
  province: string;
  postalCode: string;
}

interface DataReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: FormData;
  logoFile: File | null;
  documentFile: File | null;
  email: string;
  isLoading: boolean;
}

const institutionTypeLabels: Record<string, string> = {
  school: 'โรงเรียน',
  university: 'มหาวิทยาลัย',
  college: 'วิทยาลัย',
  vocational: 'สถาบันอาชีวศึกษา',
  other: 'อื่นๆ',
};

export default function DataReviewDialog({
  open,
  onClose,
  onConfirm,
  formData,
  logoFile,
  documentFile,
  email,
  isLoading,
}: DataReviewDialogProps) {
  const DataRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground font-medium text-sm text-right max-w-[60%]">{value || '-'}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Check className="w-5 h-5 text-primary" />
            ตรวจสอบข้อมูลก่อนส่ง
          </DialogTitle>
          <DialogDescription>
            กรุณาตรวจสอบข้อมูลของคุณให้ถูกต้องก่อนยืนยันการลงทะเบียน
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Email */}
          <div className="bg-primary/5 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">อีเมลที่ลงทะเบียน</p>
            <p className="text-primary font-medium">{email}</p>
          </div>

          {/* Institution Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-foreground">ข้อมูลสถาบัน</h4>
            </div>
            <div className="bg-muted/30 rounded-lg px-4">
              <DataRow label="ชื่อสถาบัน (ไทย)" value={formData.institutionName} />
              <DataRow label="ตัวย่อ (ไทย)" value={formData.institutionAbbr} />
              <DataRow label="ชื่อสถาบัน (EN)" value={formData.institutionNameEn} />
              <DataRow label="ตัวย่อ (EN)" value={formData.institutionAbbrEn} />
              <DataRow label="ประเภทสถาบัน" value={institutionTypeLabels[formData.institutionType] || formData.institutionType} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-foreground">ข้อมูลติดต่อ</h4>
            </div>
            <div className="bg-muted/30 rounded-lg px-4">
              <DataRow label="เบอร์โทรศัพท์" value={formData.contactPhone} />
              <DataRow label="เว็บไซต์" value={formData.website} />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-foreground">ที่อยู่</h4>
            </div>
            <div className="bg-muted/30 rounded-lg px-4">
              <DataRow label="ที่อยู่" value={formData.address} />
              <DataRow label="แขวง/ตำบล" value={formData.subDistrict} />
              <DataRow label="เขต/อำเภอ" value={formData.district} />
              <DataRow label="จังหวัด" value={formData.province} />
              <DataRow label="รหัสไปรษณีย์" value={formData.postalCode} />
            </div>
          </div>

          {/* Files */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-foreground">เอกสารแนบ</h4>
            </div>
            <div className="bg-muted/30 rounded-lg px-4 py-2 space-y-2">
              {logoFile && (
                <div className="flex items-center gap-2 text-sm">
                  <Image className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">โลโก้:</span>
                  <span className="font-medium truncate">{logoFile.name}</span>
                </div>
              )}
              {documentFile && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">เอกสารขอใช้ระบบ:</span>
                  <span className="font-medium truncate">{documentFile.name}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            แก้ไขข้อมูล
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                กำลังส่ง...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                ยืนยันส่งข้อมูล
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
