/**
 * @file The system namespace is the foundation for which every class is built upon.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { State } from './system.state';
import { Session } from './system.session';
import { LoadState } from '../game/state/game.load-state';
import { StageState } from '../game/state/game.stage-state';
import { FSM }  from './system.fsm';
import _ from 'lodash';

//The current time. This is used to measure the delta time between two frames.
let currentTime: number = Date.now();

//Initiate the finite state machine.
const fsm: FSM = new FSM();

//Start a new session.
//This variable will hold an instance of the Session class which contains configuration and gameplay data.
const session: Session = new Session();

//Let the IDE know this is declared else where.
declare let window: any;

/**
 * This is the program's entry point. This method loads a session from a config file, initiates various HTML5 resources, and invokes the game loop.
 * @throws {Error}
 * @return {Promise<void>}
 */
export async function main(configURL: string = '/synesthesia-symphony/config.json'): Promise<void> {
	try {
		//Load the config.json file into the session instance.
		//Here we use async await to avoid callback hell.
		session.setConfig = await session.load(configURL);

		//Load the game data required to initiate enemies, items and projectile patterns.
		session.setGameData = await session.load(session.config.DB_URL);
	} catch (err) {
		console.error('Session.load() error, make sure the config.json and offline-data.json files contain the correct data and is valid JSON', err);
	}

	//Make sure the config data is set.
	if (_.isEmpty(session.config.RESOLUTIONS)) {
		throw new Error('Make sure the config.json file is valid JSON and implements the ConfigType interface found in Session.ts');
	}

	//Initiate resources such as canvas width. The Session.initResources() method uses CSS3 media queries to determine the size for the canvas' width and height.
	session.initResources(session.config.RESOLUTIONS);

	//When the 'pushState' event is triggered.
	window.addEventListener('pushState', __pushState);

	//When the 'popState' event is triggered.
	window.addEventListener('popState', __popState);

	//Transition to the Load state.
	fsm.push({state: new LoadState(), session: session});

	//Start the recursive game loop.
	gameLoop();
}

/**
 * This is the game loop. This method is recursively invoked via the requestAnimationFrame() method.
 * @throws {Error}
 * @return {void}
 */
function gameLoop(): void {
	//This variable holds the time that was stored in the previous frame.
	const previousTime: number = currentTime;

	//Update the current time.
	currentTime = Date.now();

	//Delta time is the time difference between the current and previous frames.
	let dt: number = currentTime - previousTime;

	//Check to see if the delta time is zero.
	if (dt === 0) {
		//throw new Error('Delta time is zero');
		console.log('Delta is zero');
		dt = 0.1;
	}

	//Here we use the requestAnimationFrame() method to recursively invoke the gameLoop() method.
	session.setAnimationFrameId = requestAnimationFrame(gameLoop);

	//Update the instantaneous frames per second.
	session.setFPS = 1000.0 / dt;

	//Limit the frame rate.
	if (dt > session.config.TARGETED_FPS) {
		dt = session.config.TARGETED_FPS;
	}

	//Handle logic in the current state.
	fsm.update({session: session, dt: dt});

	//Render the current state.
	fsm.draw({session: session, dt: dt});
}

/**
 * The data structure we will pass to the finite state machine.
 * @interface
 */
export interface StateData {
	//A game state.
	readonly state?: State;

	//System session.
	readonly session: Session;

	//Delta time. The time difference from the current and previous game state.
	readonly dt?: number;

	//Determines if we will pause the state.
	readonly pause?: boolean;

	readonly manager?: any;
}

/**
 * @interface
 */
export interface StateType {
	start(data: StateData): void;
	update(data: StateData): void;
	draw?(data: StateData): void;
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
		LOW: ResolutionType,
		MEDIUM: ResolutionType,
		HIGH: ResolutionType
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
 * This method tries to detect the screen resolution. It returns an object containing a width and height.
 * @param {ResolutionType} resolutions - The screen resolutions.
 * @return {ResolutionType}
 */
export function getResolution(resolutions: {LOW: ResolutionType, MEDIUM: ResolutionType, HIGH: ResolutionType}): ResolutionType {
	//Check to see if this is a medium screen resolution.
	if (window.matchMedia(`(min-width:${resolutions['MEDIUM'].W}px)`).matches) {
		return resolutions['MEDIUM'];
	}
	//Check to see if this is a high screen resolution.
	else if (window.matchMedia(`(min-width:${resolutions['HIGH'].W}px)`).matches) {
		return resolutions['HIGH'];
	}

	//Return the low resolution.
	return resolutions['LOW'];
}


/**
 * Handles pushState events.
 * @param {StateData} event - Event data.
 * @return {void}
 */
function __pushState(event: CustomEventInit): void {
	//Push another state on to the stack.
	fsm.push(event.detail);
}

/**
 * Handles popState events.
 * @param {StateData} event - Event data.
 * @return {void}
 */
function __popState(event: CustomEventInit): void {
	//Pop a state from the stack
	fsm.pop(event.detail);
}


/**
 * Removes the event listeners.
 * @return {void}
 */
export function __removeEventListeners(): void {
	//Remove the event listeners.
	window.removeEventListener('pushState', __pushState, false);
	window.removeEventListener('popState', __popState, false);
}
