import GameInit from "./gameinit";
import Settings from "./settings";
import argsParser from "args-parser";
import * as types from "./types";

const { boardWidth, boardHeight } = Settings.gameSettings;
const BORDER_CHAR = "X";
const SNAKE_CHAR = "O";

class Game {
	board: string[][];
	snakePos: types.TSnakeCoords = [~~(boardWidth / 2), ~~(boardHeight / 2)];
	snakeLen: number = 1;
	snakeDir: types.TSnakeDir = "left";
	constructor() {
		const status = new GameInit(argsParser(process.argv)).handleParams();
		!status && process.exit(0);
		this.board = Array(boardHeight)
			.fill("")
			.map((_, i) =>
				i === 0 || i === boardHeight - 1
					? Array(boardWidth).fill(BORDER_CHAR)
					: Array(boardWidth)
							.fill("")
							.map((_, i) => (i === 0 || i === boardWidth - 1 ? BORDER_CHAR : " "))
			);
	}
	main() {
		this.displayBoard();
	}
	displayBoard() {
		console.clear();
		this.drawSnake();
		for (let row of this.board) {
			let temp = "";
			for (let i of row) temp += `${i} `;
			console.log(temp.trim());
		}
	}
	drawSnake() {
		console.log(this.snakePos);
		this.board[this.snakePos[1]][this.snakePos[0]] = SNAKE_CHAR;
		this.moveSnake();
	}
	moveSnake() {
		if (this.snakeDir === "left" || this.snakeDir === "right")
			this.snakePos[1] += this.snakeDir === "right" ? 1 : -1;
		if (this.snakeDir === "up" || this.snakeDir === "down")
			this.snakePos[1] += this.snakeDir === "down" ? 1 : -1;
		this.displayBoard();
	}
}

const game = new Game();
game.main();
