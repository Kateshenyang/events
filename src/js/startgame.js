import Field from './field.js';
import Goblin from './goblin.js';
import Game from './game.js';

const field = new Field();
const goblin = new Goblin();
const game = new Game(field, goblin);

game.start();