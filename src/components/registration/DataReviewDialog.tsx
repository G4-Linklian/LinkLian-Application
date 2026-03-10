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
  uni: 'มหาวิทยาลัย',
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
  
  // ปรับเป็น Flexbox เพื่อให้ข้อมูลชิดซ้ายต่อจาก Label
  const DataRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex py-2 border-b border-border/40 last:border-0 items-start gap-2">
      <span className="text-muted-foreground text-sm font-medium shrink-0 min-w-[110px]">
        {label}:
      </span>
      <span className="text-foreground text-sm font-semibold break-words">
        {value || '-'}
      </span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-0 gap-0 overflow-hidden flex flex-col max-h-[92vh] rounded-xl">
        
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-white">
          <DialogTitle className="flex items-center gap-2 text-xl text-slate-800">
            <Check className="w-5 h-5 text-emerald-500" />
            ตรวจสอบข้อมูลก่อนส่ง
          </DialogTitle>
          <DialogDescription>
            กรุณาตรวจสอบข้อมูลของคุณให้ถูกต้องก่อนยืนยันการลงทะเบียน
          </DialogDescription>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          
          {/* Email Highlight */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-[#B7552B] text-sm font-medium shrink-0">อีเมลที่ลงทะเบียน:</span>
            <span className= "text-[#B7552B] font-bold text-lg">{email}</span>
          </div>

          {/* Section: ข้อมูลสถาบัน */}
          <div className="bg-white rounded-xl border p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-700 border-b pb-3 mb-1">
              <Building2 className="w-4 h-4 text-[#B7552B]" />
              <h4 className="font-bold text-sm tracking-tight">ข้อมูลสถาบัน</h4>
            </div>
            <div className="grid grid-cols-1">
              <DataRow label="ชื่อสถาบัน (ไทย)" value={formData.institutionName} />
              <DataRow label="ตัวย่อ (ไทย)" value={formData.institutionAbbr} />
              <DataRow label="ชื่อสถาบัน (EN)" value={formData.institutionNameEn} />
              <DataRow label="ตัวย่อ (EN)" value={formData.institutionAbbrEn} />
              <DataRow label="ประเภทสถาบัน" value={institutionTypeLabels[formData.institutionType] || formData.institutionType} />
            </div>
          </div>

          {/* Section: ข้อมูลติดต่อ & เอกสาร */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700 border-b pb-3 mb-2">
                <Phone className="w-4 h-4 text-[#B7552B]" />
                <h4 className="font-bold text-sm">ข้อมูลติดต่อ</h4>
              </div>
              <DataRow label="เบอร์โทร" value={formData.contactPhone} />
              <DataRow label="เว็บไซต์" value={formData.website} />
            </div>

            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700 border-b pb-3 mb-2">
                <FileText className="w-4 h-4 text-[#B7552B]" />
                <h4 className="font-bold text-sm">เอกสารแนบ</h4>
              </div>
              <div className="mt-2 space-y-2">
                {logoFile && (
                  <div className="flex items-center gap-2 text-xs p-2.5 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <Image className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate font-medium text-slate-600">{logoFile.name}</span>
                  </div>
                )}
                {documentFile && (
                  <div className="flex items-center gap-2 text-xs p-2.5 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate font-medium text-slate-600">{documentFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: สถานที่ตั้ง */}
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 border-b pb-3 mb-1">
              <MapPin className="w-4 h-4 text-[#B7552B]" />
              <h4 className="font-bold text-sm">สถานที่ตั้ง</h4>
            </div>
            <DataRow label="ที่อยู่" value={formData.address} />
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
              <DataRow label="แขวง/ตำบล" value={formData.subDistrict} />
              <DataRow label="เขต/อำเภอ" value={formData.district} />
              <DataRow label="จังหวัด" value={formData.province} />
              <DataRow label="รหัสไปรษณีย์" value={formData.postalCode} />
            </div>
          </div>

        </div>

        {/* Footer */}
        <DialogFooter className="p-4 px-6 border-t bg-white flex flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="w-4 h-4 mr-2" />
            แก้ไขข้อมูล
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-[#FDE6B1] hover:bg-[#FCD985] text-[#B7552B] border-none shadow-sm transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#B7552B]/30 border-t-[#B7552B] rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2 font-bold">
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