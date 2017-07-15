/**
 * @file This singleton Game class is the program's entry point. It contains the main() function which acts as the game looop.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IFSM, IState } from '../system/system.types';
import { IConfig, IResource } from './game.types';

/**
 * @class
 * @classdesc Singleton Game class.
 * @requires IFSM
 * @requires IState
 */
export class Game {
	/**
	 * @private
	 * @static
	 */
	private static resource: IResource;
	private static config: IConfig;

	/**
	 * An instance of this Game class.
	 * @private
	 * @static
	 */
	private static _instance: Game;

	/**
	 * The current Unix timestamp in milliseconds. This is used to measure the delta time between two frames.
	 * @private
	 * @static
	 */
	private static currentTime: number = Date.now();

	/**
	 * The long integer request ID which is returned by requestAnimationFrame() method. It can be used to break out from the game loop.
	 * @private
	 * @static
	 */
	private static requestAnimationId: number;

	/**
	 * Finite state machine.
	 * @private
	 */
	private readonly fsm: IFSM;

	/**
	 * This method returns an instance of the Game class.
	 * @public
	 * @static
	 * @throws {Error}
	 * @param {IFSM} fsm - Finite state machine
	 * @param {IState} initialState - Initial game state.
	 * @return {Game} Returns an instance of the Game class.
	 */
	public static getInstance(fsm: IFSM = null, initialState: IState = null): Game {
		if (!Game._instance && fsm !== null && initialState !== null) {
			Game._instance = new Game(fsm, initialState);
		}

		//Make sure an instance of this class was created.
		if (!Game._instance) {
			throw new Error('Game class was not initiated');
		}

		return Game._instance;
	}

	/**
	 * This is the program's entry point. This method is recursively invoked via the requestAnimationFrame() method.
	 * @public
	 * @return {void}
	 */
	public main(): void {
		//This variable holds the time that was stored in the previous frame.
		const previousTime: number = Game.currentTime;

		//The target frames per second. By default the requestAnimationFrame() runs at 60 FPS. Note: (1000 / 60) = 16.666666666666668.
		const targetFps: number = 16.666666666666668;

		//Update the current time.
		Game.currentTime = Date.now();

		//Delta time is the time difference between the current and previous frames.
		let dt: number = Game.currentTime - previousTime;

		//Check to see if the delta time is zero.
		if (dt === 0) {
			//throw new Error('Delta time is zero');
			//console.log('Delta is zero');
			dt = 0.1;
		}

		//Here we use the requestAnimationFrame() method to recursively invoke the main() method.
		Game.requestAnimationId = requestAnimationFrame(this.main);

		//Limit the frame rate.
		if (dt > targetFps) {
			dt = targetFps;
		}

		//Handle logic in the current state.
		Game._instance.fsm.update(dt);

		//Render the current state.
		Game._instance.fsm.draw(Game.resource);
	}

	/**
	 * We are setting the constructor to private to prevent this class from being instantiated outside the class body or extended.
	 * @constructor
	 * @private
	 * @param {IFSM} fsm - Finite state machine.
	 * @param {IState} initialState - This can be any game state.
	 *
	 */
	private constructor(fsm: IFSM, initialState: IState, resource: IResource = null, config: IConfig = null) {
		//Set the finite state machine.
		this.fsm = fsm;

		//Transition to the initial game state.
		this.fsm.push(initialState);
	}
}
