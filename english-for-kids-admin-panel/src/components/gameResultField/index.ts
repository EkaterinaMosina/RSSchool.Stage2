export const renderWinMessage = () => `
    <div class="message-field">
        <div class="ico-win"></div>
        <p class="message-text">Congratulations!<br>You guessed all the words without mistakes</p>
    </div>
`;

export const renderLossMessage = (mistakes: number) => `
    <div class="message-field">
        <div class="ico-loss"></div>
        <p class="message-text">You made ${mistakes} mistake(s).<br>You should practice more</p>
</div>
`;
