/**
 * @file CanvasResource singleton class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {injectable, unmanaged} from 'inversify';
import {ICanvasResource} from '../system/types';

/**
 * @classdesc This class contains various configuration and game data.
 */
@injectable()
export class CanvasResource implements ICanvasResource {
	//HTML5 canvas element.
	private readonly _canvas: HTMLCanvasElement;
	private readonly _bgCanvas: HTMLCanvasElement;

	//HTML5 2D drawing context.
	private readonly _ctx: CanvasRenderingContext2D;
	private readonly _bgCtx: CanvasRenderingContext2D;

	/**
	 * @param canvas
	 * @param bgCanvas
	 */
	public constructor(@unmanaged() canvas?: HTMLCanvasElement, @unmanaged() bgCanvas?: HTMLCanvasElement) {
		//TODO: Remove these hard coded lines of code.
		this._canvas = canvas ? canvas : <HTMLCanvasElement> document.querySelector('#canvas-layer');
		this._bgCanvas = bgCanvas ? canvas : <HTMLCanvasElement> document.querySelector('#background-layer');
		this._ctx = this.canvas.getContext('2d');
		this._bgCtx = this.bgCanvas.getContext('2d');
		this._canvas.width = 768;
		this._canvas.height = 672;
		this._bgCanvas.width = 1280;
		this._bgCanvas.width = 720;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the canvas element.
	 * @return {HTMLCanvasElement}
	 */
	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}

	/**
	 * Gets the background canvas element.
	 * @return {HTMLCanvasElement}
	 */
	public get bgCanvas(): HTMLCanvasElement {
		return this._bgCanvas;
	}

	/**
	 * Gets the 2D drawing context.
	 * @return {CanvasRenderingContext2D}
	 */
	public get ctx(): CanvasRenderingContext2D {
		return this._ctx;
	}

	/**
	 * Gets the 2D drawing context for the background.
	 * @return {CanvasRenderingContext2D}
	 */
	public get bgCtx(): CanvasRenderingContext2D {
		return this._bgCtx;
	}
	//#endregion
}
