export const renderElement = (selector: string, root: HTMLElement | Document = document) =>
  root.querySelector(selector) as HTMLElement;

export const renderInputElement = (selector: string, root: HTMLElement | Document = document) => 
  root.querySelector(selector) as HTMLInputElement;  

export const renderElements = (selector: string, root: HTMLElement | Document = document) =>
  root.querySelectorAll(selector);

export const renderAudioElement = (selector: string, root: HTMLElement | Document = document) =>
  root.querySelector(selector) as HTMLAudioElement;

export const renderAttribute = (el: HTMLElement) => el.getAttribute('id') as string;

export const renderContent = (el: HTMLElement) => el.innerHTML;