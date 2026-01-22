import { apiPost, apiGet } from './api';

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
 * - success: true, data: { data: [] } → email ยังไม่มี (ใหม่) → ไป step 2
 * - success: true, data: { data: [{...}] } → email มีอยู่ → ไป step 3 หรือ 4
 */
export async function verifyEmail(email: string) {
  return apiPost<any>('/institution.get', { 
    inst_email: email
  });
}


export async function submitRegistration(formData: RegistrationFormData) {
  // ตั้ง password เป็น "tempPassword" ถ้ายังไม่มี
  const data = {
    ...formData,
    inst_password: formData.inst_password || 'tempPassword'
  };
  return apiPost<RegistrationResponse>('/institution.create', data);
}


export async function checkRegistrationStatus(email: string) {
  return apiGet<RegistrationResponse>(`auth/registration-status?email=${email}`);
}

/**
 * ดึงข้อมูลการลงทะเบียนสำหรับแสดงผล
 */
export async function getRegistrationData(email: string) {
  return apiGet(`auth/registration-data?email=${email}`);
}


export async function uploadFile(files: File, fileType: 'logo' | 'document') {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://uat-api.linklian.org';
  const apiPath = import.meta.env.VITE_BASE_PATH || '/api';
  
  const endpoint = fileType === 'logo' 
    ? 'uploadFile/institution/logo' 
    : 'uploadFile/institution/docs';
  
  const url = `${baseUrl}${apiPath}/${endpoint}`;

  try {
    console.log('Uploading File with FormData:', { 
      fileName: files.name, 
      fileType, 
      size: files.size,
      type: files.type,
      url 
    });

    const formData = new FormData();
    formData.append('files', files); 

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload Error:', response.status, errorText);
      return {
        success: false,
        error: `Upload failed (${response.status}): ${errorText}`,
        data: null
      };
    }

    const data = await response.json();
    console.log('✅ File Uploaded:', data);

    if (data.success && data.files && data.files.length > 0) {
      return {
        success: true,
        data: {
          fileUrl: data.files[0].fileUrl,
          originalName: data.files[0].originalName,
          fileType: data.files[0].fileType,
          fileName: data.files[0].fileName,
        },
        error: null
      };
    }

    return {
      success: true,
      data: data,
      error: null
    };
  } catch (error) {
    console.error('Upload Exception:', error);
    return {
      success: false,
      error: `Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: null
    };
  }
}