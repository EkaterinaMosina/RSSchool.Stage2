import './styles.css';
import showApp from './components/app/app';
import { listeners } from './components/listeners/listeners';

localStorage.clear();
showApp();
listeners();
