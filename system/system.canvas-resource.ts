/**
 * @file The session class contains data and methods for managing the session. It contains configuration and game data that is asynchronously loaded.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

//import { injectable } from '../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { ICanvasResource } from './system.types';

/**
 * @class
 * @classdesc This class contains various configuration and game data.
 */
@injectable()
export class CanvasResource implements ICanvasResource {
	/**
	 * HTML5 canvas element.
	 * @private
	 */
	private _canvas: HTMLCanvasElement;
	private _bgCanvas: HTMLCanvasElement;

	/**
	 * HTML5 2D drawing context.
	 * @private
	 */
	private _ctx: CanvasRenderingContext2D;
	private _bgCtx: CanvasRenderingContext2D;

	/**
	 * @public
	 * @constructor
	 */
	public constructor(canvas: HTMLCanvasElement = null, bgCanvas: HTMLCanvasElement = null) {
		this._canvas = (canvas) ? canvas : <HTMLCanvasElement>document.getElementById('canvas-layer');
		this._bgCanvas = (bgCanvas) ? bgCanvas : <HTMLCanvasElement>document.getElementById('background-layer');
		this._ctx = this.canvas.getContext('2d');
		this._bgCtx = this.bgCanvas.getContext('2d');
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Get the canvas element.
	 * @public
	 * @return {HTMLCanvasElement}
	 */
	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}

	/**
	 * Get the background canvas element.
	 * @public
	 * @return {HTMLCanvasElement}
	 */
	public get bgCanvas(): HTMLCanvasElement {
		return this._bgCanvas;
	}

	/**
	 * Gets the 2D drawing context.
	 * @public
	 * @return {CanvasRenderingContext2D}
	 */
	public get ctx(): CanvasRenderingContext2D {
		return this._ctx;
	}

	/**
	 * Gets the 2D drawing context for the background.
	 * @public
	 * @return {CanvasRenderingContext2D}
	 */
	public get bgCtx(): CanvasRenderingContext2D {
		return this._bgCtx;
	}
	//#endregion
}
