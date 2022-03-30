import GameInit from "./gameinit";
import argsParser from "args-parser";
import Settings from "./settings";
import * as types from "./types";

const { boardWidth, boardHeight } = Settings.gameSettings;
const BORDER_CHAR = "X";

class Game {
	board: any[][];
	snakeSize: number = 3;
	snakePos: types.TSnakeCoords = [~~(boardWidth / 2), ~~(boardHeight / 2)];
	snakeTurnPoints: types.TSnakeCoords[] = [];
	snakeDir: types.TSnakeDir = "left";
	constructor() {
		new GameInit(argsParser(process.argv));
		console.log(this.snakePos);
		this.board = Array(boardHeight)
			.fill("")
			.map((_, i) =>
				i === 0 || i === boardHeight - 1
					? Array(boardWidth).fill(BORDER_CHAR)
					: Array(boardWidth).fill(" ")
			);
		// Only horizontal borders are drawn here, vertical borders will be added when its drawn.
	}
	main() {
		this.drawBoard();
	}
	drawBoard() {
		this.updateSnake();
		for (let row of this.board) {
			// Draw vertical borders.
			row[0] = BORDER_CHAR;
			row[boardWidth - 1] = BORDER_CHAR;
			let temp = "";
			for (let square of row) {
				temp += `${square} `;
			}
			console.log(temp.trim());
		}
	}
	updateSnake() {
		// putting 1 before 0 so that snakePos can be represeted as [x, y], not [y, x]
		this.board[this.snakePos[1]][this.snakePos[0]] = "O";
	}
}

const game = new Game();
game.main();
