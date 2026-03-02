import { fetchDataApi } from './api';

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  status: 'new' | 'pending' | 'approved';
  email: string;
  message?: string;
}

export interface RegistrationFormData {
  inst_email: string;
  inst_password: string;
  inst_name_th: string;
  inst_name_en: string;
  inst_abbr_th: string;
  inst_abbr_en: string;
  inst_type: string;
  inst_phone: string;
  website: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postal_code: string;
  logo_url?: string;
  docs_url?: string;
  flag_valid?: boolean;
  [key: string]: any;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
}

export interface SearchInstitutionParams {
  inst_email?: string;
  inst_name_th?: string;
  inst_name_en?: string;
  inst_type?: string;
  province?: string;
  [key: string]: any;
}

export interface InstitutionData {
  id: number;
  inst_email: string;
  inst_name_th: string;
  inst_name_en: string;
  inst_abbr_th: string;
  inst_abbr_en: string;
  inst_type: string;
  inst_phone: string;
  website: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postal_code: string;
  logo_url?: string;
  docs_url?: string;
  flag_valid?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginInstitutionRequest {
  inst_email: string;
  inst_password: string;
}

export interface LoginInstitutionResponse {
  access_token: string;
  institution?: InstitutionData;
}

/**
 * GET /institution
 * ค้นหาสถาบันตามเงื่อนไขที่กำหนด
 */
export const searchInstitution = async (params: SearchInstitutionParams = {}) => {
  const data = await fetchDataApi('GET', 'institution', params);
  return data;
};

/**
 * GET /institution - ตรวจสอบ email
 * Request: { inst_email }
 * Response:
 * - data: [] → email ยังไม่มี (ใหม่) → ไป step 2
 * - data: [{...}] → email มีอยู่ → ไป step 3 หรือ 4
 */
export const verifyEmail = async (email: string) => {
  const data = await fetchDataApi('GET', 'institution', {
    inst_email: email,
  });
  return data;
};

/**
 * GET /institution/:id
 * ดึงข้อมูลสถาบันตาม ID
 */
export const getInstitutionById = async (id: number) => {
  const data = await fetchDataApi('GET', `institution/${id}`, {});
  return data;
};

/**
 * GET /institution/detail/:id
 * ดึงข้อมูลสถาบันพร้อมรายละเอียดตาม ID
 */
export const getInstitutionDetailById = async (id: number) => {
  const data = await fetchDataApi('GET', `institution/detail/${id}`, {});
  return data;
};

/**
 * POST /institution
 * สร้างสถาบันใหม่ (ลงทะเบียน)
 */
export const submitRegistration = async (formData: RegistrationFormData) => {
  const body = {
    ...formData,
    inst_password: formData.inst_password || 'tempPassword',
  };
  const data = await fetchDataApi('POST', 'institution', body);
  return data;
};

/**
 * PUT /institution/:id
 * อัปเดตข้อมูลสถาบัน
 */
export const updateInstitution = async (id: number, formData: Partial<RegistrationFormData>) => {
  const data = await fetchDataApi('PUT', `institution/${id}`, formData);
  return data;
};

/**
 * GET /institution - ตรวจสอบสถานะการลงทะเบียน
 * ใช้ endpoint เดียวกับ verifyEmail
 */
export const checkRegistrationStatus = async (email: string) => {
  const data = await fetchDataApi('GET', 'institution', { inst_email: email });
  return data;
};

/**
 * GET /institution - ดึงข้อมูลการลงทะเบียนสำหรับแสดงผล
 * ใช้ endpoint เดียวกับ verifyEmail
 */
export const getRegistrationData = async (email: string) => {
  const data = await fetchDataApi('GET', 'institution', { inst_email: email });
  return data;
};

/**
 * POST /institution/login
 * เข้าสู่ระบบสถาบัน
 */
export const loginInstitution = async (credentials: LoginInstitutionRequest): Promise<LoginInstitutionResponse> => {
  const data = await fetchDataApi('POST', 'institution/login', credentials);
  return data;
};

export const uploadFile = async (files: File, fileType: 'logo' | 'document') => {
  const endpoint = fileType === 'logo'
    ? 'file-storage/upload/institution/logo'
    : 'file-storage/upload/institution/docs';

  const formData = new FormData();
  formData.append('files', files);

  const data = await fetchDataApi('POST', endpoint, formData);
  return data;
};