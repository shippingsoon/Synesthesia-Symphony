/**
 * @file The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {IFsm, IStack, IState, ICanvasResource} from './types';
import {injectable, inject} from 'inversify';
import {TYPES} from '../bootstrap/inversify.types';

/**
 * @classdesc The Fsm (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @requires IStack
 */
@injectable()
export class Fsm implements IFsm {
	/**
	 * @param states - An array data structure of game states.
	 */
	public constructor(@inject(TYPES.Stack) private states: IStack<IState>) {}

	/**
	 * Handle logic in the current state.
	 * @param dt - The delta time between the current and previous frames.
	 * @param resource - An object containing a 2D drawing context and HTML5 canvas element.
	 */
	public update(dt: number, resource: ICanvasResource): void {
		//If the games states array is not empty.
		if (!this.states.isEmpty()) {
			//Handle logic in the current state.
			this.states.peek().update(dt, resource);
		}
	}

	/**
	 * Render the current state.
	 * @param resource - An object containing the 2D drawing context and HTML5 canvas element.
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
	 * @param state - A game state.
	 */
	public push(state: IState): void {
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
	 * @param stopCurrentState - Determines if we will suspend the state before removing it.
	 * @throws {Error}
	 */
	public pop(stopCurrentState: boolean = false): void {
		if (this.states.length > 1) {
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
