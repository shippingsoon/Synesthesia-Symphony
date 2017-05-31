/**
 * @file The session class contains data and methods for managing the session. It contains configuration and game data that is asynchronously loaded.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./system.ts" />

/**
 * @namespace
 */
namespace Symphony.System {
	"use strict";

	//Tell the TypeScript compiler we are using the jQuery library.
	declare let jQuery:any;

	/**
	 * @class
	 * @classdesc This class contains various configuration and game data.
	 */
	export class Session {
		//HTML5 canvas element.
		private canvasElement:HTMLCanvasElement;
		private backgroundCanvasElement:HTMLCanvasElement;

		//HTML5 2D drawing context.
		private context:CanvasRenderingContext2D;
		private backgroundContext:CanvasRenderingContext2D;

		//The instantaneous frames per second.
		private framesPerSecond:number;

		//This variable holds ReadOnly configuration data.
		private configData:System.ConfigType;

		//This variable holds various data used to initialize enemies, items, and projectile patterns.
		private gameData:any;

		//Finite state machine.
		private finiteStateMachine:System.FSM;

		//The request ID that is returned from the requestAnimationFrame() method. This can be used to stop the requestAnimationFrame() loop.
		private animationFrameId:number;

		//Background music volume level. This determines how loud the music is.
		private bgmVolumeLevel:number = 127;

		//The sound effects volume level. This determines how loud the sound effects is.
		private sfxVolumeLevel:number = 127;


		/**
		 * Constructor
		 */
		public constructor() {
			//When the user resizes the window, invoke the initResources() method to update the canvas' width and height, among other things.
			window.addEventListener("resize", () => {
				this.initResources(this.configData.RESOLUTIONS);
			});
		}

		/**
		 * Loads configuration data from a JSON file or remote database.
		 * @param {string} url - The URL to request data from. See the config.json and offline-data.json files to see what type of data this function handles.
		 * @return {Promise}
		 */
		 public load(url:string):Promise<any> {
			 return new Promise<void>((resolve, reject) => {
			 	jQuery.ajax({
					dataType: "json",
					url: url,
				    success: (json) => { resolve(json); },
				    error: (err) => { reject(err); }
				});
			 });
		}

