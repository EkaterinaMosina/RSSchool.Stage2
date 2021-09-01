const listenWinnerMessage = () => {
  const close = document.querySelector('.close') as HTMLElement;
  close.addEventListener('click', () => {
    const winnerMessage = document.querySelector('.winner-message-field') as HTMLElement;
    winnerMessage.remove();
  });
};

export default function showWinnerMessage(name: string, time: number) {
  const winnerMessageField = document.createElement('div');
  winnerMessageField.className = 'winner-message-field';

  const content = 
  `
  <div class="close"></div>
  <div class="winner-message">
    <p class="message">The winner is <b>${name}</b>!<br> It arrived first in <b>${time}</b> seconds.</p>
  </div>
  `;

  winnerMessageField.innerHTML = content;

  const carsField = document.querySelector('.cars-field') as HTMLElement;
  carsField.append(winnerMessageField);
  listenWinnerMessage();
}


