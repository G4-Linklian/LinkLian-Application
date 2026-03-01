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

/**
 * Request: { inst_email }
 * Response:
 * - data: [] → email ยังไม่มี (ใหม่) → ไป step 2
 * - data: [{...}] → email มีอยู่ → ไป step 3 หรือ 4
 */
export const verifyEmail = async (email: string) => {
  const data = await fetchDataApi('POST', 'institution.get', {
    inst_email: email,
  });
  return data;
};

export const submitRegistration = async (formData: RegistrationFormData) => {
  const body = {
    ...formData,
    inst_password: formData.inst_password || 'tempPassword',
  };
  const data = await fetchDataApi('POST', 'institution.create', body);
  return data;
};

export const checkRegistrationStatus = async (email: string) => {
  const data = await fetchDataApi('GET', 'auth/registration-status', { email });
  return data;
};

/**
 * ดึงข้อมูลการลงทะเบียนสำหรับแสดงผล
 */
export const getRegistrationData = async (email: string) => {
  const data = await fetchDataApi('GET', 'auth/registration-data', { email });
  return data;
};

export const uploadFile = async (files: File, fileType: 'logo' | 'document') => {
  const endpoint = fileType === 'logo'
    ? 'uploadFile/institution/logo'
    : 'uploadFile/institution/docs';

  const formData = new FormData();
  formData.append('files', files);

  const data = await fetchDataApi('POST', endpoint, formData);
  return data;
};