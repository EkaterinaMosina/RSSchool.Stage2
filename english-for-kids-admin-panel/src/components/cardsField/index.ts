import { Card } from '../types';
import { appendContent } from '../../utils/index';

const renderCard = (cards: Card[]) =>
  cards.map(
    ({ word, translation, image, audioSrc }) =>
      `
    <div class="card-container" id="${word}">
                    <div class="card">
                        <div class="card-front">
                            <img class="card-img" src=${image}>
                            <div class="card-info">
                                <div class="card-content">
                                    <div class="play">
                                    <audio class="audio" src="${audioSrc}"></audio>
                                    </div>
                                    <p class="name">${word}</p>
                                    <div class="flipp"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-back">
                            <img class="card-img" src=${image}>
                            <div class="card-info">
                                <p class="name">${translation}</p>
                            </div>
                        </div>
                    </div>
                </div>
    `,
  )
    .join('');

export const renderCardsFieldContent = (topic: string, cards: Card[]) => `
    <div class="field">
        <div class="info-field">
            <div class="info-wrapper">
                <h2 class="cap">${topic}</h2>
                <div class="start-button">
                    <div class="button-wrapper">
                        <div class="button-ico"></div>
                        <span class="button-text">Start</span>
                    </div>
                </div>
                <div class="repeat-button hidden visuallyhidden">
                    <div class="button-wrapper">
                        <span class="button-text">Repeat</span>
                        <div class="button-ico"></div>
                    </div>
                </div>
            </div>
            <div class="score"></div>
        </div>
        <div class="cards-field">
        ${renderCard(cards)}
        </div>
    </div>

`;

export const renderCardsField =  (topic: string, cards: Card[]) => {
  const content = renderCardsFieldContent(topic, cards);
  appendContent(content);
};