/**
 * @file This singleton Game class is the program's entry point. It contains the main() function which acts as the game looop.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { ICanvasResource, IFsm, IState, IWindow } from '../system/system.types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../bootstrap/bootstrap.types';

/**
 * @class
 * @classdesc Singleton Game class.
 * @requires IFsm
 * @requires IState
 * @requires ICanvasResource
 */
@injectable()
export class Game {
	//The current Unix timestamp in milliseconds. This is used to measure the delta time between two frames.
	private currentTime: number = Date.now();

	//The long integer request ID which is returned by requestAnimationFrame() method. It can be used to break out of the game loop.
	private requestAnimationId: number;

	///The target frames per second. By default the requestAnimationFrame() runs at 60 FPS. Note: (1000 / 60) = 16.666666666666668.
	private readonly targetFps: number = 16.666666666666668;

	//A data structure containing HTML5 canvas elements and 2D drawing contexts.
	@inject(TYPES.CanvasResource) private readonly canvasResource: ICanvasResource;

	/**
	 * @constructor
	 * @param {IFsm} fsm - Finite state machine.
	 * @param {IState} initialState - The initial game state.
	 * @param {IWindow} _window
	 */
	public constructor(@inject(TYPES.Fsm) private readonly fsm: IFsm, @inject(TYPES.LoadState) private readonly initialState: IState, private _window: IWindow = window) {
		//Transition to the initial game state.
		this.fsm.push(this.initialState);

		//When the 'pushState' event is triggered.
		this._window.addEventListener('pushState', this.__pushState);

		//When the 'popState' event is triggered.
		this._window.addEventListener('popState', this.__popState);
	}

	/**
	 * This is the program's entry point. This method is recursively invoked via the requestAnimationFrame() method.
	 * @return {void}
	 */
	public main(): void {
		//This variable holds the time that was stored in the previous frame.
		const previousTime: number = this.currentTime;

		//Update the current time.
		this.currentTime = Date.now();

		//Delta time is the time difference between the current and previous frames.
		let dt: number = this.currentTime - previousTime;

		//Check to see if the delta time is zero.
		if (dt === 0) {
			//throw new Error('Delta time is zero');
			//console.log('Delta is zero');
			dt = 0.1;
		}

		//Here we use the requestAnimationFrame() method to recursively invoke the main() method.
		this.requestAnimationId = requestAnimationFrame(() => this.main());

		//Limit the frame rate.
		if (dt > this.targetFps) {
			dt = this.targetFps;
		}

		//Handle logic in the current state.
		this.fsm.update(dt);

		//Render the current state.
		this.fsm.draw(this.canvasResource);
	}

	/**
	 * Handles pushState events.
	 * @param {CustomEventInit} event - Event data.
	 * @return {void}
	 */
	private __pushState(event: CustomEventInit): void {
		//Push another state on to the stack.
		this.fsm.push(event.detail);
	}

	/**
	 * Handles popState events.
	 * @param {CustomEventInit} event - Event data.
	 * @return {void}
	 */
	private __popState(event: CustomEventInit): void {
		//Pop a state from the stack
		this.fsm.pop(event.detail);
	}
}
