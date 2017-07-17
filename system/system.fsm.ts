/**
 * @file The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { TYPES } from '../bootstrap/bootstrap.types';
import { IStateData, IFsm, IStateStack, IState, IWindow, ICanvasResource } from './system.types';
import { StateStack } from './system.state-stack';
import { IResource } from '../game/game.types';
//import { injectable, inject } from '../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc The Fsm (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 */
@injectable()
export class Fsm implements IFsm {
	/**
	 * Events.
	 * @private
	 * @const
	 */
	private readonly onPushState: Event = new Event('onPushState');
	private readonly onPopState: Event = new Event('onPopState');

	/**
	 * @public
	 * @constructor
	 * @param {IStateStack} - An array data structure of game states.
	 * @param {object} _window
	 */
	public constructor(/*@inject(TYPES.StateStack)*/ private states: IStateStack = new StateStack(), private _window: IWindow = window) {}

	/**
	 * Handle logic in the current state.
	 * @public
	 * @param {number} dt - The delta time between the current and previous frames.
	 * @return {void}
	 */
	public update(dt: number): void {
		//If the games states array is not empty.
		if (!this.states.isEmpty()) {
			//Handle logic in the current state.
			this.states.peek().update(dt);
		}
	}

	/**
	 * Render the current state.
	 * @public
	 * @param {ICanvasResource} resource - An object containing the 2D drawing context and HTML5 canvas element.
	 * @return {void}
	 */
	public draw(resource: ICanvasResource): void {
		//TODO: Might want to consider removing this IF statement, it is an edge case.
		if (!this.states.isEmpty()) {
			//Handle drawing routines for the current state.
			this.states.peek().draw(resource);
		}
	}

	/**
	 * Pushes a new state on to the stack.
	 * @public
	 * @param {IState} state - A game state.
	 * @return {void}
	 */
	public push(state: IState): void {
		//Dispatch the 'onPushState' event.
		this._window.dispatchEvent(this.onPushState);

		//Pause the current state
		if (!this.states.isEmpty()) {
			this.states.peek().pause();
		}

		//Push a new state on to the stack.
		this.states.push(state);

		//Initiate the new state.
		this.states.peek().start();
	}

	/**
	 * Pops a state from the stack and optionally suspends the state.
	 * @public
	 * @param {boolean} stopCurrentState - Determines if we will stop the state.
	 * @throws {Error}
	 * @return {void}
	 */
	public pop(stopCurrentState: boolean = false): void {
		if (this.states.length > 1) {
			//Dispatch the 'onPopState' event.
			this._window.dispatchEvent(this.onPopState);

			//Determine if we will stop the current state before removing it.
			if (stopCurrentState) {
				this.states.peek().stop();
			}

			//Pop the current state.
			this.states.pop();

			//Resume the previous state.
			this.states.peek().play();
		}
		else {
			throw new Error('In Fsm.pop(). Attempting to remove the last state from the stack. At least one state should be on the stack at all times');
		}
	}
}
