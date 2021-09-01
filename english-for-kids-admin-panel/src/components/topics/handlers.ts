import changeLocation from '../../router/changeLocation';
import { renderElement, renderElements } from '../../utils/render';
import { selectTopic } from '../../redux/actions/index';


export default function topicsListeners() {
  const topics = renderElements('.topic');

  topics.forEach((el, index) => {
    const topicCard = el as HTMLElement;
    const topic = renderElement('.topic-info', topicCard).innerHTML; 
    const page = `cards-${index + 1}`;
  
    topicCard.addEventListener('click', () => {
      selectTopic(topic);
      changeLocation(page);
    });
  });
}
