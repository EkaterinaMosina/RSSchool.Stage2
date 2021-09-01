import { StatData } from '../../redux/core/types';
import { renderElement } from '../../utils/render';
import { appendContent } from '../../utils/index';
import { getStatisticsData, renderSortedStatData } from './utils';

export const renderStatisticsItems = (data: StatData[]) => {
  return data.map( ({ word, translation, category, click, guess, mistakes, persentage }: StatData) => {

    return `
        <tr>
            <td>${word}</td>
            <td>${translation}</td>
            <td>${category}</td>
            <td>${click}</td>
           <td>${guess}</td>
           <td>${mistakes}</td>
           <td>${persentage}</td>
        </tr>
        `;
  },
        
  ).join('');
};

const renderStatisticsContent = (data: StatData[]) => `
<div class="stat-wrapper">
      <div class="btns-wrapper">
        <div class="btn-wrapper btn-diff-words-wrapper" 
            data-title="Words for which mistakes were made and the percentage of correct answers is less than 25%">
            <div class="btn-diff-words">REPEAT<br>difficult words</div>
        </div>
        <div class="btn-wrapper btn-reset-wrapper"
        data-title="Pressing the button will reset the statistics">
            <div class="btn-reset">RESET</div>
        </div>        
    </div>

<div class="table-wrapper">
    <table class="table" >
        <thead class="table-head">
            <tr>
                <th id="word"  class="table-head-el">Word</th>
                <th id="translation"  class="table-head-el">Translation<div class="sort-ico"></div></th>
                <th id="category"  class="table-head-el">Category<div class="sort-ico"></div></th>
                <th id="click"  class="table-head-el">Train-mode<br>(click)</Train-mode><div class="sort-ico"></div></th>
                <th id="guess"  class="table-head-el">Play-mode<br>(correct)</Play-mode><div class="sort-ico"></div></th>
                <th id="mistakes"  class="table-head-el">Play-mode<br>(incorrect)</Play-mode><div class="sort-ico"></div></th>
                <th id="persentage"  class="table-head-el">%<div class="sort-ico"></div></th>
            </tr>
        </thead>
        <tbody class="table-body">
        ${renderStatisticsItems(data)}
        </tbody>
    </table>
</div>
</div>
`;

export const renderStatisticsPage = () => {
  const data = getStatisticsData();
  const content = renderStatisticsContent(data);
  appendContent(content);
};

export const renderSortedStatisticsPage = (sort: string, order: string) => {
  const data = renderSortedStatData(sort, order);
  const content = renderStatisticsContent(data);
  appendContent(content);
  const activeElem = renderElement(`#${sort}`);
  activeElem.classList.add(`sort-${order}`);
};
