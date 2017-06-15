/**
 * @file The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { StateData } from './system';
import { State } from './system.state';
import _ from 'lodash';

declare let window: any;

/**
 * @class
 * @classdesc The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 */
export class FSM {
	//An array of game states.
	private readonly states: Array<State> = new Array();
	private readonly onPushState: Event = new Event('onPushState');
	private readonly onPopState: Event = new Event('onPopState');

	/**
	 * Constructor
	 */
	public constructor() {

	}

	/**
	 * Handle logic in the current state.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public update(data: StateData): void {
		//If the games states array is not empty.
		if (!_.isEmpty(this.states)) {
			//Use Lodash to grab the last element in the array.
			//Handle logic in the current state.
			_.last(this.states).update(data);
		}
	}

	/**
	 * Render the current state.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public draw(data: StateData): void {
		//NOTE: Might want to consider removing this IF statement, it is an edge case.
		if (!_.isEmpty(this.states)) {
			//Handle drawing routines for the current state.
			_.last(this.states).draw(data);
		}
	}

	/**
	 * Pushes a new state on to the stack.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public push(data: StateData): void {
		//Dispatch the 'onPushState' event.
		window.dispatchEvent(this.onPushState);

		//Pause the current state
		if (!_.isEmpty(this.states)) {
			_.last(this.states).pause(data);
		}

		//Push a new state and invoke its constructor.
		this.states.push(data.state);

		//Initiate the new state.
		_.last(this.states).start(data);
	}

	/**
	 * Pops a state from the stack and optionally suspends the state.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @throws {Error}
	 * @return {void}
	 */
	public pop(data: StateData): void {
		if (this.states.length > 1) {
			//Dispatch the 'onPopState' event.
			window.dispatchEvent(this.onPopState);

			//Determine if we will pause the current state.
			if (data.pause) {
				_.last(this.states).stop(data);
			}

			//Pop the current state.
			this.states.pop();

			//Resume the previous state.
			_.last(this.states).play(data);
		}
		else {
			throw new Error('In FSM.pop(). Attempting to remove the last state from the stack. At least one state should be on the stack at all times');
		}
	}
}
