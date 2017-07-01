/**
 * @file The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import {IStateData, IFSM, IStateStack, IState} from './system.types';

/**
 * @class
 * @classdesc The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 */
export class FSM implements IFSM {
	/**
	 * Events.
	 * @const
	 * @private
	 */
	private readonly onPushState: Event = new Event('onPushState');
	private readonly onPopState: Event = new Event('onPopState');

	/**
	 * @constructor
	 * @param {IStateStack} - An array data structure of game states.
	 * @param {object} _window
	 */
	public constructor(private states: IStateStack, private _window: any = window) {}

	/**
	 * Handle logic in the current state.
	 * @public
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public update(data: IStateData): void {
		//If the games states array is not empty.
		if (!this.states.isEmpty()) {
			//Use Lodash to grab the last element in the array.
			//Handle logic in the current state.
			this.states.peek().update(data);
		}
	}

	/**
	 * Render the current state.
	 * @public
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public draw(data: IStateData): void {
		//NOTE: Might want to consider removing this IF statement, it is an edge case.
		if (!this.states.isEmpty()) {
			//Handle drawing routines for the current state.
			this.states.peek().draw(data);
		}
	}

	/**
	 * Pushes a new state on to the stack.
	 * @public
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public push(state: IState): void {
		//Dispatch the 'onPushState' event.
		this._window.dispatchEvent(this.onPushState);

		//Pause the current state
		if (!this.states.isEmpty()) {
			//this.states.peek().pause(data);
		}

		//Push a new state on to the stack.
		this.states.push(state);

		//Initiate the new state.
		this.states.peek().start({state: state});
	}

	/**
	 * Pops a state from the stack and optionally suspends the state.
	 * @public
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @throws {Error}
	 * @return {void}
	 */
	public pop(data: IStateData): void {
		if (this.states.length > 1) {
			//Dispatch the 'onPopState' event.
			this._window.dispatchEvent(this.onPopState);

			//Determine if we will pause the current state.
			if (data.pause) {
				this.states.peek().stop(data);
			}

			//Pop the current state.
			this.states.pop();

			//Resume the previous state.
			this.states.peek().play(data);
		}
		else {
			throw new Error('In FSM.popState(). Attempting to remove the last state from the stack. At least one state should be on the stack at all times');
		}
	}
}
