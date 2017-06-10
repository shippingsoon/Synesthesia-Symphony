/**
 * @file The session class contains data and methods for managing the session. It contains configuration and game data that is asynchronously loaded.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';
import { ConfigType, ResolutionType, getResolution } from './system';
import { FSM } from './system.fsm';

//Tell the TypeScript compiler we are using the jQuery library.
declare let jQuery: any;

/**
 * @class
 * @classdesc This class contains various configuration and game data.
 */
export class Session {
	//HTML5 canvas element.
	private canvasElement: HTMLCanvasElement;
	private backgroundCanvasElement:HTMLCanvasElement;

	//HTML5 2D drawing context.
	private context:CanvasRenderingContext2D;
	private backgroundContext:CanvasRenderingContext2D;

	//The instantaneous frames per second.
	private framesPerSecond:number;

	//This variable holds ReadOnly configuration data.
	private configData:ConfigType;

	//This variable holds various data used to initialize enemies, items, and projectile patterns.
	private gameData:any;

	//Finite state machine.
	private finiteStateMachine:FSM;

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
	 * @param {ConfigType} config - The configuration data we will be saving.
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
	 * @return {FSM}
	 */
	public get FSM():FSM {
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
	 * @param {ConfigType} config - The readonly configuration data.
	 * @return {void}
	 */
	public set setConfig(config:ConfigType) {
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
	 * @param {Object} resolutionSettings - Various resolution types. See the ResolutionType interface for more details.
	 * @return {void}
	 */
	public initResources(resolutionSettings:{LOW:ResolutionType, MEDIUM:ResolutionType, HIGH:ResolutionType}):void {
		//Detect the current screen resolution.
		//The getResolution() method will return a Config.RESOLUTIONS object containing the width and height
		//which we will use to set the canvas' width and height.
		let resolution:ResolutionType = getResolution(resolutionSettings);

		//Set the canv as.
		this.canvasElement = <HTMLCanvasElement> document.querySelector("#canvas-layer");
		this.backgroundCanvasElement = <HTMLCanvasElement> document.querySelector("#background-layer");

		//Use the value from Config.RESOLUTIONS to update the canvas width and height.
		this.canvasElement.width = resolution.CANVAS_W;
		this.canvasElement.height = resolution.CANVAS_H;
		this.backgroundCanvasElement.width = resolution.W;
		this.backgroundCanvasElement.height = resolution.H;

		//Set the HTML5 2D drawing context.
		this.context = this.canvasElement.getContext("2d");
		this.backgroundContext = this.backgroundCanvasElement.getContext("2d");

		//Create a new Finite State Machine.
		this.finiteStateMachine = new FSM();
	}
}


