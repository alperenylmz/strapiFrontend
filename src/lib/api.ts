export function getStrapiURL(path: string = ""): string {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
  }
  
  // Helper to make GET requests to Strapi
  export async function fetchAPI<T>(path: string): Promise<T> {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data: T = await response.json();
    return data;
  }