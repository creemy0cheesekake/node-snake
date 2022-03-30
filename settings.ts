import * as types from "./types";
import snakeUserSettings from "./snake-user-settings.json";
import fs from "fs";

class Settings {
	static readonly gameSettings: types.TGameSettings = {
		boardWidth: 30,
		boardHeight: 20,
	};

	static userSettings: types.TUserSettings = snakeUserSettings;

	static settings: types.TUserSettings & types.TGameSettings = {
		...this.userSettings,
		...this.gameSettings,
	};
	static x = 21;

	static getUserSettings() {
		const displaySettings = (
			settings: string[],
			values: (number | string | types.TDirections)[],
			indentLevel: number = 0
		) => {
			for (let i in settings) {
				const val = values[i];
				if (typeof val !== "object")
					console.log("  ".repeat(indentLevel), `${settings[i]}:`, val);
				else {
					console.log(` ${settings[i]}:`);
					displaySettings(Object.keys(val), Object.values(val), 1);
				}
			}
		};
		displaySettings(Object.keys(this.userSettings), Object.values(this.userSettings));
	}
	static setUserSettings(args: any): void {
		const oldSettings = JSON.parse(JSON.stringify(this.userSettings));
		this.userSettings.movementKeys.up = args.mkeyup || this.userSettings.movementKeys.up;
		this.userSettings.movementKeys.down = args.mkeydown || this.userSettings.movementKeys.down;
		this.userSettings.movementKeys.left = args.mkeyleft || this.userSettings.movementKeys.left;
		// prettier-ignore
		this.userSettings.movementKeys.right = args.mkeyright || this.userSettings.movementKeys.right;
		fs.writeFileSync(
			"./snake-user-settings.json",
			JSON.stringify(this.userSettings, null, "\t")
		);
		if (JSON.stringify(oldSettings) == JSON.stringify(this.userSettings))
			console.log("No settings modified.");
		else console.log("Setting successfully written");
	}
}

export default Settings;
