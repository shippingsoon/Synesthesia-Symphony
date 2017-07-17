/**
 * @file StateStack class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IState, IStateStack } from './system.types';
import { injectable } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc StateStack
 */
//@injectable()
export class StateStack extends Array<IState> {
	/**
	 * @constructor
	 * @public
	 */
	public constructor() {
		super();
	}

	/**
	 * Checks to see if there are any states in the stack.
	 * @public
	 * @return {boolean}
	 */
	public isEmpty(): boolean {
		return this.length === 0;
	}

	/**
	 * Retrieves current state.
	 * @public
	 * @throws {Error}
	 * @return {IState}
	 */
	public peek(): IState {
		if (this.isEmpty()) {
			throw new Error('The StateStack is empty');
		}

		return this[this.length - 1];
	}
}
