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
export interface IStateData {
	//A game state.
	readonly state?: IState;

	//Game session.
	readonly session?: any;

	//Delta time. The time difference from the current and previous game state.
	readonly dt?: number;

	//Determines if we will pause the state.
	readonly pause?: boolean;

	//Entity manager
	//readonly manager?: any;
}

/**
 * @interface
 */
export interface IState {
	start(data: {state: IState}): void;
	stop?(data: IStateData): void;
	update(data: IStateData): void;
	draw(data: IStateData): void;
	play?(data: IStateData): void;
	pause?(data: IStateData): void;
}

/**
 * An interface for configuration data.
 * @interface
 */
export interface IConfig {
	//Database URL.
	readonly DB_URL: string;
	//Determines if debug information will be logged to the console. Setting this to true may (or may not) break things.
	readonly DEBUG_MODE: boolean;
	//Determines if MIDI.js library will only use the piano instrument.
	readonly ONLY_USE_PIANO_INSTRUMENT: boolean;
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
	//Determines how long in milliseconds the player will be invulnerable after taking damage.
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
	//The canvas' width and height at various resolutions. See IResolution for more info.
	readonly RESOLUTIONS: {
		readonly LOW: IResolution,
		readonly MEDIUM: IResolution,
		readonly HIGH: IResolution
	};
}

/**
 * Screen resolution data structure.
 * @interface
 */
export interface IResolution {
	readonly W: number;
	readonly H: number;
	readonly CANVAS_W: number;
	readonly CANVAS_H: number;
}

/**
 * @type FSMEvents
 */
export type FSMEvents = 'pushState' | 'popState';

/**
 * @interface
 */
export interface IFSM {
	update(data: IStateData): void;
	draw(data: IStateData): void;
	push(state: IState): void;
	pop(data: IStateData): void;
}

/**
 * @interface
 */
export interface IStateStack {
	length: number;
	isEmpty(): boolean;
	peek(): IState;
	push(state: IState): void;
	pop(): IState;
}

