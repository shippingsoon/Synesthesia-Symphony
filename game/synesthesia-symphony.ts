/**
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @module SynesthesisaSymphony
 */

import { FSM } from '../system/system.fsm';
import { Session } from '../system/system.session';
import _ from 'lodash';

/**
 * @class
 * @classdesc - This singleton class contains state data and routines that will be used by various modules.
 */
class SynesthesisaSymphony {
	/**
	 * Static instance of the SynesthesisaSymphony class.
	 * @private
	 * @static
	 */
	private static _instance: SynesthesisaSymphony;

	/**
	 * Returns an instance of this class.
	 * @public
	 * @static
	 * @return {SynesthesisaSymphony}
	 */
	public static getInstance(): SynesthesisaSymphony {
		//Create an instance if it does not exists.
		if (!SynesthesisaSymphony._instance) {
			SynesthesisaSymphony._instance = new SynesthesisaSymphony(new FSM(_), new Session(), window);
		}

		return SynesthesisaSymphony._instance;
	}

	/**
	 * Handles pushState events.
	 * @param {StateData} event - Event data.
	 * @return {void}
	 */
	private __pushState(event: CustomEventInit): void {
		//Push another state on to the stack.
		this.fsm.push(event.detail);
	}

	/**
	 * Handles popState events.
	 * @param {StateData} event - Event data.
	 * @return {void}
	 */
	private __popState(event: CustomEventInit): void {
		//Pop a state from the stack
		this.fsm.pop(event.detail);
	}

	/**
	 * Removes the event listeners.
	 * @return {void}
	 */
	public __removeEventListeners(): void {
		//Remove the event listeners.
		//this._window.removeEventListener('pushState', this.__pushState, false);
		//this._window.removeEventListener('popState', this.__popState, false);
	}

	/**
	 * We are setting the construtor to private to prevent this class from being instantiated outside the class body or extended.
	 * @constructor
	 * @private
	 * @param {FSM} fsm - Finite state machine class.
	 * @param {Session} session - Session class.
	 */
	private constructor(public readonly fsm: FSM, public readonly session: Session, private _window = window) {
		//When the 'pushState' event is triggered.
		this._window.addEventListener('pushState', this.__pushState);

		//When the 'popState' event is triggered.
		this._window.addEventListener('popState', this.__popState);
	}
}

export { SynesthesisaSymphony as singleton }
