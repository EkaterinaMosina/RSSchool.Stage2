import { store } from '../../../redux/core/store';
import { renderElement } from '../../../utils/render';
import { APP } from '../../constants';
import { categoryListener, listenAddCategory, listenCreateCategoryForm } from './handlers';
import { createCard, createForm } from '../utils';

export const INDEX = {
  topicIndex: 0,
};

export const appendAdminCards = () => {
  const { cards } = store.getState();
  const topics = Object.keys(cards);

  for (let i = 0; i < 4; i++) {
        
    if (INDEX.topicIndex > topics.length - 1) return;

    const topic = topics[INDEX.topicIndex];

    const content = 
            `<div class="remove-category"></div>
            <p class="admin-card-name">${topic}</p>
            <p class="admin-card-words">Words: ${cards[topic].words.length}</p>
            <div class="btn-container">
                <div class="admin-btn admin-btn-view">view mode</div>
                <div class="admin-btn admin-btn-change">change mode</div>
            </div>`;

    const item = createCard(content, '');
    categoryListener(item);

    INDEX.topicIndex++;
  }
};

const renderAdminPanel = () => `
    <header class="admin-header">
        <nav class="admin-nav">
            <div class="admin-nav-el active">Categories</div>
            <div class="admin-nav-el">Words</div>
        </nav>
        <div class="logout">Log Out</div>
    </header>
    <main class="admin-main">
        <div class="container">
            <div class="admin-card-add">
                <p>create new category</p>
                <div class="create-ico"></div>
            </div> 
        </div>
    </main>    
`;
  
export const showAdminPanel = () => {
  const rootElement = renderElement(APP);
  const content = renderAdminPanel();
  rootElement.innerHTML = content;
  INDEX.topicIndex = 0;
  appendAdminCards();
};

export const updateAdminCards = () => {
  const content = 
        `<div class="admin-card-add">
            <p>create new category</p>
            <div class="create-ico"></div>
        </div>`;
  const rootElement = renderElement('.container');
  rootElement.innerHTML = content;  
  INDEX.topicIndex = 0;
  listenAddCategory();
  appendAdminCards();
};

export const showCreateCategoryForm = () => {
  const form = createForm();
  const rootElement = renderElement(APP);
  rootElement.append(form);

  listenCreateCategoryForm(form);
};

export const closeCreateCategoryForm = () => {
  const createForm = renderElement('.form-wrapper');
  createForm.remove();
};

