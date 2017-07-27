/**
 * @file Mixin class decorator.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/**
 * Mixin class decorator.
 * @param traits - The base class
 * @return {Function}
 */
export function Mixin(...traits: Function[]): Function {
	return function (target: Function) {
		traits.forEach(trait => {
			Object.getOwnPropertyNames(trait.prototype).forEach(key => {
				//Skip the constructor.
				if (key !== 'constructor') {
					const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(trait.prototype, key);
					target.prototype[key] = trait.prototype[key];

					//If this is an accessor descriptor.
					if (descriptor && typeof(descriptor.value) === 'undefined') {
						Object.defineProperty(target.prototype, key, descriptor);
					}
				}
			});
		});
	};
}
