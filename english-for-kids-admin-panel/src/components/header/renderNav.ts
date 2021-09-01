import { renderNavList } from '../../utils/index';

const renderNavElement = () =>{
  const navigationList = renderNavList();
 
  return navigationList.map(([page, content]) => 
    `<li class="nav-elem" id="nav-${page}">${content}</li>`).join('');
};
  

export default function renderNav() {
  return  `
  <nav class="nav">
      <ul class="list">
          ${renderNavElement()}
      </ul>
  </nav>
  `;
}