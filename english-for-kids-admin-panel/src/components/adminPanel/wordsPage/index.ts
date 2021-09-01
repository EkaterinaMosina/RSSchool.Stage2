import { store } from '../../../redux/core/store';
import { changeActiveAdminRout } from '../../../utils/DOMutils';
import { renderElement } from '../../../utils/render';
import { ADMIN_MAIN, APP } from '../../constants';
import { createCard } from '../utils';
import { addWordBtnListener, listenChangeWordForm, listenCreateWordForm, wordLisnener } from './handlers';

export const INDEX = {
  wordIndex: 0,
};

const renderWordsPage = (adminTopic: string, adminMode: string) => `
        <div class="category-info ${adminMode}">
            <p class="category-info-cap">${adminTopic}</p>
            <div class="category-info-btn" id="cat-rename">rename</div>
        </div>
        <div class="container ${adminMode}">
            <div class="admin-card-add">
                <p>add new word</p>
                <div class="create-ico"></div>
            </div>
        </div>
`;
export const renderWords = () => {
  const { adminTopic, cards: cardsStore } = store.getState();

  for (let i = 0; i < 4; i++) {
     
    const cards =  cardsStore[adminTopic];
    if (INDEX.wordIndex > cards.words.length - 1) return;
    const { word, translation, image, audioSrc } = cards.words[INDEX.wordIndex];
        
    const context = `
            <div class="remove-category"></div>
            <p>word: <span class="span span-word">${word}</span></p>
            <p>translation: <span class="span span-translation">${translation}</span></p>
            <div class='sound-place'><span>sound file:</span><div class="play"><audio class="audio" src="${audioSrc}"></audio></div></div>
            <p>image: <img class="word-img"src="${image}" alt=""></p>
            <div class="btn-container">
                <div class="admin-btn" id="word-change">change</div>
            </div>`;

    const item = createCard(context, word);
    wordLisnener(item);

    INDEX.wordIndex++;
        
  }
}; 
export const showAdminWordsPage = () => {
  changeActiveAdminRout();
  const rootElement = renderElement(ADMIN_MAIN);
  const { adminTopic, adminMode } = store.getState();
  const content = renderWordsPage(adminTopic, adminMode);
  rootElement.innerHTML = content;
  INDEX.wordIndex = 0;
  renderWords();
};

export const createAddWordForm = () => {
  const rootElement = renderElement('.form');
  const addWordForm = document.createElement('div');
  addWordForm.className = 'word-field';
  const content = `
    <div class="word-form">
        <input type="text" name="word" id="create-word" placeholder="word">
        <input type="text" name="trans" id="create-transl" placeholder="translation">
        <input type="file" name="img" id="create-img" title="Image for your word">
        <input type="file" name="audio" id="create-audio" title="Audio for your word">
    </div>`;
  addWordForm.innerHTML = content;
  rootElement.append(addWordForm);
};

export const updateAdminWords = () => {
  const content = 
        `<div class="admin-card-add">
            <p>add new word</p>
            <div class="create-ico"></div>
        </div>`;
  const rootElement = renderElement('.container');
  rootElement.innerHTML = content;  
  INDEX.wordIndex = 0;
  addWordBtnListener();
  renderWords();
};

export const createWordForm = () => {
  const root = document.createElement('div');
  root.className = 'form-wrapper';
  const content = `
   
    <div class="form form-word">
        <div class="close-form-create"></div>
        <p class="form-cap">Create word</p>
        <div class="form-field"><span class="cat-instr">Your word</span><input id="create-word" class="cat-name" type="text"></div>
        <div class="form-field"><span class="cat-instr">Translation</span><input id="create-transl" class="cat-name" type="text"></div>
        <div class="form-field"><span class="cat-instr">Your word image</span><input id="create-img" class="cat-file" type="file"></div>
        <div class="form-field"><span class="cat-instr">Your word sound</span><input id="create-audio" class="cat-file" type="file"></div>
        <input type="submit" value="Create" class="create-cat">
    </div>
            `;
  root.innerHTML = content;
  return root;
};

export const showCreateWordForm = () => {
  const form = createWordForm();
  const rootElement = renderElement(APP);
  rootElement.append(form);

  listenCreateWordForm(form);
};

export const closeCreateWordForm = () => {
  const createForm = renderElement('.form-wrapper');
  createForm.remove();
};

export const createWordChangeForm = (word: string, translatiion: string) => {
  const root = document.createElement('div');
  root.className = 'form-wrapper';
  const content = `
   
    <div class="form form-word">
        <div class="close-form-create"></div>
        <p class="form-cap">Update word (${word})</p>
        <div class="form-field"><span class="cat-instr">Word</span><input id="create-word" class="cat-name" type="text" value="${word}"></div>
        <div class="form-field"><span class="cat-instr">Translation</span><input id="create-transl" class="cat-name" type="text" value="${translatiion}"></div>
        <div class="form-field"><span class="cat-instr">Word image</span><input id="create-img" class="cat-file" type="file"></div>
        <div class="form-field"><span class="cat-instr">Word sound</span><input id="create-audio" class="cat-file" type="file"></div>
        <input type="submit" value="Update" class="create-cat">
    </div>
            `;
  root.innerHTML = content;
  return root;
};

export const showWordChangeForm = (word: string, translatiion: string) => {
  const form = createWordChangeForm(word, translatiion);
  const rootElement = renderElement(APP);
  rootElement.append(form);

  listenChangeWordForm(form);
};

export const closeChangeWordForm = () => {
  const createForm = renderElement('.form-wrapper');
  createForm.remove();
};