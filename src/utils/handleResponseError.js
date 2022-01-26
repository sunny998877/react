import { notification } from './notification';

export const handleResponseError = (data = {}, cb = () => {}) => {
  console.log(`handle`, { data, cb });
  if (data.status === 0) {
    if (data.message !== Array) {
      return notification.error(data.message);
    }
    return data.error.map((error) => notification.error(error?.msg));
  }

  if (data.message !== Array) {
    notification.success(data.message);
    cb();
    return data;
  }
  data.error.map((error) => notification.success(error?.msg));
  cb();
  return data;
};
