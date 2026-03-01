type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Helper function to build query string from object
function buildQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `?${query}` : '';
}

export async function fetchDataApi(
  method: RequestMethod,
  endpoint: string,
  body: any = {}
): Promise<any> {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const basePath = import.meta.env.VITE_BASE_PATH || '/v1';

  if (!baseUrl) {
    throw new Error('VITE_BASE_URL ไม่ได้ถูกกำหนด ตรวจสอบ .env ไฟล์');
  }

  try {
    let url = `${baseUrl}${basePath}/${endpoint}`;

    if (method === 'GET' && Object.keys(body).length > 0) {
      url += buildQueryString(body);
    }

    const isFormData = body instanceof FormData;

    const response = await fetch(url, {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body:
        method !== 'GET'
          ? isFormData
            ? body
            : JSON.stringify(body)
          : undefined,
    });

    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      console.error("Server response is not JSON:", text);
      throw new Error(`Invalid JSON: ${text}`);
    }

  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}
