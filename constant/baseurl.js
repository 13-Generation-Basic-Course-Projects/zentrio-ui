export const apiConfig = {
  // Use environment variable for API URL with fallbacks
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 
           process.env.NODE_ENV === 'production' 
             ? 'https://kshrd.zentrio.pro/api/v1'  // Your production domain
             : 'http://localhost:8080/api/v1',
};
