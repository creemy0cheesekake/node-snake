import GameInit from './gameinit';
import Settings from './settings';
import argsParser from 'args-parser';
import * as types from './types';

const { boardWidth, boardHeight } = Settings.gameSettings;
const HIGH_SCORE = Settings.getHighScore();
const BORDER_CHAR = 'X';
const SNAKE_CHAR = 'O';
const FOOD_CHAR = '.';
let lockMovement = false;

class Game {
	board: string[][];
	snakePos: types.TSnakeCoords = [~~(boardWidth / 2), ~~(boardHeight / 2)];
	prevSnakePos: types.TSnakeCoords = [~~(boardWidth / 2), ~~(boardHeight / 2)];
	snakePosStack: types.TSnakeCoords[] = [this.snakePos];
	snakeLen: number = 1;
	snakeDir: types.TSnakeDir = 'left';
	foodPos: types.TSnakeCoords = [
		~~(Math.random() * (boardWidth - 2)) + 1,
		~~(Math.random() * (boardHeight - 2)) + 1,
	];
	constructor() {
		const status = new GameInit(argsParser(process.argv)).handleParams();
		!status && process.exit(0);
		this.board = Array(boardHeight)
			.fill('')
			.map((_, i) =>
				i === 0 || i === boardHeight - 1
					? Array(boardWidth).fill(BORDER_CHAR)
					: Array(boardWidth)
							.fill('')
							.map((_, i) =>
								i === 0 || i === boardWidth - 1 ? BORDER_CHAR : ' ',
							),
			);
	}
	main() {
		this.handleKeys();
		this.generateFood();
		this.displayBoard();
	}
	displayBoard() {
		this.clear();
		this.drawSnake();
		for (let row of this.board) {
			let temp = '';
			for (let i of row) temp += `${i} `;
			console.log(temp.trim());
		}
		(async () => {
			await new Promise(resolve => setTimeout(resolve, 100));
			this.moveSnake();
			console.log(`Score: ${this.snakeLen - 1}`);
		})();
	}
	drawSnake() {
		for (let s of this.snakePosStack) this.board[s[1]][s[0]] = SNAKE_CHAR;
	}
	moveSnake() {
		this.prevSnakePos = [this.snakePos[0], this.snakePos[1]];
		if (this.snakeDir === 'left' || this.snakeDir === 'right')
			this.snakePos[0] += this.snakeDir === 'right' ? 1 : -1;
		if (this.snakeDir === 'up' || this.snakeDir === 'down')
			this.snakePos[1] += this.snakeDir === 'down' ? 1 : -1;
		for (let i = this.snakeLen; i > 0; i--) {
			this.snakePosStack[i] = [...this.snakePosStack[i - 1]];
		}
		this.displayBoard();
		this.checkForBorderCrash();
		this.checkForSelfCrash();
		this.checkForFoodEat();
	}
	checkForBorderCrash() {
		if (
			this.snakePos[0] === 0 ||
			this.snakePos[0] === boardWidth - 1 ||
			this.snakePos[1] === 0 ||
			this.snakePos[1] == boardHeight - 1
		)
			this.endGame();
	}
	checkForSelfCrash() {
		let arr: types.TSnakeCoords[] = [];
		for (let i = 1; i < this.snakeLen; i++)
			for (let j = 1; j < this.snakeLen; j++)
				if (
					this.snakePosStack[i].toString() ===
						this.snakePosStack[j].toString() &&
					i !== j
				)
					this.endGame();
	}
	checkForFoodEat() {
		if (this.snakePos.toString() === this.foodPos.toString()) {
			this.snakePosStack.push(this.prevSnakePos);
			this.snakeLen++;
			this.generateFood();
		}
	}
	clear() {
		console.clear();
		this.board = this.board.map(el => el.map(i => (i === SNAKE_CHAR ? ' ' : i)));
		lockMovement = false;
	}
	handleKeys() {
		const { down, up, left, right } = Settings.userSettings.movementKeys;
		require('readline').emitKeypressEvents(process.stdin);
		process.stdin.setRawMode(true);

		process.stdin.on('keypress', (_, key) => {
			switch (key.name) {
				case up:
					if (!lockMovement) this.snakeDir !== 'down' && (this.snakeDir = 'up');
					lockMovement = true;
					break;
				case down:
					if (!lockMovement) this.snakeDir !== 'up' && (this.snakeDir = 'down');
					lockMovement = true;
					break;
				case left:
					if (!lockMovement)
						this.snakeDir !== 'right' && (this.snakeDir = 'left');
					lockMovement = true;
					break;
				case right:
					if (!lockMovement)
						this.snakeDir !== 'left' && (this.snakeDir = 'right');
					lockMovement = true;
					break;
				case 'q':
					process.exit(0);
				case 'c':
					key.ctrl && this.endGame();
					break;
			}
		});
	}
	generateFood() {
		this.foodPos = [
			~~(Math.random() * (boardWidth - 2)) + 1,
			~~(Math.random() * (boardHeight - 2)) + 1,
		];
		this.board[this.foodPos[1]][this.foodPos[0]] = FOOD_CHAR;
	}
	endGame() {
		let newHS = false;
		console.log('Game Over!');
		console.log(`Score: ${this.snakeLen - 1}`);
		if (this.snakeLen - 1 > HIGH_SCORE) {
			newHS = true;
			Settings.setHighScore(this.snakeLen - 1);
			console.log(`High Score: ${this.snakeLen - 1}`);
		} else console.log(`High Score: ${HIGH_SCORE}`);

		newHS && console.log('New High Score!!!');
		process.exit(0);
	}
}

const game = new Game();
game.main();
