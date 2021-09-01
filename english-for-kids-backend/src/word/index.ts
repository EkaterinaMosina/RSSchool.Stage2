import { CARDS } from '../category/repository';
import { Card } from '../category/types';
import { WORDS } from './repository';
import { DeleteData } from './types';
import { findCategory, findWord } from './utils';

export const deleteWord = (word: string): Promise<Card> => {
  if (word) {
    const category = findCategory(word);
    if (category) {
      const words = WORDS[category];
      const deletedWord = findWord(words, word); 
      if (deletedWord) {
        const newWords = words.filter(el => el.word !== word);
        WORDS[category] = newWords;
        CARDS[category].words = newWords;
        return Promise.resolve(deletedWord);
      }
    }   
    return Promise.reject( new Error(`Word ${word} not found`));   

  } 
  return Promise.reject( new Error(`Word ${word} not found`));
    
};

export const createWord = ({ category, word, translation }: DeleteData): Promise<Card> => {
  const newWord = {
    word,
    translation,
    image: '',
    audioSrc: '',
  };
  const words = WORDS[category];
  WORDS[category] = [
    ...words,
    newWord,
  ];
  const cards = CARDS[category];
  CARDS[category] = {
    ...cards,
    words: WORDS[category],
  };
  return Promise.resolve(newWord);
};

export const addImage = (word: string, path: string) => {
  const category =  findCategory(word);
  if (category) {
    const words = WORDS[category];
    const wordToUpdated = findWord(words, word);
    const restWords = words.filter(el=>el.word !== word);
    if (wordToUpdated) {
      const updatedWord: Card = {
        ...wordToUpdated,
        image: path,
      };
      WORDS[category] = [
        ...restWords,
        updatedWord,
      ];
      const cards = CARDS[category];
      CARDS[category] = {
        ...cards,
        words: WORDS[category],
      };
      return Promise.resolve(updatedWord);
    }  
  } else {
    return Promise.reject(new Error(`Category with name ${word} does not exist`));
  }
};

export const addAudio = (word: string, path: string) => {
  const category =  findCategory(word);
  if (category) {
    const words = WORDS[category];
    const wordToUpdated = findWord(words, word);
    const restWords = words.filter(el=>el.word !== word);
    if (wordToUpdated) {
      const updatedWord: Card = {
        ...wordToUpdated,
        audioSrc: path,
      };
      WORDS[category] = [
        ...restWords,
        updatedWord,
      ];
      const cards = CARDS[category];
      CARDS[category] = {
        ...cards,
        words: WORDS[category],
      }; 
      return Promise.resolve(updatedWord);
    }
  } else {
    return Promise.reject(new Error(`Category with name ${word} does not exist`));
  }
};

export const updateWord = (oldWord: string, data: DeleteData) => {
  let wordName = oldWord;
  const { word, translation, category } = data;
  const wordsCategory = WORDS[category];
  const cardsCategory = CARDS[category];
  let newWord;
  if (word) { 
    const changedWord = wordsCategory.find(el=>el.word === wordName);
    const wordIndex = wordsCategory.findIndex(el=>el.word === wordName);
    if (changedWord) {
      changedWord.word = word;
      wordName = word;
      wordsCategory[wordIndex] = changedWord;
      const updatedWordsCategory = WORDS[category];
      CARDS[category] = {
        ...cardsCategory,
        words: updatedWordsCategory,
      };  
      newWord = changedWord;
    }
  }
  if (translation) {
    const changedWord = wordsCategory.find(el=>el.word === wordName);
    const wordIndex = wordsCategory.findIndex(el=>el.word === wordName);
    if (changedWord) {
      changedWord.translation = translation;
      wordsCategory[wordIndex] = changedWord;
      const updatedWordsCategory = WORDS[category];
      CARDS[category] = {
        ...cardsCategory,
        words: updatedWordsCategory,
      };
      newWord = changedWord;
    }
  }
  if (word || translation) {
    return Promise.resolve(newWord);
  }
    
  return Promise.reject(new Error(`Word with name ${wordName} does not exist`));
    
};