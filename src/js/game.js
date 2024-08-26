export default class Game {
    constructor(field, goblin) {
        this.field = field;
        this.fieldSize = 4;
        this.goblin = goblin;
        this.activeGoblin = null;
        this.position = null; 
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
        const position = Math.floor(Math.random()  *  this.fieldSize  *  4);
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
    }

    adventGoblin() {
        this.activeGoblin = this.goblin.getGoblin();
        this.cells[this.position].appendChild(this.activeGoblin);
    }

    play() {
        let intervalId;

        function gameLoop() {
            this.randomPosition();
        }

        intervalId = setInterval(gameLoop.bind(this), 800);

        this.start = () => {
            this.newField();
            clearInterval(intervalId); 
            intervalId = setInterval(gameLoop.bind(this), 800);
        };
    }

    start() {
        this.newField();
        this.play();
    }
}
