/**
 * @file This singleton Game class is the program's entry point. It contains the main() function which acts as the game looop.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource, IFsm, IState } from '../system/system.types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../bootstrap/inversify.types';
import { IGame } from './game.types';
import { FsmEvent } from '../system/system.mixin-traits';
import { Mixin } from '../system/system.mixin';

/**
 * Game class.
 * @classdec This class contains the main game loop. It was originally a singleton but was refactored to use InversifyJS' singleton scope.
 * @requires IFsm
 * @requires IState
 * @requires ICanvasResource
 */
@Mixin(FsmEvent)
@injectable()
export class Game implements IGame, FsmEvent {
	//The current Unix timestamp in milliseconds. This is used to measure the delta time between two frames.
	private currentTime: number;

	//The long integer request ID which is returned by requestAnimationFrame() method. It can be used to break out of the game loop.
	private requestAnimationId: number;

	///The target frames per second. By default the requestAnimationFrame() runs at 60 FPS. Note: (1000 / 60) = 16.666666666666668.
	private readonly targetFps: number = (1000.0 / 60.0);

	//Mixins.
	//See FsmEvent class mixin for more details.
	public pushState: (event: CustomEventInit) => void;
	public popState: (event: CustomEventInit) => void;

	/**
	 * @param fsm - Finite state machine.
	 * @param initialState - The initial game state.
	 * @param resource - A data structure containing an HTML5 canvas element and 2D drawing context.
	 */
	public constructor(@inject(TYPES.Fsm) public readonly fsm: IFsm, @inject(TYPES.LoadSessionState) private readonly initialState: IState, @inject(TYPES.CanvasResource) private readonly resource: ICanvasResource) {
		//Transition to the initial game state.
		this.fsm.push(this.initialState);

		//Set the current time. DevNote: This originally used Date.now() but the performance API is more precise.
		this.currentTime =  performance.now() + performance.timing.navigationStart;

		//When the 'pushState' event is triggered.
		this.resource.canvas.addEventListener('pushState', this.pushState);

		//When the 'popState' event is triggered.
		this.resource.canvas.addEventListener('popState', this.popState);
	}

	/**
	 * The main game loop. This method is recursively invoked via the requestAnimationFrame() method which runs at 60 FPS.
	 * @param timestamp - The elapsed time from when the requestAnimationFrame() was invoked.
	 */
	public main(timestamp: number): void {
		//This variable holds the time that was stored in the previous frame.
		const previousTime: number = this.currentTime;

		//Update the current time.
		this.currentTime = performance.now() + performance.timing.navigationStart;

		//Delta time is the time difference between the current and previous frames. If dt is 0 we set a fallback value of 0.01.
		const dt: number = (this.currentTime - previousTime) || 0.01;

		//Handle logic in the current state.
		//If dt is greater than our target FPS we cap it off by substituting it with the target FPS value.
		this.fsm.update((dt > this.targetFps) ? this.targetFps : dt);

		//Render the current state.
		this.fsm.draw(this.resource);

		//Here we use the requestAnimationFrame() method to recursively invoke the main() method.
		this.requestAnimationId = requestAnimationFrame((time: number): void => this.main(time));
	}
}
