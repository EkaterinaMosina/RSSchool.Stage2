import { store } from '../redux/core/store';
import { renderElement, renderElements } from '../utils/render';

export const renderPageAndTopic = (location: string) => {
  const { topic } = store.getState();
  const page = Number(location.slice(8));
  return { topic, page };
};
  
export const renderSortAdnOrder = (location: string) => {
  const sort = location.substring(
    location.indexOf('=') + 1, 
    location.indexOf('&'),
  );
  const order = location.substring(
    location.lastIndexOf('=') + 1,
  );
  return { sort, order };
}; 

export const renderNavElIndex = () => {
  const nav = renderElement('.list');
  const navEl = renderElements('.nav-elem', nav);
  return navEl.length - 2;
};  