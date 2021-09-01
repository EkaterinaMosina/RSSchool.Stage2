import { DIFF_WORDS_PAGE, TABLE_HEAD } from '../constants';
import changeLocation from '../../router/changeLocation';

import { annulStatistics, appendSortedStatData } from './utils';
import { renderElement } from '../../utils/render';
import { selectTopic } from '../../redux/actions/index';

export default function statsListeners() {
  const tableHead = renderElement(TABLE_HEAD);
  const diffWordsButton = renderElement('.btn-diff-words-wrapper');
  const resetButton = renderElement('.btn-reset-wrapper');

  tableHead.addEventListener('click', (e)=> appendSortedStatData(e));

  diffWordsButton.addEventListener('click', () => {
    selectTopic(' ');
    changeLocation(DIFF_WORDS_PAGE);
  });

  resetButton.addEventListener('click', () => annulStatistics());
}