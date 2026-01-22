const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_BASE_PATH || '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}


export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${API_PATH}${endpoint}`;

  console.log('API Call:', { url, method: options.method || 'GET' });

  try {
    if (!BASE_URL) {
      throw new Error('BASE_URL ไม่ได้ถูกกำหนด ตรวจสอบ .env ไฟล์');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // อ่าน response text ก่อน
    const responseText = await response.text();
    console.log('📨 Response Status:', response.status, 'Body:', responseText);

    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      return {
        success: false,
        error: `ข้อผิดพลาด: Response ไม่ใช่ JSON (${response.status})`,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Error: ${response.status}`,
        data: data,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('🚨 API Error:', errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}


export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: 'GET',
  });
}


export async function apiPost<T>(
  endpoint: string,
  body: Record<string, any>
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}


export async function apiPut<T>(
  endpoint: string,
  body: Record<string, any>
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}


export async function apiDelete<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: 'DELETE',
  });
}
