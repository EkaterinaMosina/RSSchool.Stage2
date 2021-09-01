import { ACTIVE, ACTIVE_NAV_ELEM, ADMIN_NAV_EL, APP, FLIPPED, FORBIDDEN, HIDDEN, NAV_ELEM, VISUALLY_HIDDEN } from '../components/constants';
import { renderElement, renderElements } from './render';

export const toggleActiveView = (menu: HTMLElement, nav: HTMLElement) => {
  [menu, nav].forEach((el) => el.classList.toggle(ACTIVE));
};

export const flippToBack = (el: HTMLElement) => {
  el.classList.add(FLIPPED);
};

export const flippToFront = (el: HTMLElement) => {
  el.classList.remove(FLIPPED);
};

export const toggleHidden = (el: HTMLElement) => {
  el.classList.toggle(HIDDEN);
};

export const hideElement = (el: HTMLElement) => {
  el.classList.add(HIDDEN);
};

export const showElement = (el: HTMLElement) => {
  el.classList.remove(HIDDEN);
};

export const toggleVisuallyHidden = (el: HTMLElement) => {
  el.classList.toggle(VISUALLY_HIDDEN);
  return el;
};

export const forbideClickElements = (elements: NodeListOf<Element>) => {
  elements.forEach((el) => {
    const card = el as HTMLElement;
    card.classList.add(FORBIDDEN);
  });
};

export const allowClickElements = (elements: NodeListOf<Element>) => {
  elements.forEach((el) => {
    const card = el as HTMLElement;
    card.classList.remove(FORBIDDEN);
  });
};

export const forbideClickElement = (el: HTMLElement) => {
  el.classList.add(FORBIDDEN);
};

export const allowClickElement = (el: HTMLElement) => {
  el.classList.remove(FORBIDDEN);
};

export const changeButton = (buttonStart: HTMLElement, buttonRepeat: HTMLElement) => {
  toggleVisuallyHidden(buttonStart);
  buttonStart.addEventListener('transitionend', () => {
    toggleHidden(buttonStart);
    toggleHidden(buttonRepeat);
    toggleVisuallyHidden(buttonRepeat);
  });
};

export const makeNavElemActive = (navElemIndex: number) => {
  const navElements = renderElements(NAV_ELEM);
  navElements.forEach((el) => el.classList.remove(ACTIVE));
  const navElem = navElements[navElemIndex] as HTMLElement;
  navElem.classList.add(ACTIVE);
};

export const removeActiveNavElem = () => {
  const activeNavElem = renderElement(ACTIVE_NAV_ELEM);
  activeNavElem.classList.remove(ACTIVE);
};

export const changeActiveAdminRout = () => {
  const adminNavElements = renderElements(ADMIN_NAV_EL);
  adminNavElements.forEach( el=> {
    const navElem = el as HTMLElement;
    navElem.classList.toggle(ACTIVE);
  });
};

export const changeAppView = (newMode: string, prevMode: string) => {
  const app = renderElement(APP);
  app.classList.remove(prevMode);
  app.classList.add(newMode);
};
