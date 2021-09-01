import { addImgToCategory, createCategoryApi, deleteCategoryApi, getCardsApi } from '../../../api/index';
import { addStatisctics, updateCards } from '../../../redux/actions/index';
import { store } from '../../../redux/core/store';
import changeLocation from '../../../router/changeLocation';
import { renderElement } from '../../../utils/render';
import initApp from '../../app/initApp';
import { ACTIVE, ADMIN_CHANGE_MODE, ADMIN_NAV_EL, ADMIN_PAGE, ADMIN_VIEW_MODE,  MAIN_PAGE_HUSH } from '../../constants';
import headerListeners from '../../header/handlers';
import {  Data } from '../../types';
import { appendAdminCards, showCreateCategoryForm, closeCreateCategoryForm } from './index';
import { chechFormData, showWordsPage } from '../utils';
import { renderStatisctics } from '../../../redux/utils';
import { Statistics } from '../../../redux/core/types';

export const adminListeners = () => {
  const adminNavEl = renderElement(ADMIN_NAV_EL);

  adminNavEl.addEventListener('click', () => {
    adminNavEl.classList.add(ACTIVE);
    changeLocation(ADMIN_PAGE);
  });

  const logout = renderElement('.logout');
  logout.addEventListener('click', ()=> {
    const { cards } = store.getState();

    const statData = renderStatisctics(cards);
    if (statData.length !== 0) {
      addStatisctics(statData as Statistics);
    } else {
      addStatisctics({});
    }
        
    localStorage.removeItem('katundra');    
    initApp();
    headerListeners();
    window.location.hash = MAIN_PAGE_HUSH;
  });

  const rootElement = renderElement('.container');
  rootElement.addEventListener('scroll', function () {
    if (rootElement.scrollTop + rootElement.clientHeight >= rootElement.scrollHeight) {
      appendAdminCards();
    }
  });

  listenAddCategory();
};

export const categoryListener = (root: HTMLElement) => {
  const adminTopic = renderElement('.admin-card-name', root).innerHTML;
  const hashTopic = adminTopic.toLowerCase().split(' ').join('-');

  const params: Data = {
    adminTopic,
    hashTopic,
  };

  const viewBtn = renderElement('.admin-btn-view', root);
  const changeBtn = renderElement('.admin-btn-change', root);
  const deleteBtn = renderElement('.remove-category', root);
  const url = adminTopic.split(' ').join('-');

  viewBtn.addEventListener('click', () => showWordsPage(ADMIN_VIEW_MODE, params));
  changeBtn.addEventListener('click', () => showWordsPage(ADMIN_CHANGE_MODE, params));
  deleteBtn.addEventListener('click', async ()=> {

    await deleteCategoryApi(url);
    const cards = await getCardsApi();
    updateCards(cards); 
  });
};

export const listenAddCategory = () => {
  const addCatBtn = renderElement('.admin-card-add');
  addCatBtn.addEventListener('click', ()=> {
    showCreateCategoryForm();
  });
};

export const listenCreateCategoryForm = (rootElement: HTMLElement) => {
    
  const closeBtn = renderElement('.close-form-create', rootElement);
  closeBtn.addEventListener('click', () => closeCreateCategoryForm());

  const form = renderElement('.form', rootElement);
  const formBtn = renderElement('.create-cat', form);
  formBtn.addEventListener('click', async (e)=> {
    e.preventDefault();
    const { catName, formData } = chechFormData(form);
       
    await createCategoryApi(catName);
    if (formData.get('myImage')) {
      await addImgToCategory(formData, catName);
    }
        
    const cards = await getCardsApi();
    updateCards(cards);
    closeCreateCategoryForm();
  });
};