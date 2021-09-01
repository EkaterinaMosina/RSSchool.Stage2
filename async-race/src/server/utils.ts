import { WinnerServer, WinnerUpdate } from '../interfaces';

export const getHeaders = (response: Response)=> 
  response.headers.get('X-Total-Count');

export const renderStatusDrive = (id: number) => `?id=${id}&status=drive`;

export const renderStatusStarted = (id: number) => `?id=${id}&status=started`;

export const renderStatusStopped = (id: number) => `?id=${id}&status=stopped`;

export const renderPageLimitParams = (page: number, limit: number) => `?_page=${page}&_limit=${limit}`;

export const renderMethodPost = (object: Object | WinnerServer) => {
  return {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const renderMethodPut = (object: Object | WinnerUpdate) => {
  return {
    method: 'PUT',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
    
  
