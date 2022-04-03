import Settings from "./settings";

class GameInit {
	readonly args: any;
	constructor(args: any) {
		this.args = args;
	}
	handleParams(): void | true {
		// returns true if game should be started.
		if (Object.keys(this.args).length === 0) return true;
		else if (this.args.h || this.args.help) this.getHelp();
		else if (this.args.c || this.args.settings) Settings.getUserSettings();
		else if (this.args.set) Settings.setUserSettings(this.args);
		else console.log("Invalid arguments passed. To start the game, pass no arguments.");
	}
	getHelp(): void {
		console.log(
			decodeURI(
				"%20%20%20%20%20_%20%20%20_%20%20___%20%20____%20%20_____%20%20%20%20%20____%20%20_%20%20%20_%20%20%20%20_%20%20%20%20_%20%20_______%0A%20%20%20%20%7C%20%5C%20%7C%20%7C/%20_%20%5C%7C%20%20_%20%5C%7C%20____%7C%20%20%20/%20___%7C%7C%20%5C%20%7C%20%7C%20%20/%20%5C%20%20%7C%20%7C/%20/%20____%7C%0A%20%20%20%20%7C%20%20%5C%7C%20%7C%20%7C%20%7C%20%7C%20%7C%20%7C%20%7C%20%20_%7C%20%20%20%20%20%5C___%20%5C%7C%20%20%5C%7C%20%7C%20/%20_%20%5C%20%7C%20'%20/%7C%20%20_%7C%0A%20%20%20%20%7C%20%7C%5C%20%20%7C%20%7C_%7C%20%7C%20%7C_%7C%20%7C%20%7C___%20%20%20%20%20___)%20%7C%20%7C%5C%20%20%7C/%20___%20%5C%7C%20%20%20%5C%7C%20%7C___%0A%20%20%20%20%7C_%7C%20%5C_%7C%5C___/%7C____/%7C_____%7C%20%20%20%7C____/%7C_%7C%20%5C_/_/%20%20%20%5C_%5C_%7C%5C_%5C_____%7C%0A%0A%0A%0A%20%20%20%20BASIC%20OPTIONS%0A%20%20%20%20%20%20%20%20--help%20%20%20%20%20%20%20%20%20%20Shows%20this%20message.%0A%20%20%20%20%20%20%20%20-h%20%20%20%20%20%20%20%20%20%20%20%20%20%20Same%20as%20%22--help%22.%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20--settings%20%20%20%20%20%20Shows%20settings.%0A%20%20%20%20%20%20%20%20-c%20%20%20%20%20%20%20%20%20%20%20%20%20%20Same%20as%20%22--settings%22.%0A%0A%20%20%20%20%20%20%20%20--set%20%20%20%20%20%20%20%20%20%20%20Enables%20you%20to%20change%20the%20game%20settings.%20Follow%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22--set%22%20with%20%22--SETTING_NAME=VALUE%22%20and%20replace%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20the%20placeholder%20with%20your%20values.%0A%0A%20%20%20%20GAME%20SETTINGS%0A%20%20%20%20%20%20%20%20--mkeyup%20%20%20%20%20%20%20%20The%20key%20used%20to%20move%20upwards.%0A%20%20%20%20%20%20%20%20--mkeydown%20%20%20%20%20%20The%20key%20used%20to%20move%20downwards.%0A%20%20%20%20%20%20%20%20--mkeyleft%20%20%20%20%20%20The%20key%20used%20to%20move%20upwards.%0A%20%20%20%20%20%20%20%20--mkeyright%20%20%20%20%20The%20key%20used%20to%20move%20upwards.%0A%20%20%20%20%20%20%20%20%0A"
			)
		);
		//      _   _  ___  ____  _____     ____  _   _    _    _  _______ | \ | |/ _ \|  _ \| ____|   / ___|| \ | |  / \  | |/ / ____|
		//     |  \| | | | | | | |  _|     \___ \|  \| | / _ \ | ' /|  _|
		//     | |\  | |_| | |_| | |___     ___) | |\  |/ ___ \|   \| |___
		//     |_| \_|\___/|____/|_____|   |____/|_| \_/_/   \_\_|\_\_____|
		//
		//
		//
		//     BASIC OPTIONS
		//         --help          Shows this message.
		//         -h              Same as "--help".
		//
		//         --settings      Shows settings.
		//         -c              Same as "--settings".
		//
		//         --set           Enables you to change the game settings. Follow
		//                         "--set" with "--SETTING_NAME=VALUE" and replace
		//                         the placeholder with your values.
		//
		//     GAME SETTINGS
		//         --mkeyup        The key used to move upwards.
		//         --mkeydown      The key used to move downwards.
		//         --mkeyleft      The key used to move upwards.
		//         --mkeyright     The key used to move upwards.
	}
}

export default GameInit;
