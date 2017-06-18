/**
 * @file The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { StateData, IState } from './system.types';
import {LoDashStatic} from '../node_modules/@types/lodash/index';

/**
 * @class
 * @classdesc The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 */
export class FSM {
	/**
	 * An array of game states.
	 * @const
	 * @private
	 */
	private readonly states: Array<IState> = [];

	/**
	 * Events.
	 * @const
	 * @private
	 */
	private readonly onPushState: Event = new Event('onPushState');
	private readonly onPopState: Event = new Event('onPopState');

	/**
	 * @constructor
	 * @requires module:Lodash
	 */
	public constructor(private _: LoDashStatic, private _window: any = window) {

	}

	/**
	 * Handle logic in the current state.
	 * @public
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public update(data: StateData): void {
		//If the games states array is not empty.
		if (!this._.isEmpty(this.states)) {
			//Use Lodash to grab the last element in the array.
			//Handle logic in the current state.
			this._.last(this.states).update(data);
		}
	}

	/**
	 * Render the current state.
	 * @public
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public draw(data: StateData): void {
		//NOTE: Might want to consider removing this IF statement, it is an edge case.
		if (!this._.isEmpty(this.states)) {
			//Handle drawing routines for the current state.
			this._.last(this.states).draw(data);
		}
	}

	/**
	 * Pushes a new state on to the stack.
	 * @public
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public push(data: StateData): void {
		//Dispatch the 'onPushState' event.
		this._window.dispatchEvent(this.onPushState);

		//Pause the current state
		if (!this._.isEmpty(this.states)) {
			this._.last(this.states).pause(data);
		}

		//Push a new state and invoke its constructor.
		this.states.push(data.state);

		//Initiate the new state.
		this._.last(this.states).start(data);
	}

	/**
	 * Pops a state from the stack and optionally suspends the state.
	 * @public
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @throws {Error}
	 * @return {void}
	 */
	public pop(data: StateData): void {
		if (this.states.length > 1) {
			//Dispatch the 'onPopState' event.
			this._window.dispatchEvent(this.onPopState);

			//Determine if we will pause the current state.
			if (data.pause) {
				this._.last(this.states).stop(data);
			}

			//Pop the current state.
			this.states.pop();

			//Resume the previous state.
			this._.last(this.states).play(data);
		}
		else {
			throw new Error('In FSM.pop(). Attempting to remove the last state from the stack. At least one state should be on the stack at all times');
		}
	}
}
