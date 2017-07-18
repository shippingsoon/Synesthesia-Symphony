/**
 * @file Color class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IColor } from './graphics.types';
import { injectable, inject, unmanaged } from 'inversify';
import { TYPES, Lodash } from '../bootstrap/bootstrap.types';

/**
 * @class
 * @classdesc Creates an object containing RGBA components.
 * @requires Lodash
 */
@injectable()
export class Color implements IColor {
	//The red value of this color.
	protected _r: number;

	//The green value of this color.
	protected _g: number;

	//The blue value of this color.
	protected _b: number;

	//The transparency of this color.
	protected _a: number;

	/**
	 * Color constructor.
	 * @constructor
	 * @param {number} r - A numerical representation of the red value. This number must be between 0-255.
	 * @param {number} g - A numerical representation of the green value. This number must be between 0-255.
	 * @param {number} b - A numerical representation of the blue value. This number must be between 0-255.
	 * @param {number} a - Determines the transparency of the color. This number must be between 0-1.
	 * @param {Lodash} _ - 3rd party utility library.
	 * @throws {Error}
	 */
	public constructor(@unmanaged() {r = 0, g = 0, b = 0, a = 1}: {readonly r?: number, readonly g?: number, readonly b?: number, readonly a?: number}, @inject(TYPES.Lodash) private _: Lodash) {
		//Set the colors.
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ IDEA)
	/**
	 * Gets the red component.
	 * @return {number}
	 */
	public get r(): number {
		return this._r;
	}

	/**
	 * Sets the red component.
	 * @param {number} red - A numerical representation of the red value. This number must be between 0-255.
	 * @throws {Error}
	 * @return {void}
	 */
	public set r(red: number) {
		if (!this._.inRange(red, 0, 256)) {
			throw new Error('Red value must be between 0-255');
		}

		this._r = red;
	}

	/**
	 * Gets the green component.
	 * @return {number}
	 */
	public get g(): number {
		return this._g;
	}

	/**
	 * Sets the green component.
	 * @param {number} green - A numerical representation of the green value. This number must be between 0-255.
	 * @throws {Error}
	 * @return {void}
	 */
	public set g(green: number) {
		if (!this._.inRange(green, 0, 256)) {
			throw new Error('Green value must be between 0-255');
		}

		this._g = green;
	}

	/**
	 * Gets the blue component.
	 * @return {number}
	 */
	public get b(): number {
		return this._b;
	}

	/**
	 * Sets the blue component.
	 * @param {number} blue - A numerical representation of the blue value. This number must be between 0-255.
	 * @throws {Error}
	 * @return {void}
	 */
	public set b(blue: number) {
		if (!this._.inRange(blue, 0, 256)) {
			throw new Error('Blue value must be between 0-255');
		}

		this._b = blue;
	}

	/**
	 * Gets the alpha component.
	 * @return {number}
	 */
	public get a(): number {
		return this._a;
	}

	/**
	 * Sets the alpha component.
	 * @param {number} alpha - Determines the transparency of the color. This number must be between 0-1.
	 * @throws {Error}
	 * @return {void}
	 */
	public set a(alpha: number) {
		if (!this._.inRange(alpha, 0, 2)) {
			throw new Error('Alpha value must be between 0-1');
		}

		this._a = alpha;
	}
	//#endregion
}
