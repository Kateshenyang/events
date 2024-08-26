export default class Game {
    constructor(field, goblin) {
        this.field = field;
        this.fieldSize = 4;
        this.goblin = goblin;
        this.activeGoblin = null;
        this.position = null;
        this.score = 0;
        this.missed = 0;
        this.maxMissed = 5;
        this.intervalId = null;
    }

    newField() {
        const field = this.field.getField(this.fieldSize);
        const body = document.querySelector('body');
        let container = document.querySelector('.container'); 
        if (container) {
            body.removeChild(container); 
        }

        container = document.createElement('div');
        container.classList.add('container');
        container.appendChild(field);
        body.insertBefore(container, body.firstChild);
        this.cells = [...field.children];
    }

    randomPosition() {
        const position = Math.floor(Math.random() * this.fieldSize * 4);
        if (position === this.position) {
            this.randomPosition();
            return;
        }
        this.deletedGoblin();
        this.position = position;
        this.adventGoblin();
    }

    deletedGoblin() {
        if (this.activeGoblin === null) {
            return;
        }
        this.cells[this.position].firstChild.remove();
        this.activeGoblin = null;
        this.missed++;
        this.checkGameOver();
    }

    adventGoblin() {
        this.activeGoblin = this.goblin.getGoblin();
        this.activeGoblin.addEventListener('click', this.hitGoblin.bind(this));
        this.cells[this.position].appendChild(this.activeGoblin);
    }

    hitGoblin() {
        this.score++;
        this.cells[this.position].firstChild.remove();
        this.activeGoblin = null;
    }

    checkGameOver() {
        if (this.missed >= this.maxMissed) {
            clearInterval(this.intervalId);
            alert(`Game Over! Your score is ${this.score}`);
        }
    }

    play() {
        const gameLoop = () => {
            this.randomPosition();
        };

        this.intervalId = setInterval(gameLoop.bind(this), 1000);
    }

    start() {
        this.newField();
        this.play();
    }
}