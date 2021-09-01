export const PORT = 'https://piscine-livre-08938.herokuapp.com';
export const CATEGORIES = 'categories';
export const WORDS = 'words';
export const ADMIN = 'admin';
export const POST = 'POST';
export const PUT = 'PUT';
export const GET = 'GET';
export const DELETE = 'DELETE';

export const URL_CATEGORIES_BASE = `${PORT}/api/${CATEGORIES}`;
export const getUrlCategoriesName = (name: string) => `${URL_CATEGORIES_BASE}/${name}`;
export const getUrlCategoriesUpload = (name: string) => `${URL_CATEGORIES_BASE}/apload/${name}`;

export const URL_WORDS_BASE = `${PORT}/api/${WORDS}`;
export const getUrlWordsName = (name: string) => `${URL_WORDS_BASE}/${name}`;
export const getUrlWordsUploadImg = (name: string) => `${URL_WORDS_BASE}/upload-img/${name}`;
export const getUrlWordsUploadAudio = (name: string) => `${URL_WORDS_BASE}/upload-audio/${name}`;

export const URL_ADMIN_BASE = `${PORT}/api/${ADMIN}`;