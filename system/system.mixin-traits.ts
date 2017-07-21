/**
 * @file Mixins traits
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {FsmEvents, ICustomEventData, IFsm, IWindow} from './system.types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../bootstrap/inversify.types';

/**
 * @classdesc Emitable class mixin.
 */
@injectable()
export class Emitable {
	/**
	 * Dispatches a custom event.
	 * @event CustomEvent
	 * @param eventName
	 * @param detail
	 * @param element
	 */
	public emit?(eventName: FsmEvents, detail: ICustomEventData, element: IWindow = window): void {
		element.dispatchEvent(new CustomEvent(eventName, {'detail': detail}));
	}
}

/**
 * @classdesc Loader class mixin.
 * @requires jQuery
 */
@injectable()
export class Loader {
	/**
	 * @param $ - The jQuery library.
	 */
	constructor(@inject(TYPES.jQuery) public $: any) {}

	/**
	 * Loads data from a remote server.
	 * @param url - The URL.
	 * @param dataType - The type of data.
	 * @return {Promise<T>}
	 */
	public load<T>(url: string, dataType: string = 'json'): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.$.ajax({
				dataType: dataType,
				url: url,
				success: (json) => { resolve(json); },
				error: (err) => { reject(err); }
			});
		});
	}
}

/**
 * @classdesc FsmEvent class mixin.
 * @requires IFsm
 */
export class FsmEvent {
	/**
	 * @param fsm - Finite state machine.
	 */
	constructor(@inject(TYPES.Fsm) public fsm: IFsm) {}

	/**
	 * Handles pushState events.
	 * @param event - Event data that will be passed to the Fsm.push() method.
	 */
	public pushState(event: CustomEventInit): void {
		//Push another state on to the stack.
		this.fsm.push(event.detail);
	}

	/**
	 * Handles popState events.
	 * @param event - Event data that will be passed to the Fsm.pop() method.
	 */
	public popState(event: CustomEventInit): void {
		//Pop a state from the stack
		this.fsm.pop(event.detail);
	}
}
