import Settings from './settings';

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
		else
			console.log(
				'Invalid arguments passed. To start the game, pass no arguments.',
			);
	}
	getHelp(): void {
		console.log(
			decodeURI(
				String.raw`
     _   _  ___  ____  _____     ____  _   _    _    _  _______
    | \ | |/ _ \|  _ \| ____|   / ___|| \ | |  / \  | |/ / ____|
    |  \| | | | | | | |  _|     \___ \|  \| | / _ \ | ' /|  _|
    | |\  | |_| | |_| | |___     ___) | |\  |/ ___ \|   \| |___
    |_| \_|\___/|____/|_____|   |____/|_| \_/_/   \_\_|\_\_____|



    BASIC OPTIONS
        --help          Shows this message.
        -h              Same as "--help".
        
        --settings      Shows settings.
        -c              Same as "--settings".

        --set           Enables you to change the game settings. Follow
                        "--set" with "--SETTING_NAME=VALUE" and replace
                        the placeholder with your values.

    GAME SETTINGS
        --mkeyup        The key used to move upwards.
        --mkeydown      The key used to move downwards.
        --mkeyleft      The key used to move upwards.
        --mkeyright     The key used to move upwards.
        
`,
			),
		);
	}
}

export default GameInit;
