import { renderCardsFieldContent } from '../cardsField/index';
import {  DIFF_WORDS } from '../constants';
import { appendContent } from '../../utils/index';
import { renderDiffWords } from '../statictics/utils';

export default function showDiffWordsPage()  {
    
  const cards = renderDiffWords();
  const content = renderCardsFieldContent(DIFF_WORDS, cards);
  appendContent(content);
}