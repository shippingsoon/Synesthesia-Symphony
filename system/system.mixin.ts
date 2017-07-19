/**
 * @file Mixin class decorator.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/**
 * Mixin class decorator.
 * @param traits
 * @return {Function}
 */
export function Mixin(...traits: Function[]): Function {
	return function (target: Function) {
		traits.forEach(trait => {
			Object.getOwnPropertyNames(trait.prototype).forEach(name => {
				target.prototype[name] = trait.prototype[name];
			});
		});
	};
}
