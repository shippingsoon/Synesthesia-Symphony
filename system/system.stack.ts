/**
 * @file Stack class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IStack } from './system.types';
import { injectable, decorate, unmanaged } from 'inversify';

//Here we decorate the 3rd party object.
decorate(injectable(), Array);
decorate(unmanaged(), Array, 0);

/**
 * @classdesc Stack class.
 */
@injectable()
export class Stack<T> extends Array<T> implements IStack<T> {
	/**
	 * @template T
	 * @param {T} value - The value to be pushed on the stack.
	 */
	public constructor(@unmanaged() value?: T) {
		if (typeof value !== 'undefined') {
			super(value);
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
	 * @template T
	 * @throws {Error}
	 * @return {T}
	 */
	public peek(): T {
		if (this.isEmpty()) {
			throw new Error('The Stack is empty');
		}

		return this[this.length - 1];
	}
}
