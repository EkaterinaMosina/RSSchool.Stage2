import { Data } from '../components/types';
import { DeleteData, RenameData } from './types';

const getFetch = (url: string, method: string, data: Data | RenameData | DeleteData) =>
  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

const getFetchWithoutData = (url: string, method: string) => fetch(url, { method });
const getFetchWithoutHeaders = (url: string, method: string, data: FormData) => 
  fetch(url, { method, body: data });

export const smartFetch = {
  get: getFetchWithoutData,
  delete: getFetchWithoutData,
  put: getFetch,
  post: getFetchWithoutData,
  postData: getFetch,
  postUpload: getFetchWithoutHeaders,
};