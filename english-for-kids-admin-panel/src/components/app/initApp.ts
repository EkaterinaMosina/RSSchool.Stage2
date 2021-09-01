import renderMenuIco from '../header/renderMenuIco';
import renderNav from '../header/renderNav';

const renderApp = () => `
<div class="app train">
    <header class="wrapper">
        <div class="header">
            ${renderMenuIco()}
            ${renderNav()}
            <div class="container">
                <label class="switch">
                    <input type="checkbox" class="switch-input" checked>
                    <span class="switch-label" data-on="Train" data-off="Play"></span>
                    <span class="switch-handle"></span>
                </label>  
                <div class="stat-img"></div>
            </div>            
        </div>
        <div class="logo-field">
            <span class="logo-text">English</span>
            <div class="train-ico"></div>
            <span class="logo-text">train</span>
        </div>
    </header>
    <main class="main"></main> 
    <footer class="footer">
        <div class="footer-container">
            <a class="github" href="https://github.com/EkaterinaMosina"></a>
            <p class="year">2021</p>
            <a class="rss" href="https://rs.school/js/"></a>
        </div>
    </footer>   
`;

export default function initApp() {
  const content = renderApp();
  document.body.innerHTML = content;
}
