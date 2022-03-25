import argsParser from "args-parser";
import settings from "./settings";
import * as types from "./types";

class Game {
	readonly args: any;
	constructor(args: any) {
		this.args = args || argsParser(process.argv);
		this.handleParams();
	}
	main() {
		console.log("main method");
	}
	handleParams() {
		if (this.args.h || this.args.help) this.getHelp();
		if (
			typeof this.args.c === "boolean" ||
			typeof this.args.settings === "boolean"
		)
			this.getSettings();
		if (
			typeof this.args.c !== "boolean" ||
			typeof this.args.settings !== "boolean"
		)
			this.setSettings();
	}
	getHelp() {
		console.log("");
		this.kill();
	}
	getSettings() {
		// const displaySettings = (
		// 	settings: string[],
		// 	values: (number | string | types.Directions)[],
		// 	indentLevel: number = 0
		// ) => {
		// 	for (let i in settings) {
		// 		const val = values[i];
		// 		console.log("  ".repeat(indentLevel), settings[i]);
		// 		if (typeof val !== "object")
		// 			console.log("  ".repeat(indentLevel + 1), val);
		// 		else {
		// 			displaySettings(Object.keys(val), Object.values(val), 1);
		// 		}
		// 		console.log();
		// 	}
		// };
		const displaySettings = (
			settings: string[],
			values: (number | string | types.Directions)[],
			indentLevel: number = 0
		) => {
			for (let i in settings) {
				const val = values[i];
				if (typeof val !== "object")
					console.log(
						"  ".repeat(indentLevel),
						`${settings[i]}:`,
						val
					);
				else {
					console.log(` ${settings[i]}:`);
					displaySettings(Object.keys(val), Object.values(val), 1);
				}
				console.log();
			}
		};
		displaySettings(Object.keys(settings), Object.values(settings));
		this.kill();
	}
	setSettings() {
		console.log("");
		this.kill();
	}
	kill() {
		process.exit(0);
	}
}

const game = new Game({ c: true });
game.main();
