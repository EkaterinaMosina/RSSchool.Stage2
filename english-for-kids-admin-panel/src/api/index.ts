import { Data } from '../components/types';
import { DELETE, GET, getUrlCategoriesName, getUrlCategoriesUpload, getUrlWordsName, getUrlWordsUploadAudio, getUrlWordsUploadImg, POST, PUT, URL_ADMIN_BASE, URL_CATEGORIES_BASE,  URL_WORDS_BASE } from './constants';
import { DeleteData, RenameData } from './types';
import { smartFetch } from './utils';

/* CATEGORIES */

export const getCardsApi = async () => {

  const res = await smartFetch.get(URL_CATEGORIES_BASE, GET);
  return res.json();
};

export const deleteCategoryApi = async (name: string) => {

  const res = await smartFetch.delete(getUrlCategoriesName(name), DELETE);
  return res.json();
};

export const renameCategoryApi = async (data: RenameData) => {

  const res = await smartFetch.put(URL_CATEGORIES_BASE, PUT, data);
  return res.json();
};

export const createCategoryApi = async (categoryName: string) => {

  const res = await smartFetch.post(getUrlCategoriesName(categoryName), POST);
  return res.json();
};

export const addImgToCategory = async (data: FormData, categoryName: string) => {
    
  const res = await smartFetch.postUpload(getUrlCategoriesUpload(categoryName), POST, data);
  return res.json();
};

/* WORDS */

export const deleteWordApi = async ( word: string ) => {

  const res = await smartFetch.delete(getUrlWordsName(word), DELETE);
  return res.json();
};

export const createWordApi = async (data: Data) => {
    
  const res = await smartFetch.postData(URL_WORDS_BASE, POST, data);
  return res.json();
};

export const addImgToWord = async (word: string, imgData: FormData) => {

  const res = await smartFetch.postUpload(getUrlWordsUploadImg(word), POST, imgData);
  return res.json();
};

export const addAudioToWord = async (word: string, audioData: FormData) => {

  const res = await smartFetch.postUpload(getUrlWordsUploadAudio(word), POST, audioData);
  return res.json();
};

export const changeWordDataApi = async (word: string, data: DeleteData) => {

  const res = await smartFetch.put(getUrlWordsName(word), PUT, data);
  return res.json();
};

export const chechAdminData = async (data: Data) => {
    
  const res = await smartFetch.postData(URL_ADMIN_BASE, POST, data);
  return res.json(); 
};