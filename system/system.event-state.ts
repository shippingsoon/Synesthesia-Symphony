/**
 * @file EventState class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { FsmEvents, IWindow, ICustomEventData } from './system.types';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { State } from './system.state';

/**
 * @class
 * @classdesc Event state class
 * @abstract
 */
@injectable()
export abstract class EventState extends State {
	/**
	 * Dispatches a custom event.
	 * @public
	 * @static
	 * @event emit
	 * @param {FsmEvents} eventName
	 * @param {ICustomEventData} detail
	 * @param {IWindow} _window
	 * @return {void}
	 */
	public static emit(eventName: FsmEvents, detail: ICustomEventData, _window: IWindow = window): void {
		_window.dispatchEvent(new CustomEvent(eventName, {'detail': detail}));
	}
}