		/**
		 * Saves configuration data to a remote database via a RESTful JSON API.
		 * @param {string} url - The URL of the RESTFul API that we will send data to.
		 * @param {System.ConfigType} config - The configuration data we will be saving.
		 * @return {Promise}
		 */
		public save(url:string, config:object): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				jQuery.ajax({
					dataType: "json",
					type: "POST",
					url: url,
					data: config,
					success: (json) => { resolve(json); },
					error: (err) => { reject(err); }
				});
			});
		}

		/**
		 * Get the canvas element.
		 * @return {HTMLCanvasElement}
		 */
		public get canvas():HTMLCanvasElement {
			return this.canvasElement;
		}

		/**
		 * Get the background canvas element.
		 * @return {HTMLCanvasElement}
		 */
		public get backgroundCanvas():HTMLCanvasElement {
			return this.backgroundCanvasElement;
		}

		/**
		 * Gets the 2D drawing context.
		 * @return {CanvasRenderingContext2D}
		 */
		public get ctx():CanvasRenderingContext2D {
			return this.context;
		}

		/**
		 * Gets the 2D drawing context for the background.
		 * @return {CanvasRenderingContext2D}
		 */
		public get getBackgroundCtx():CanvasRenderingContext2D {
			return this.backgroundContext;
		}

		/**
		 * Set the instantaneous frames per second counter.
		 * @param {number} fps
		 */
		public set setFPS(fps:number) {
			this.framesPerSecond = fps;
		}

		/**
		 * Get the instantaneous frames per second.
		 * @return {number}
		 */
		public get getFPS():number {
			return this.framesPerSecond;
		}

		/**
		 * Get the config data.
		 * @return {ConfigType}
		 */
		public get config():ConfigType {
			return this.configData;
		}

		/**
		 * Get the finite state machine.
		 * @return {System.FSM}
		 */
		public get FSM():System.FSM {
			return this.finiteStateMachine;
		}

		/**
		 * Get the animationFrameId.
		 * @param {number} animationFrameId
		 */
		public set setAnimationFrameId(animationFrameId:number) {
			this.animationFrameId = animationFrameId;
		}

		/**
		 * Sets the configData.
		 * @param {System.ConfigType} config - The readonly configuration data.
		 * @return {void}
		 */
		public set setConfig(config:System.ConfigType) {
			this.configData = config;
		}

		/**
		 * Gets the game data.
		 * @return {void}
		 */
		public get getGameData():any {
			return this.gameData;
		}

		/**
		 * Sets the game data.
		 * @param {any} gameData - Various game data used to initialize enemies, items, and projectile patterns.
		 * @return {void}
		 */
		public set setGameData(gameData:any) {
			this.gameData = gameData;
		}

		/**
		 * Sets the background music volume level.
		 * @param {number} bmgVolumeLevel - How loud we want the music to be.
		 * @return {void}
		 */
		public set setBGMVolume(bmgVolumeLevel:number) {
			this.bgmVolumeLevel = bmgVolumeLevel;
		}

		/**
		 * Gets the background music volume level.
		 * @return {number}
		 */
		public get getBGMVolume() {
			return this.bgmVolumeLevel;
		}

		/**
		 * Sets the sound effects volume level.
		 * @param {number} sfxVolumeLevel - How loud we want the sfx to be.
		 * @return {void}
		 */
		public set setSFXVolume(sfxVolumeLevel:number) {
			this.sfxVolumeLevel = sfxVolumeLevel;
		}

		/**
		 * Gets the sound effects volume level.
		 * @return {number}
		 */
		public get getSFXVolume() {
			return this.sfxVolumeLevel;
		}

		/**
		 * This method initiates resources such as the HTML5 canvas element and 2D drawing context.
		 * @param {Object} resolutionSettings - Various resolution types. See the System.ResolutionType interface for more details.
		 * @return {void}
		 */
		public initResources(resolutionSettings:{LOW:System.ResolutionType, MEDIUM:System.ResolutionType, HIGH:System.ResolutionType}):void {
			//Detect the current screen resolution.
			//The getResolution() method will return a System.Config.RESOLUTIONS object containing the width and height
			//which we will use to set the canvas' width and height.
			let resolution:ResolutionType = getResolution(resolutionSettings);

			//Set the canv as.
			this.canvasElement = <HTMLCanvasElement> document.querySelector("#canvas-layer");
			this.backgroundCanvasElement = <HTMLCanvasElement> document.querySelector("#background-layer");

			//Use the value from System.Config.RESOLUTIONS to update the canvas width and height.
			this.canvasElement.width = resolution.CANVAS_W;
			this.canvasElement.height = resolution.CANVAS_H;
			this.backgroundCanvasElement.width = resolution.W;
			this.backgroundCanvasElement.height = resolution.H;

			//Set the HTML5 2D drawing context.
			this.context = this.canvasElement.getContext("2d");
			this.backgroundContext = this.backgroundCanvasElement.getContext("2d");

			//Create a new Finite State Machine.
			this.finiteStateMachine = new System.FSM();
		}
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
		//The canvas' width and height at various resolutions. See System.ResolutionType for more info.
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
	//export function getResolution(resolutions:{LOW:ResolutionType, MEDIUM:ResolutionType, HIGH:ResolutionType}):System.ResolutionType {
	export function getResolution(resolutions:any):System.ResolutionType {
		//Check to see if this is a medium screen resolution.
		if (window.matchMedia(`(min-width:${resolutions['MEDIUM'].W}px)`).matches)
			return resolutions['MEDIUM'];

		//Check to see if this is a high screen resolution.
		else if (window.matchMedia(`(min-width:${resolutions['HIGH'].W}px)`).matches)
			return resolutions['HIGH'];

		//Return the low resolution.
		return resolutions['LOW'];
	}
}
