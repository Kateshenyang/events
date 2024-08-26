import Field from './field.js';
import Goblin from './goblin.js';
import Game from './game.js';

const field = new Field();
const goblin = new Goblin();
const game = new Game(field, goblin);

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    game.start();
    updateScore(game);
});

function updateScore(game) {
    const scoreElement = document.getElementById('score');
    setInterval(() => {
        scoreElement.textContent = `Score: ${game.score}`;
    }, 100);
}