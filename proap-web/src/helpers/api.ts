const getBaseApiURL = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:3000/api';
};

const DEV_BASE_API_URL = 'http://localhost:8080/api';
// export const BASE_API_URL = DEV_BASE_API_URL; // uncomment this line to use the development API URL
export const BASE_API_URL = getBaseApiURL();
export const BASE_PDF_URL = BASE_API_URL + '/files/view-pdf/';
