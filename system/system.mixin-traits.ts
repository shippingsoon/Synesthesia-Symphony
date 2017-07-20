/**
 * @file Mixins traits
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { FsmEvents, ICustomEventData, IWindow } from './system.types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../bootstrap/inversify.types';

/**
 * @classdesc Emitable class mixin.
 */
@injectable()
class Emitable {
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
class Loader {
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

	/**
	 * @param $ - The jQuery library.
	 */
	constructor(@inject(TYPES.jQuery) public $: any) {}
}

export { Emitable, Loader };