import { CARDS_PAGE } from '../components/constants';

export default function changeLocation(rout: string) {

  if (rout.includes(CARDS_PAGE)) {
  
    const newRout = rout.split('-').join('/');
    window.location.hash = `#/${newRout}`;
  
  } else {
    window.location.hash = `#/${rout}`;
  }
}