import { store } from '../../redux/core/store';
import { StatData } from '../../redux/core/types';
import changeLocation from '../../router/changeLocation';
import { forbideClickElement } from '../../utils/DOMutils';
import { renderElement, renderAttribute } from '../../utils/render';
import { MAIN, WIN_SOUND, LOSS_SOUND, MAIN_PAGE, CORRECT, CORRECT_CHOICE_SOUND_SRC, INCORRECT, INCORRECT_CHOICE_SOUND_SRC, CLICK, GUESS, MISTAKES } from '../constants';
import { renderWinMessage, renderLossMessage } from '../gameResultField/index';
import { Config, Card } from '../types';
import createStar from './createScoreStar';

export const playSound = (audio: string) => {
  const audioSound = new Audio(audio);
  audioSound.play();
};
  
export const showGameResult = (mistakes: number) => {
  const rootMainElement = renderElement(MAIN);
  const content = mistakes === 0 ? renderWinMessage() : renderLossMessage(mistakes);
  const soundSrc = mistakes === 0 ? WIN_SOUND : LOSS_SOUND;

  rootMainElement.innerHTML = content;
  const audioSound = new Audio(soundSrc);
  audioSound.play();

  setTimeout(() => {
    changeLocation(MAIN_PAGE);
  }, 5 * 1000);
};

export const checkChoice = (card: HTMLElement, audios: string[], gameStep: number) => {

  const cardId = renderAttribute(card);
  const audioSrc = audios[gameStep];
        
  return !!(audioSrc.match(cardId));

};

const pointCardAsCorrect = (card: HTMLElement) => {
  card.classList.add(CORRECT);
};

const addStar = (scoreField: HTMLElement, choice: string) => {
  const star = createStar(choice);
  scoreField.append(star);
};

const playSoundChoice = (src: string) => {
  const audioSrc = src;
  const audio = new Audio(audioSrc);
  audio.play();
};

export const showCorrectChoice = (card: HTMLElement) => {
  const scoreField = renderElement('.score');
  addStar(scoreField, CORRECT);
  playSoundChoice(CORRECT_CHOICE_SOUND_SRC);
  pointCardAsCorrect(card);
  forbideClickElement(card);
};

export const showIncorrectChoice = () => {
  const scoreField = renderElement('.score');
  addStar(scoreField, INCORRECT);
  playSoundChoice(INCORRECT_CHOICE_SOUND_SRC);
};

export const stopGame = (mistakes: number) => {
  setTimeout(() => {
    showGameResult(mistakes);
  }, 2 * 1000);
};

export const playGame = (audios: string[], gameStep: number) => {
  const audio = audios[gameStep];
  setTimeout(() => {
    playSound(audio);
  }, 2 * 1000);
};

export const getPersentage = (guess: number, mistakes: number) => {
  const answersSum = guess + mistakes;
  const persentage = guess / (answersSum) * 100;
  return Math.round(persentage); 
};
  
const handleClick = (statItem: StatData) => {
  const { click, persentage } = statItem;
  return {
    newData: click + 1,
    newPersentage: persentage,
  };  
};

const handleGuess = (statItem: StatData) => {
  const { guess, mistakes } = statItem;
  return {
    newData: guess + 1,
    newPersentage: getPersentage(guess + 1, mistakes),
  };   
};

const handleMistakes = (statItem: StatData) => {
  const { guess, mistakes } = statItem;
  return {
    newData: mistakes + 1,
    newPersentage: getPersentage(guess, mistakes + 1),
  };    
};

const CONFIG: Config = {
  [CLICK]: handleClick,
  [GUESS]: handleGuess,
  [MISTAKES]: handleMistakes,
};

export const getNewDataCardAction = (cardId: string, cardAction: string) => {
  const { statistics } = store.getState();
  const statItem = statistics[cardId];
  const fn = CONFIG[cardAction];
  const { newData, newPersentage } = fn(statItem);

  const data = {
    ...statItem,
    [cardAction] : newData,
    persentage: newPersentage,
  };

  return {
    key: cardId,
    data,
  };
    
};

export const renderMixedAudios = (cards: Card[]) => 
  cards.map((el) => el.audioSrc).sort(() => Math.random() - 0.5);