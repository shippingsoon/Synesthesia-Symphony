/**
 * @file System types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/**
 * The data structure we will pass to the finite state machine.
 * @interface
 */
export interface StateData {
	//A game state.
	readonly state?: IState;

	//System session.
	readonly session?: any;

	//Delta time. The time difference from the current and previous game state.
	readonly dt?: number;

	//Determines if we will pause the state.
	readonly pause?: boolean;

	readonly manager?: any;
}

/**
 * @interface
 */
export interface IState {
	start(data: StateData): void;
	stop?(data: StateData): void;
	update(data: StateData): void;
	draw(data: StateData): void;
	play?(data: StateData): void;
	pause?(data: StateData): void;
}

/**
 * An interface for configuration data.
 * @interface
 */
export interface ConfigType {
	//Database URL.
	readonly DB_URL: string;
	//Determines if debug information will be logged to the console. Setting this to true may (or may not) break things.
	readonly DEBUG_MODE: boolean;
	//Determines if MIDI.js library will only use the piano instrument.
	readonly ONLY_USE_PIANO_INSTRUMENT: boolean;
	//The targeted FPS. This is no longer supported now that Synesthesia Symphony is using requestAnimationFrame() which defaults to 60 FPS.
	readonly TARGETED_FPS: number,
	//The player's initial lives.
	readonly PLAYER_INITIAL_LIVES: number;
	//The player's max power.
	readonly PLAYER_MAX_POWER: number;
	//The player's initial speed.
	readonly PLAYER_INITIAL_POWER: number;
	//The player's speed.
	readonly PLAYER_SPEED: number;
	//The player's speed when the SHIFT KEY is pressed.
	readonly PLAYER_FOCUS_SPEED: number;
	//The player's hitbox radius.
	readonly PLAYER_HITBOX_RADIUS: number;
	//Determines how long in milliseconds the player will be invulnable after taking damage.
	readonly PLAYER_INVULNERABILITY_TIMEOUT: number;
	//The path to the MIDI files used by MIDI.js.
	readonly MIDI_DIRECTORY: string;
	//The path to the soundfonts used by MIDI.js
	readonly SOUNDFONT_DIRECTORY: string;
	//The game's title.
	readonly GAME_TITLE: string;
	//The developer's name.
	readonly DEVELOPER_NAME: string;
	//The game's version.
	readonly VERSION: string;
	//The canvas' width and height at various resolutions. See ResolutionType for more info.
	readonly RESOLUTIONS: {
		readonly LOW: ResolutionType,
		readonly MEDIUM: ResolutionType,
		readonly HIGH: ResolutionType
	};
}

/**
 * Screen resolution data structure.
 * @interface
 */
export interface ResolutionType {
	readonly W: number;
	readonly H: number;
	readonly CANVAS_W: number;
	readonly CANVAS_H: number;
}

/**
 * @type
 */
export type FSMEvent = 'pushState' | 'popState';


