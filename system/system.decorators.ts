/**
 * @file Decorators
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/**
 * Can be used to changed the enumarable state of a property descriptor.
 * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty} for more details.
 * @param isEnumarable - Determines if the property will be enumerable.
 * @return {Function}
 */
export function enumarable(isEnumarable: boolean = true): Function {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.enumerable = isEnumarable;
		return descriptor;
	};
}

/**
 * Can be used to changed the writable state of a property descriptor.
 * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty} for more details.
 * @param isWritable - Determines if the property will be writable.
 * @return {Function}
 */
export function writable(isWritable: boolean = true): Function {
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.writable = isWritable;
		return descriptor;
	};
}

/**
 * Can be used to changed the configurable state of a property descriptor.
 * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty} for more details.
 * @param isConfigurable - Determines if the property will be configurable.
 * @return {Function}
 */
export function configurable(isConfigurable: boolean = true): Function {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.configurable = isConfigurable;
		return descriptor;
	};
}

/**
 * Can be used to set the value of a property.
 * @see {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty} for more details.
 * @param value - The value to set.
 * @return {Function}
 */
export function value(value: any) {
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.value = value;
		return descriptor;
	};
}
