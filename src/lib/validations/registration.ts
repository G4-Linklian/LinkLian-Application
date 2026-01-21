import { z } from 'zod';

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'กรุณากรอกอีเมล' })
    .max(255, { message: 'อีเมลต้องไม่เกิน 255 ตัวอักษร' })
    .email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' })
    .refine(
      (email) => {
        // Check for valid domain format
        const domainPart = email.split('@')[1];
        return domainPart && domainPart.includes('.') && domainPart.length > 3;
      },
      { message: 'โดเมนอีเมลไม่ถูกต้อง' }
    ),
});

// Thai phone number validation
const phoneRegex = /^(0[2-9][0-9]{7,8}|0[689][0-9]{8})$/;

// Postal code validation (Thai postal codes are 5 digits)
const postalCodeRegex = /^[0-9]{5}$/;

// URL validation (optional field)
const urlSchema = z
  .string()
  .trim()
  .max(500, { message: 'URL ต้องไม่เกิน 500 ตัวอักษร' })
  .refine(
    (url) => {
      if (!url) return true; // Allow empty
      try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    { message: 'รูปแบบ URL ไม่ถูกต้อง (ต้องเริ่มด้วย http:// หรือ https://)' }
  )
  .optional()
  .or(z.literal(''));

// Text field sanitization - removes potentially dangerous characters
const sanitizedString = (minLength: number, maxLength: number, fieldName: string) =>
  z
    .string()
    .trim()
    .min(minLength, { message: `กรุณากรอก${fieldName}` })
    .max(maxLength, { message: `${fieldName}ต้องไม่เกิน ${maxLength} ตัวอักษร` })
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      { message: 'ข้อมูลมีรูปแบบไม่ถูกต้อง' }
    );

// Optional text field
const optionalSanitizedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, { message: `ต้องไม่เกิน ${maxLength} ตัวอักษร` })
    .refine(
      (val) => !val || !/<script|javascript:|on\w+=/i.test(val),
      { message: 'ข้อมูลมีรูปแบบไม่ถูกต้อง' }
    )
    .optional()
    .or(z.literal(''));

// Institution types enum
export const institutionTypes = ['school', 'university', 'college', 'vocational', 'other'] as const;

// Registration form schema
export const registrationFormSchema = z.object({
  institutionName: sanitizedString(1, 200, 'ชื่อสถาบัน (ภาษาไทย)'),
  institutionNameEn: sanitizedString(1, 200, 'ชื่อสถาบัน (ภาษาอังกฤษ)'),
  institutionAbbr: optionalSanitizedString(20),
  institutionAbbrEn: optionalSanitizedString(20),
  institutionType: z.enum(institutionTypes, {
    errorMap: () => ({ message: 'กรุณาเลือกประเภทสถาบัน' }),
  }),
  website: urlSchema,
  contactPhone: z
    .string()
    .trim()
    .min(1, { message: 'กรุณากรอกเบอร์โทรศัพท์' })
    .transform((val) => val.replace(/[\s-]/g, '')) // Remove spaces and dashes
    .refine((val) => phoneRegex.test(val), {
      message: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0812345678)',
    }),
  address: sanitizedString(1, 500, 'ที่อยู่'),
  district: sanitizedString(1, 100, 'เขต/อำเภอ'),
  subDistrict: sanitizedString(1, 100, 'แขวง/ตำบล'),
  province: sanitizedString(1, 100, 'จังหวัด'),
  postalCode: z
    .string()
    .trim()
    .min(1, { message: 'กรุณากรอกรหัสไปรษณีย์' })
    .refine((val) => postalCodeRegex.test(val), {
      message: 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก',
    }),
});

// File validation constants
export const FILE_LIMITS = {
  logo: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    allowedExtensions: ['.pdf', '.doc', '.docx'],
  },
} as const;

// File validation function
export function validateFile(
  file: File | null,
  type: 'logo' | 'document'
): { valid: boolean; error?: string } {
  if (!file) {
    if (type === 'document') {
      return { valid: false, error: 'กรุณาอัพโหลดเอกสารขอใช้ระบบ' };
    }
    return { valid: true }; // Logo is optional
  }

  const limits = FILE_LIMITS[type];
  const allowedTypes: string[] = [...limits.allowedTypes];
  const allowedExtensions: string[] = [...limits.allowedExtensions];

  // Check file size
  if (file.size > limits.maxSize) {
    const maxSizeMB = limits.maxSize / (1024 * 1024);
    return { valid: false, error: `ไฟล์ต้องมีขนาดไม่เกิน ${maxSizeMB}MB` };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `ประเภทไฟล์ไม่ถูกต้อง รองรับเฉพาะ ${allowedExtensions.join(', ')}`,
    };
  }

  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `นามสกุลไฟล์ไม่ถูกต้อง รองรับเฉพาะ ${allowedExtensions.join(', ')}`,
    };
  }

  // Check for suspicious file names
  if (/[<>:"|?*]/.test(file.name) || file.name.includes('..')) {
    return { valid: false, error: 'ชื่อไฟล์มีอักขระที่ไม่อนุญาต' };
  }

  return { valid: true };
}

// Validate entire registration
export function validateRegistration(
  formData: z.infer<typeof registrationFormSchema>,
  logoFile: File | null,
  documentFile: File | null
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate form data
  const formResult = registrationFormSchema.safeParse(formData);
  if (!formResult.success) {
    formResult.error.errors.forEach((err) => {
      if (err.path[0]) {
        errors[err.path[0] as string] = err.message;
      }
    });
  }

  // Validate logo file
  const logoValidation = validateFile(logoFile, 'logo');
  if (!logoValidation.valid && logoValidation.error) {
    errors.logoFile = logoValidation.error;
  }

  // Validate document file
  const documentValidation = validateFile(documentFile, 'document');
  if (!documentValidation.valid && documentValidation.error) {
    errors.documentFile = documentValidation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Type exports
export type EmailFormData = z.infer<typeof emailSchema>;
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
