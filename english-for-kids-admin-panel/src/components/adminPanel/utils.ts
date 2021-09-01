import { getCardsApi, renameCategoryApi } from '../../api/index';
import { RenameData } from '../../api/types';
import { selectAdminTopic, selectAdminMode, updateCards } from '../../redux/actions/index';
import { store } from '../../redux/core/store';
import changeLocation from '../../router/changeLocation';
import { renderAttribute, renderElement, renderInputElement } from '../../utils/render';
import { RENAME_CAT, SAVE_CAT, CATEGORY_CAP, ADMIN_PANEL, WORDS } from '../constants';
import { Cards, Data } from '../types';
import { CATEGORIES, MY_AUDIO, MY_IMAGE, WORD, WORD_AUDIO, WORD_IMG, WORD_TRANSL } from './constants';
import { updateAdminCards } from './categoriesPage/index';
import { updateAdminWords } from './wordsPage/index';

export const renameCategory = async (renameBtn: HTMLElement) => {
    
  if (renderAttribute(renameBtn) === RENAME_CAT) {
  
    renameBtn.setAttribute('id', SAVE_CAT);
    renameBtn.innerHTML = 'save';
  
    const topicName = renderElement(CATEGORY_CAP);
  
    const input = document.createElement('input');
    input.className = 'input-cap';
    input.value = topicName.innerHTML;
      
    topicName.replaceWith(input);
  } else {
  
    renameBtn.setAttribute('id', RENAME_CAT);
    renameBtn.innerHTML = 'rename';
  
    const inputCap = renderInputElement('.input-cap');
  
    const topic = document.createElement('p');
    topic.className = 'category-info-cap';
    topic.innerHTML = inputCap.value;

    const { adminTopic } = store.getState();

    const data: RenameData = {
      oldName: adminTopic,
      newName:inputCap.value,
    };
      
    await renameCategoryApi(data);
    selectAdminTopic(inputCap.value);
    const cards = await getCardsApi();
    updateCards(cards);
      
    inputCap.replaceWith(topic);
  }
};

export const showWordsPage = (mode: string, { adminTopic, hashTopic }: Data) => {
  selectAdminTopic(adminTopic);
  selectAdminMode(mode);
  changeLocation(`${ADMIN_PANEL}/${hashTopic}/${WORDS}`);
};

export const updateAdminPage = (cards: Cards) => {
  const page = window.location.hash;

  if (page.includes(CATEGORIES)) {
    updateAdminCards();
  }
  if (page.includes(WORDS)) {
    updateAdminWords();
  }
};

export const appendItem = (item: HTMLElement) => {
  const rootElement = renderElement('.container');
  rootElement.append(item);
};

export const createCard = (content: string, word: string) => {
  const item = document.createElement('div');
  item.className = 'admin-card';
  item.setAttribute('id', word);
  item.innerHTML = content;
  appendItem(item);
  return item;
};

export const createForm = () => {
  const root = document.createElement('div');
  root.className = 'form-wrapper';
  const content = `
    <div class="form">
        <div class="close-form-create"></div>
        <p class="form-cap">Create category</p>
        <div class="form-field"><span class="cat-instr">Your category name</span><input class="cat-name" type="text"></div>
        <div class="form-field"><span class="cat-instr">Your category image</span><input class="cat-file" type="file"></div>
        <input type="submit" value="Create" class="create-cat">
    </div>
            `;
  root.innerHTML = content;

  return root;
};

export const chechFormData = (form: HTMLElement) => {
    
  const inputCatName = renderInputElement('.cat-name', form);
  const inputCatImg = renderInputElement('.cat-file', form);
    
  const formData: FormData = new FormData();
    
  if (inputCatImg.files && inputCatImg.files[0]) {
    formData.append(MY_IMAGE, inputCatImg.files[0]);
  } else {
    formData.append(MY_IMAGE, '');
  }

  return {
    catName: inputCatName.value,
    formData,
  };
};

export const chechWordFormData = (form: HTMLElement) => {
    
  const inputWord = renderInputElement(WORD, form);
  const inputWordTransl = renderInputElement(WORD_TRANSL, form);
  const inputWordImg = renderInputElement(WORD_IMG, form);
  const inputWordAudio = renderInputElement(WORD_AUDIO, form);
  const { adminTopic } = store.getState();

  const imgData: FormData = new FormData();
  const audioData: FormData = new FormData();
    
  if (inputWordImg.files && inputWordImg.files[0]) {
    imgData.append(MY_IMAGE, inputWordImg.files[0]);
  } else {
    imgData.append(MY_IMAGE, '');
  }

  if (inputWordAudio.files && inputWordAudio.files[0]) {
    audioData.append(MY_AUDIO, inputWordAudio.files[0]);
  } else {
    audioData.append(MY_AUDIO, '');
  }

  const status = !!((inputWord.value && inputWordTransl.value && 
        inputWordAudio.files && inputWordAudio.files[0] &&
        inputWordImg.files && inputWordImg.files[0]));
   

  return {
    status,
    wordData: {
      category: adminTopic,
      word:inputWord.value,
      translation: inputWordTransl.value,
    },
    imgData,
    audioData,
  };
    
};

export const showMessage = () => {
  const root = renderElement('.form.form-word');
  const messageField = document.createElement('p');
  messageField.className = 'message-field';
  messageField.innerHTML = 'Please fill in all the fields';
  root.append(messageField);

  setTimeout(() => {
    messageField.remove();
  }, 3000);
};

export const checkChangeWordForm = (form: HTMLElement) => {
  const inputWord = renderInputElement(WORD, form);
  const inputTransl = renderInputElement(WORD_TRANSL, form);
  const inputImg = renderInputElement(WORD_IMG, form);
  const inputAudio = renderInputElement(WORD_AUDIO, form);
  const { adminTopic } = store.getState();

  const imgData: FormData = new FormData();
  const audioData: FormData = new FormData();
    
  if (inputImg.files && inputImg.files[0]) {
    imgData.append(MY_IMAGE, inputImg.files[0]);
  } else {
    imgData.append(MY_IMAGE, '');
  }

  if (inputAudio.files && inputAudio.files[0]) {
    audioData.append(MY_AUDIO, inputAudio.files[0]);
  } else {
    audioData.append(MY_AUDIO, '');
  }

  return {
    wordData: {
      category: adminTopic,
      word:inputWord.value,
      translation: inputTransl.value,
    },
    imgData,
    audioData,
  };
};