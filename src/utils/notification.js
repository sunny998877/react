import { toast } from 'react-toastify';

const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

export const notification = {
  success: (msg) => toast.success(msg, options),
  error: (msg) => toast.error(msg, options)
};
