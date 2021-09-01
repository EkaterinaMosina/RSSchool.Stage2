import { addStatisctics } from '../../redux/actions/index';
import { store } from '../../redux/core/store';
import { StatData, Statistics } from '../../redux/core/types';
import { renderStatisctics } from '../../redux/utils';
import changeLocation from '../../router/changeLocation';
import { renderAttribute, renderElement } from '../../utils/render';
import { ASC, SORT_ASC, DESC, STATISTICS_PAGE, INIT_ITEM_MODE, MIN_BAD_PERSENTAGE, PERSENTAGE, TABLE_BODY, STATISTICS_PAGE_HUSH } from '../constants';
import { Params, Cards, Card } from '../types';
import { renderStatisticsItems } from './index';

const sortASC = (statData: StatData[], sort: string) => {
  return statData.sort((a, b) => {
    const item1Value = a[sort];
    const item2Value = b[sort];
  
    if (item1Value < item2Value) 
      return -1;
  
    if (item1Value > item2Value)
      return 1;
  
    return 0; 
  });
};
  
const sortDESC = (statData: StatData[], sort: string) => {
  return statData.sort((a, b) => {
    const item1Value = a[sort];
    const item2Value = b[sort];

    if (item1Value < item2Value) 
      return 1;

    if (item1Value > item2Value)
      return -1;

    return 0; 
  });
};

export const sortStatData = ({ statData, sort, order }: Params): StatData[] => {
  return (order === ASC) ? sortASC(statData, sort) : sortDESC(statData, sort); 
};
  
export const appendSortedStatData = (e: Event) => {
  const item = e.target as HTMLElement;

  const sort = renderAttribute(item);
  const order = (item.classList.contains(SORT_ASC)) ? DESC : ASC;

  changeLocation(`${STATISTICS_PAGE}?sort_by=${sort}&order=${order}`);
};
  
export const renderSortedStatData = (sort: string, order: string) => {
  const  statData = getStatisticsData();
  const params: Params = {
    statData,
    sort,
    order,
  };
  return sortStatData(params);

};
  
const getStatDataLowPersentage = (statData: StatData[]) => {
  return statData.filter(el=> 
    (el.mistakes > INIT_ITEM_MODE && el.persentage <= MIN_BAD_PERSENTAGE),
  );
};
  
const getKeysStatData = (statData: StatData[]) => 
  Object.values(statData).map(el=>el.word);

const getFlatData = (data: Cards | Card[][]) => 
  Object.values(data).reduce((acc, val) => acc.concat(val));
    
const getFlatDataCards = (data: Cards ) => {
  const cards = Object.values(data);
  const words = cards.map(card=> card.words);
  return words.reduce((acc, val) => acc.concat(val));
};

const getSortedByKeysData = (keys: string[], data: Card[]) => 
  keys.map((key)=> data.filter(el=>el.word === key));

export const renderDiffWords = () => {
  const statData = getStatisticsData();
  const statDataLowPersentage = getStatDataLowPersentage(statData);

  if (statDataLowPersentage.length === 0) return [];

  const params: Params = {
    statData: statDataLowPersentage,
    sort: PERSENTAGE,
    order: ASC,
  };
  const statDataLowPersentageSorted = sortStatData(params);

  if (statDataLowPersentageSorted.length > 8) {
    statDataLowPersentageSorted.length = 8;
  }

  const keys = getKeysStatData(statDataLowPersentageSorted);
  const { cards } = store.getState();
  const data = getFlatDataCards(cards);
  const result = getSortedByKeysData(keys, data);

  return getFlatData(result);
};

export const appendStatData = (content: string) => {
  const rootElement = renderElement(TABLE_BODY);
  rootElement.innerHTML = content;
};

export const saveStatistics = () => {
  const { statistics } = store.getState();
  const statData: string = JSON.stringify(statistics);
  localStorage.setItem(STATISTICS_PAGE, statData);
};
  
export const initStatistics = () => {
  const data = localStorage.getItem(STATISTICS_PAGE);
  
  if (data !== null) {
    const dataStatistics = localStorage.getItem(STATISTICS_PAGE) as string;
    const statData: Statistics = JSON.parse(dataStatistics);
    addStatisctics(statData);
  }  
};
  
export const getStatisticsData = () => {
  const { statistics } = store.getState();
  return Object.values(statistics);
};
  
export const annulStatistics = () => {
  const { cards } = store.getState();
  const statData = renderStatisctics(cards);
  if (statData.length !== 0) {
    addStatisctics(statData as Statistics);
    const page = window.location.hash;
  
    if (page === STATISTICS_PAGE_HUSH) {
  
      const newStatData = getStatisticsData();
      const statTableContent = renderStatisticsItems(newStatData);
      appendStatData(statTableContent);
  
    } else {
  
      changeLocation(STATISTICS_PAGE);
    }
  }
    
};