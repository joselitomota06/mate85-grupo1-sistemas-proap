import { toast, ToastOptions } from 'react-toastify';

class Toast {
  success(message: string, options: ToastOptions = {}) {
    toast.success(message, options);
  }

  error(message: string, options: ToastOptions = {}) {
    toast.error(message, options);
  }
}

export default new Toast();
