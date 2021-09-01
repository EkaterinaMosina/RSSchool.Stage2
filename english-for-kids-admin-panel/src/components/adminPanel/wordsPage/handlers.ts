import { addAudioToWord, addImgToWord, changeWordDataApi, createWordApi, deleteWordApi, getCardsApi } from '../../../api/index';
import { updateCards } from '../../../redux/actions/index';
import { store } from '../../../redux/core/store';
import { renderElement, renderAudioElement, renderAttribute, renderInputElement } from '../../../utils/render';
import { CHANGE_BTN, RENAME_BTN } from '../../constants';
import { PLAY, AUDIO, WORD, WORD_TRANSL, MY_IMAGE, MY_AUDIO } from '../constants';
import { chechWordFormData, checkChangeWordForm, renameCategory, showMessage } from '../utils';
import { closeChangeWordForm, closeCreateWordForm, renderWords, showCreateWordForm, showWordChangeForm } from './index';

export const wordLisnener = (root: HTMLElement) => {

  const word = renderAttribute(root);
  const playSoundBtn = renderElement(PLAY, root);
  const audio = renderAudioElement(AUDIO, root);
  playSoundBtn.addEventListener('click', ()=> audio.play());

  const deleteBtn = renderElement('.remove-category', root);
  deleteBtn.addEventListener('click', async ()=> {

    await deleteWordApi(word);
    const cards = await getCardsApi();
    updateCards(cards); 
  });

  const changeBtn = renderElement(CHANGE_BTN, root);

  changeBtn.addEventListener('click', () => {

    const word = renderAttribute(root);
    const translation = renderElement('.span-translation', root).innerHTML;
    showWordChangeForm(word, translation);
  });
};

export const wordsPageListeners = () => {
  const renameBtn = renderElement(RENAME_BTN);
  renameBtn.addEventListener('click', () => renameCategory(renameBtn));

  const rootElement = renderElement('.container');
  rootElement.addEventListener('scroll', function () {
        
    if (rootElement.scrollTop + rootElement.clientHeight >= rootElement.scrollHeight) {
      renderWords();
    }
  });

  addWordBtnListener();

};

export const addWordBtnListener = () => {
  const rootElement = renderElement('.container');
  const addWordBtn = renderElement('.admin-card-add', rootElement);
  addWordBtn.addEventListener('click', () => showCreateWordForm());
};

export const listenCreateWordForm = (form: HTMLElement) => {
  const closeBtn = renderElement('.close-form-create', form);
  closeBtn.addEventListener('click', () => closeCreateWordForm());

  const formWord = renderElement('.form', form);
  const formBtn = renderElement('.create-cat', formWord);
  formBtn.addEventListener('click', async (e)=> {
    const { status, wordData, imgData, audioData } = chechWordFormData(form);
    if (!status) {
      showMessage();
    } else {
      const { word } = wordData;
      await createWordApi(wordData);
      await addImgToWord(word, imgData);
      await addAudioToWord(word, audioData);

      const cards = await getCardsApi();
      updateCards(cards);

      closeCreateWordForm();
    }
  });
};

export const listenChangeWordForm = (form: HTMLElement) => {
  const inputWord = renderInputElement(WORD, form);
  const inputTransl = renderInputElement(WORD_TRANSL, form);
  const oldWord = inputWord.value;
  const oldTransl = inputTransl.value;

  const closeBtn = renderElement('.close-form-create', form);
  closeBtn.addEventListener('click', () => closeChangeWordForm());

  const submitBtn = renderElement('.create-cat', form);
  submitBtn.addEventListener('click', async ()=> {
    const { wordData, imgData, audioData } = checkChangeWordForm(form);
    const { word, translation, category } = wordData;
    const newData = {
      word: '',
      translation: '',
      category,
    };
    if (oldWord !== word ) {
      newData.word = word;
    }
    if (oldTransl !== translation) {
      newData.translation = translation;
    }
    if (newData.word || newData.translation) {
      await changeWordDataApi(oldWord, newData);
    }
    if (imgData.get(MY_IMAGE)) {
      if (oldWord !== word) {
        await addImgToWord(newData.word, imgData);
      } else {
        await addImgToWord(oldWord, imgData);
      }
    }
    if (audioData.get(MY_AUDIO)) {
      if (oldWord !== word) {
        await addAudioToWord(newData.word, audioData);
      } else {
        await addAudioToWord(oldWord, audioData);
      }
    }

    const cards = await getCardsApi();
    updateCards(cards);
    closeChangeWordForm();
  });
};