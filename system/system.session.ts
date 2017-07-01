/**
 * @file The session class contains data and methods for managing the session. It contains configuration and game data that is asynchronously loaded.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IConfig, IResolution } from './system.types';

//Tell the TypeScript compiler we are using the jQuery library.
declare const jQuery: any;

/**
 * @class
 * @classdesc This class contains various configuration and game data.
 */
export class Session {
	/**
	 * HTML5 canvas element.
	 * @private
	 */
	private canvasElement: HTMLCanvasElement;
	private backgroundCanvasElement: HTMLCanvasElement;

	/**
	 * HTML5 2D drawing context.
	 * @private
	 */
	private context: CanvasRenderingContext2D;
	private backgroundContext: CanvasRenderingContext2D;

	/**
	 * The instantaneous frames per second.
	 * @private
	 */
	private framesPerSecond: number;

	/**
	 * This variable holds ReadOnly configuration data.
	 * @private
	 */
	private configData: IConfig;

	/**
	 * This variable holds various data used to initialize enemies, items, and projectile patterns.
	 * @private
	 */
	private gameData: any;

	/**
	 * The request ID that is returned from the requestAnimationFrame() method. This can be used to stop the requestAnimationFrame() loop.
	 * @private
	 */
	private animationFrameId: number;

	/**
	 * Background music volume level. This determines how loud the music is.
	 * @private
	 */
	private bgmVolumeLevel: number = 127;

	/**
	 * The sound effects volume level. This determines how loud the sound effects is.
	 * @private
	 */
	private sfxVolumeLevel: number = 127;

	/**
	 * @constructor
	 * @public
	 * @param {any} _window
	 */
	public constructor(private _window: any = window) {
		//When the user resizes the window, invoke the initResources() method to update the canvas' width and height, among other things.
		this._window.addEventListener('resize', () => {
			this.initResources(this.configData.RESOLUTIONS);
		});
	}

	/**
	 * Loads configuration data from a JSON file or remote database.
	 * @public
	 * @param {string} url - The URL to request data from. See the CONFIG.json and offline-data.json files to see what type of data this function handles.
	 * @return {Promise<void>}
	 */
	public load(url: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			jQuery.ajax({
				dataType: 'json',
				url: url,
				success: (json) => { resolve(json); },
				error: (err) => { reject(err); }
			});
		});
	}

	/**
	 * Saves configuration data to a remote database via a RESTful JSON API.
	 * @public
	 * @param {string} url - The URL of the RESTFul API that we will send data to.
	 * @param {IConfig} config - The configuration data we will be saving.
	 * @return {Promise<void>}
	 */
	public save(url: string, config: IConfig): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			jQuery.ajax({
				dataType: 'json',
				type: 'POST',
				url: url,
				data: config,
				success: (json) => { resolve(json); },
				error: (err) => { reject(err); }
			});
		});
	}

	/**
	 * Get the canvas element.
	 * @public
	 * @return {HTMLCanvasElement}
	 */
	public get canvas(): HTMLCanvasElement {
		return this.canvasElement;
	}

	/**
	 * Get the background canvas element.
	 * @public
	 * @return {HTMLCanvasElement}
	 */
	public get backgroundCanvas(): HTMLCanvasElement {
		return this.backgroundCanvasElement;
	}

	/**
	 * Gets the 2D drawing context.
	 * @public
	 * @return {CanvasRenderingContext2D}
	 */
	public get ctx(): CanvasRenderingContext2D {
		return this.context;
	}

	/**
	 * Gets the 2D drawing context for the background.
	 * @public
	 * @return {CanvasRenderingContext2D}
	 */
	public get getBackgroundCtx(): CanvasRenderingContext2D {
		return this.backgroundContext;
	}

	/**
	 * Set the instantaneous frames per second counter.
	 * @public
	 * @param {number} fps
	 */
	public set setFPS(fps: number) {
		this.framesPerSecond = fps;
	}

	/**
	 * Get the instantaneous frames per second.
	 * @public
	 * @return {number}
	 */
	public get getFPS(): number {
		return this.framesPerSecond;
	}

	/**
	 * Get the CONFIG data.
	 * @public
	 * @return {IConfig}
	 */
	public get CONFIG(): IConfig {
		return this.configData;
	}

	/**
	 * Get the animationFrameId.
	 * @public
	 * @param {number} animationFrameId
	 * @return {void}
	 */
	public set setAnimationFrameId(animationFrameId: number) {
		this.animationFrameId = animationFrameId;
	}

	/**
	 * Sets the configData.
	 * @public
	 * @param {IConfig} config - The readonly configuration data.
	 * @return {void}
	 */
	public set setConfig(config: IConfig) {
		this.configData = config;
	}

	/**
	 * Gets the game data.
	 * @public
	 * @return {any}
	 */
	public get getGameData(): any {
		return this.gameData;
	}

	/**
	 * Sets the game data.
	 * @public
	 * @param {any} gameData - Various game data used to initialize enemies, items, and projectile patterns.
	 * @return {void}
	 */
	public set setGameData(gameData: any) {
		this.gameData = gameData;
	}

	/**
	 * Sets the background music volume level.
	 * @public
	 * @param {number} bmgVolumeLevel - How loud we want the music to be.
	 * @return {void}
	 */
	public set setBGMVolume(bmgVolumeLevel: number) {
		this.bgmVolumeLevel = bmgVolumeLevel;
	}

	/**
	 * Gets the background music volume level.
	 * @public
	 * @return {number}
	 */
	public get getBGMVolume() {
		return this.bgmVolumeLevel;
	}

	/**
	 * Sets the sound effects volume level.
	 * @public
	 * @param {number} sfxVolumeLevel - How loud we want the sfx to be.
	 * @return {void}
	 */
	public set setSFXVolume(sfxVolumeLevel: number) {
		this.sfxVolumeLevel = sfxVolumeLevel;
	}

	/**
	 * Gets the sound effects volume level.
	 * @public
	 * @return {number}
	 */
	public get getSFXVolume() {
		return this.sfxVolumeLevel;
	}

	/**
	 * This method initiates resources such as the HTML5 canvas element and 2D drawing context.
	 * @public
	 * @param {Object} resolutionSettings - Various resolution types. See the IResolution interface for more details.
	 * @return {void}
	 */
	public initResources(resolutionSettings: {readonly LOW: IResolution, readonly MEDIUM: IResolution, readonly HIGH: IResolution}): void {
		//Detect the current screen resolution.
		//The getResolution() method will return a Config.RESOLUTIONS object containing the width and height
		//which we will use to set the canvas' width and height.
		const resolution: IResolution = getResolution(resolutionSettings);

		//Set the canvas.
		this.canvasElement = <HTMLCanvasElement> document.querySelector('#canvas-layer');
		this.backgroundCanvasElement = <HTMLCanvasElement> document.querySelector('#background-layer');

		//Use the value from Config.RESOLUTIONS to update the canvas width and height.
		this.canvasElement.width = resolution.CANVAS_W;
		this.canvasElement.height = resolution.CANVAS_H;
		this.backgroundCanvasElement.width = resolution.W;
		this.backgroundCanvasElement.height = resolution.H;

		//Set the HTML5 2D drawing context.
		this.context = this.canvasElement.getContext('2d');
		this.backgroundContext = this.backgroundCanvasElement.getContext('2d');
	}
}

/**
 * This method tries to detect the screen resolution. It returns an object containing a width and height.
 * @param {IResolution} resolutions - The screen resolutions.
 * @return {IResolution}
 */
export function getResolution(resolutions: {LOW: IResolution, MEDIUM: IResolution, HIGH: IResolution}): IResolution {
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
