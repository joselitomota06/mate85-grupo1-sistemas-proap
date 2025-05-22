const getBaseApiURL = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:3000/api';
};

export const BASE_API_URL = getBaseApiURL();
export const BASE_PDF_URL = BASE_API_URL + '/files/view-pdf/';
