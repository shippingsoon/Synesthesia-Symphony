/**
 * @file Mixin Traits
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { FsmEvents, ICustomEventData, IWindow } from './system.types';

/**
 * @class
 * @classdesc Emitable class.
 */
class Emitable {
	/**
	 * Dispatches a custom event.
	 * @event CustomEvent
	 * @param {FsmEvents} eventName
	 * @param {ICustomEventData} detail
	 * @param {IWindow} _window
	 * @return {void}
	 */
	public emit(eventName: FsmEvents, detail: ICustomEventData, _window: IWindow = window): void {
		_window.dispatchEvent(new CustomEvent(eventName, {'detail': detail}));
	}
}

export { Emitable };
