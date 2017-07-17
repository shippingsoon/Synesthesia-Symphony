/**
 * @file SynesthesisaSymphony singleton class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @module SynesthesisaSymphony
 */

import { TYPES } from '../bootstrap/bootstrap.types';
import { IFsm, IWindow } from '../system/system.types';
import { Fsm } from '../system/system.fsm';
import { CanvasResource } from '../system/system.canvas-resource';
import { StateStack} from '../system/system.state-stack';
//import { injectable, inject } from '../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc - This singleton class contains state data and routines that will be used by various modules.
 */
@injectable()
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
			//SynesthesisaSymphony._instance = new SynesthesisaSymphony(new Fsm(new StateStack()), new CanvasResource(), window);
		}

		return SynesthesisaSymphony._instance;
	}

	/**
	 * Handles pushState events.
	 * @param {IStateData} event - Event data.
	 * @return {void}
	 */
	private __pushState(event: CustomEventInit): void {
		//Push another state on to the stack.
		this.fsm.push(event.detail);
	}

	/**
	 * Handles popState events.
	 * @param {IStateData} event - Event data.
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
	 * @param {Fsm} fsm - Finite state machine class.
	 * @param {CanvasResource} session - CanvasResource class.
	 */
	private constructor(@inject(TYPES.Fsm) public readonly fsm: IFsm, @inject(TYPES.Session) public readonly session: CanvasResource, private _window: any = window) {
		//When the 'pushState' event is triggered.
		this._window.addEventListener('pushState', this.__pushState);

		//When the 'popState' event is triggered.
		this._window.addEventListener('popState', this.__popState);
	}
}

export { SynesthesisaSymphony as singleton }
