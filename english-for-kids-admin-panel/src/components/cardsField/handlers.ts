import { AUDIO, CARD_CONTAINER, CLICK, FLIPP, GUESS, INIT_GAME_STEP, MISTAKES, PLAY, REPEAT_BUTTON, START_BUTTON } from '../constants';
import {
  allowClickElement,
  allowClickElements,
  changeButton,
  flippToBack,
  flippToFront,
  forbideClickElement,
  forbideClickElements,
} from '../../utils/DOMutils';
import { addCardAction } from '../../redux/actions/index';
import { TRAIN_MODE } from '../../redux/constants';
import { store } from '../../redux/core/store';
import { renderDiffWords } from '../statictics/utils';
import { renderElements, renderAttribute, renderElement, renderAudioElement } from '../../utils/render';
import { getNewDataCardAction, renderMixedAudios, playGame, checkChoice, showCorrectChoice, stopGame, showIncorrectChoice } from './utils';

export const trainCardsListeners = () => {
  const cards = renderElements(CARD_CONTAINER);

  cards.forEach((el) => {
    const card = el as HTMLElement;
    const cardId = renderAttribute(card);
    const buttonFlipp = renderElement(FLIPP, card);
    const buttonSound = renderElement(PLAY, card);
    const audio = renderAudioElement(AUDIO, card);

    buttonFlipp.addEventListener('click', () => {
      
      flippToBack(card);

      card.addEventListener('mouseleave', () => {
        flippToFront(card);
      });
    });

    buttonSound.addEventListener('click', () => {

      audio.play();

      const NewDataCardAction = getNewDataCardAction(cardId, CLICK);
      addCardAction(NewDataCardAction);
    });
  });
};

export const playCardsListeners = () => {
  const startButton = renderElement(START_BUTTON);
  const repeatButton = renderElement(REPEAT_BUTTON);
  const gameCards = renderElements(CARD_CONTAINER);

  let audios: string[];
  let gameStep: number;
  let mistakes: number;
  let cardsQuantity: number;

  forbideClickElements(gameCards);

  startButton.addEventListener('click', () => {
    changeButton(startButton, repeatButton);

    const { topic, cards:cardsStore } = store.getState();

    const cards = (topic === ' ') ? renderDiffWords() : cardsStore[topic].words;
    cardsQuantity = cards.length;
    audios = renderMixedAudios(cards);
    gameStep = INIT_GAME_STEP;
    mistakes = INIT_GAME_STEP;
    
    playGame(audios, gameStep);
    allowClickElements(gameCards);
  });

  const cards = renderElements(CARD_CONTAINER);

  cards.forEach((el) => {
    const card = el as HTMLElement;
    const cardId = renderAttribute(card);

    card.addEventListener('click', () => {

      const choice = checkChoice(card, audios, gameStep);

      if (choice) {

        showCorrectChoice(card);
        const NewDataCardAction = getNewDataCardAction(cardId, GUESS);
        addCardAction(NewDataCardAction);
        gameStep += 1;
        if (gameStep === cardsQuantity) {
          stopGame(mistakes);
        } else {
          playGame(audios, gameStep);
        }

      } else {

        showIncorrectChoice();
        const NewDataCardAction = getNewDataCardAction(cardId, MISTAKES);
        addCardAction(NewDataCardAction);
        mistakes += 1;
      }
    });
  });

  repeatButton.addEventListener('click', () => {
    forbideClickElement(repeatButton);
    const audio = audios[gameStep];
    const audioPlay = new Audio(audio);
    audioPlay.play();

    audioPlay.addEventListener('ended', () => {
      allowClickElement(repeatButton);
    });
    
  });
};

export const cardsFieldListeners = () => {
  const { mode } = store.getState();

  if (mode === TRAIN_MODE) {
    trainCardsListeners();
  } else {
    playCardsListeners();
  }

};


