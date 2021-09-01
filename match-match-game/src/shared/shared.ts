export function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout * 1000);
  });
}
export function removeClass(el: HTMLElement, className: string) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  }
}
