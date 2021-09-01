export default function createStar(choice: string) {
  const starWrapper = document.createElement('div');
  starWrapper.className = `star-${choice}`;
  return starWrapper;
}
