/*
 * @description - Session management.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.ts" />

namespace Symphony.System {
	//Tell the TypeScript compiler we are using the jQuery library.
	declare let jQuery:any;

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
		private config:System.ConfigType;

		//Finite state machine.
		private finiteStateMachine:System.FSM;

		//The request ID that is returned from the requestAnimationFrame() method. This can be used to stop the requestAnimationFrame() loop.
		private animationFrameId:number;

		/**
		 * @constructor
		 */
		public constructor() {
		}

		/**
		 * Loads configuration data from a JSON file or remote database.
		 * @param {string} url - The URL to request data from.
		 * @param {Function} callback - The callback method that will be invoked on success.
		 * @return {void}
		 */
		 public async load(url:string, callback:Function):Promise<void> {
			 return new Promise<void>((resolve, reject) => {
			 	jQuery.ajax({
					dataType: "json",
					url: url,
					success: callback,
					error: function(err) {
						console.error(err);
					}
				});
			 });
		}

		/**
		 * Saves configuration data to a remote database via a RESTful JSON API.
		 * @param {string} url - The URL of the RESTFul API that we will send data to.
		 * @param {Symphony.System.ConfigType} config - The configuration data we will be saving.
		 * @param {Function} callback
		 * @return {void}
		 */
		public async save(url:string, config:Symphony.System.ConfigType, callback:Function): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				jQuery.ajax({
					dataType: "json",
					type: "POST",
					url: url,
					data: config,
					success: callback,
					error: function (err) {
						console.error(err);
					}
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
		public get CONFIG():ConfigType {
			return this.config;
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
		 * Initiates a session.
		 * @param {String} configURL
		 * @param {Function} callback
		 * @return {void}
		 */
		public loadConfig(configURL:string = "/synesthesia-symphony/config.json", callback:Function):Promise<void> {
			//Read the configuration data from the config.json file.
			return this.load(configURL, callback);
		}

		/**
		 * This method initiates resources such as the System.canvas and System.ctx.
		 * @param {Symphony.System} system - The System namespace.
		 * @return {void}
		 */
		public initResources(resolutionSettings:ResolutionType):void {
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
		readonly USE_DB:boolean;
		readonly DEBUG_MODE:boolean;
		readonly ONLY_USE_PIANO_INSTRUMENT:boolean;
		readonly TARGETED_FPS:number,
		readonly PLAYER_INITIAL_LIVES:number;
		readonly PLAYER_MAX_POWER:number;
		readonly PLAYER_INITIAL_POWER:number;
		readonly PLAYER_SPEED:number;
		readonly PLAYER_FOCUS_SPEED:number;
		readonly PLAYER_HITBOX_RADIUS:number;
		readonly PLAYER_INVULNERABILITY_TIMEOUT:number;
		readonly MIDI_FILE_PATH:string;
		readonly TITLE:string;
		readonly DEVELOPER:string;
		readonly VERSION:string;
		readonly RESOLUTIONS:{
			LOW:ResolutionType,
			MEDIUM:ResolutionType,
			HIGH:ResolutionType
		};
	}

	/**
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

	/**
	 * Helper method for logging error messages. TODO: Add this to a Debug namespace.
	 * @param {object} err - An object containing server request status.
	 * @return {void}
	 */
	function _onError(err:object):void {
		console.error("An error has occurred, make sure you are pulling valid JSON from the config.json file", err);
	}
}
