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
import { LoadState } from './../game/state/game.load-state';
import { StageState } from './../game/state/game.stage-state';
//import * as _ from 'lodash';
declare let _:any;

//This variable will hold an instance of the session class which contains configuration and gameplay data.
export let session:Session;

//The current time. This is used to measure the delta time between two frames.
let currentTime: any = Date.now();

/**
 * This is the program's entry point. This method loads a session from a config file, initiates various HTML5 resources, and invokes the game loop.
 * @return {Promise}
 */
export async function main(configURL: string = '/synesthesia-symphony/config.json'):Promise<any> {
	//Start a new session.
	session = new Session();

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
		throw new Error ('Make sure the config.json file is valid JSON and implements the ConfigType interface found in Session.ts');
	}

	//Initiate resources such as canvas width.
	//The Session.initResources() method uses CSS3 media queries to determine the size for the canvas' width and height.
	session.initResources(session.config.RESOLUTIONS);

	//Transition to the Load state.
	session.FSM.push({state: new StageState(), session: session});

	//Start the recursive game loop.
	gameLoop();
}

/**
 * This is the game loop. This method is recursively invoked via the requestAnimationFrame() method.
 * @return {void}
 */
function gameLoop():void {
	//This variable holds the time that was stored in the previous frame.
	let previousTime:any = currentTime;

	//Update the current time.
	currentTime = Date.now();

	//Delta time is the time difference between the current and previous frames.
	let dt:number = currentTime - previousTime;

	//Here we use the requestAnimationFrame() method to recursively invoke the gameLoop() method.
	session.setAnimationFrameId = requestAnimationFrame(gameLoop);

	//Update the instantaneous frames per second.
	session.setFPS = 1000.0 / dt;

	//Limit the frame rate.
	if (dt > session.config.TARGETED_FPS)
		dt = session.config.TARGETED_FPS;

	//Handle logic in the current state.
	session.FSM.update({session: session, dt: dt});

	//Render the current state.
	session.FSM.draw({session: session, dt: dt});
}

/**
 * The data structure we will pass to the finite state machine.
 * @interface
 */
export interface StateData {
	//A game state.
	state?:State;

	//System session.
	session:Session;

	//Delta time. The time difference from the current and previous game state.
	dt?:number;

	//Determines if we will pause the state.
	pause?:boolean;

	manager?:any;

	callback?:Function;
}

/**
 * @interface
 */
export interface StateType {
	start(data:StateData):void;
	update(data:StateData):void;
	draw?(data:StateData):void;
}

/**
 * An interface for configuration data.
 * @interface
 */
export interface ConfigType {
	//Database URL.
	readonly DB_URL:string;
	//Determines if debug information will be logged to the console. Setting this to true may (or may not) break things.
	readonly DEBUG_MODE:boolean;
	//Determines if MIDI.js library will only use the piano instrument.
	readonly ONLY_USE_PIANO_INSTRUMENT:boolean;
	//The targeted FPS. This is no longer supported now that Synesthesia Symphony is using requestAnimationFrame() which defaults to 60 FPS.
	readonly TARGETED_FPS:number,
	//The player's initial lives.
	readonly PLAYER_INITIAL_LIVES:number;
	//The player's max power.
	readonly PLAYER_MAX_POWER:number;
	//The player's initial speed.
	readonly PLAYER_INITIAL_POWER:number;
	//The player's speed.
	readonly PLAYER_SPEED:number;
	//The player's speed when the SHIFT KEY is pressed.
	readonly PLAYER_FOCUS_SPEED:number;
	//The player's hitbox radius.
	readonly PLAYER_HITBOX_RADIUS:number;
	//Determines how long in milliseconds the player will be invulnable after taking damage.
	readonly PLAYER_INVULNERABILITY_TIMEOUT:number;
	//The path to the MIDI files used by MIDI.js.
	readonly MIDI_DIRECTORY:string;
	//The path to the soundfonts used by MIDI.js
	readonly SOUNDFONT_DIRECTORY:string;
	//The game's title.
	readonly GAME_TITLE:string;
	//The developer's name.
	readonly DEVELOPER_NAME:string;
	//The game's version.
	readonly VERSION:string;
	//The canvas' width and height at various resolutions. See ResolutionType for more info.
	readonly RESOLUTIONS:{
		LOW:ResolutionType,
		MEDIUM:ResolutionType,
		HIGH:ResolutionType
	};
}

/**
 * Screen resolution data structure.
 * @interface
 */
export interface ResolutionType {
	readonly W:number;
	readonly H:number;
	readonly CANVAS_W:number;
	readonly CANVAS_H:number;
}

/**
 * This method tries to detect the screen resolution. It returns an object containing a width and height.
 * @param {Symphony.Session.ResolutionType} resolutions - The screen resolutions.
 * @return {Symphony.Session.ResolutionType}
 */
//export function getResolution(resolutions:{LOW:ResolutionType, MEDIUM:ResolutionType, HIGH:ResolutionType}):ResolutionType {
export function getResolution(resolutions:any):ResolutionType {
	//Check to see if this is a medium screen resolution.
	if (window.matchMedia(`(min-width:${resolutions['MEDIUM'].W}px)`).matches)
		return resolutions['MEDIUM'];

	//Check to see if this is a high screen resolution.
	else if (window.matchMedia(`(min-width:${resolutions['HIGH'].W}px)`).matches)
		return resolutions['HIGH'];

	//Return the low resolution.
	return resolutions['LOW'];
}
