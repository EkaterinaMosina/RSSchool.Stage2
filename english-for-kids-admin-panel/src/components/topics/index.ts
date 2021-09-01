import { appendContent } from '../../utils/index';
import { store } from '../../redux/core/store';
import { IMAGE } from '../constants';

const renderTopic = () => {
  const { cards } = store.getState();
  const topics = Object.keys(cards);
  const topicCont = topics.map(topic=> [topic, cards[topic][IMAGE]]); 
  return topicCont.map(
    ([topic, imgSrc], index) => {
      
      return `<div class="topic" id="topic-card-${index + 1}">
      <div class="topic-img" style="background: url('${imgSrc}');
                                    background-position: top;
                                    background-size: contain;
                                    background-repeat: no-repeat"> 
      </div>
      <p class="topic-info">${topic}</p>
     </div>`;
    }).join('');
};
  

const renderTopicsContent = () =>
  `
    <div class="topics">
        ${renderTopic()}          
    </div>      
    `;

export default function renderTopics()  {
  const content = renderTopicsContent();
  appendContent(content);
}