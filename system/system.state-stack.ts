/**
 * @file StateStack class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IState, IStateStack } from './system.types';
import { injectable, decorate, unmanaged } from 'inversify';

//Here we decorate the 3rd party object.
decorate(injectable(), Array);
decorate(unmanaged(), Array, 0);

/**
 * @class
 * @classdesc StateStack class.
 */
@injectable()
export class StateStack extends Array<IState> implements IStateStack {
	/**
	 * @constructor
	 * @param {IState} state : IState
	 */
	public constructor(@unmanaged() state?: IState) {
		if (typeof state !== 'undefined') {
			super(state);
		}
		else {
			super();
		}
	}

	/**
	 * Checks to see if there are any states in the stack.
	 * @return {boolean}
	 */
	public isEmpty(): boolean {
		return (this.length === 0);
	}

	/**
	 * Retrieves current state.
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
