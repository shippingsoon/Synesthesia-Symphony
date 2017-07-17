/**
 * @file The color
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @module Color
 */

'use strict';

import { IColor } from './graphics.types';
//import { injectable } from '../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc Creates an object containing RGBA components.
 */
@injectable()
export class Color implements IColor {
	/**
	 * The red value of this color.
	 * @private
	 */
	protected _r: number;

	/**
	 * The green value of this color.
	 * @private
	 */
	protected _g: number;

	/**
	 * The blue value of this color.
	 * @private
	 */
	protected _b: number;

	/**
	 * The transparency of this color.
	 * @private
	 */
	protected _a: number;

	/**
	 * This method makes sure the colors are in the 0-255 range and it also makes sure the alpha value is between 0-1.
	 * @public
	 * @static
	 * @param {IColor} color - The color to be checked.
	 * return {boolean}
	 */
	public static isValidColor(color: IColor): boolean {
		return (
			[color.r, color.g, color.b].filter(rgb => rgb >= 0 && rgb <= 255).length === 3 &&
			color.a >= 0 && color.a <= 255
		);
	}

	/**
	 * Color constructor.
	 * @public
	 * @constructor
	 * @param {number} r - A numerical representation of the red value. This number must be between 0-255.
	 * @param {number} g - A numerical representation of the green value. This number must be between 0-255.
	 * @param {number} b - A numerical representation of the blue value. This number must be between 0-255.
	 * @param {number} a - Determines the transparency of the color. This number must be between 0-1.
	 * @throws {Error}
	 */
	public constructor({r = 0, g = 0, b = 0, a = 1}: {readonly r?: number, readonly g?: number, readonly b?: number, readonly a?: number}) {
		//Set the colors.
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;

		if (!Color.isValidColor({r: r, g: g, b: b, a: a})) {
			throw new Error(`Invalid RGBA colors: rgba(${r}, ${g}, ${b}, ${a})`)
		}
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ IDEA)
	/**
	 * Gets the red component.
	 * @public
	 * @return {number}
	 */
	public get r(): number {
		return this._r;
	}

	/**
	 * Sets the red component.
	 * @public
	 * @param {number} red - A numerical representation of the red value. This number must be between 0-255.
	 * @return {void}
	 */
	public set r(red: number) {
		this._r = red;
	}

	/**
	 * Gets the green component.
	 * @public
	 * @return {number}
	 */
	public get g(): number {
		return this._g;
	}

	/**
	 * Sets the green component.
	 * @public
	 * @param {number} green - A numerical representation of the green value. This number must be between 0-255.
	 * @return {void}
	 */
	public set g(green: number) {
		this._g = green;
	}

	/**
	 * Gets the blue component.
	 * @public
	 * @return {number}
	 */
	public get b(): number {
		return this._b;
	}

	/**
	 * Sets the blue component.
	 * @public
	 * @param {number} blue - A numerical representation of the blue value. This number must be between 0-255.
	 * @return {void}
	 */
	public set b(blue: number) {
		this._b = blue;
	}

	/**
	 * Gets the alpha component.
	 * @public
	 * @return {number}
	 */
	public get a(): number {
		return this._a;
	}

	/**
	 * Sets the alpha component.
	 * @public
	 * @param {number} alpha - Determines the transparency of the color. This number must be between 0-1.
	 * @return {void}
	 */
	public set a(alpha: number) {
		this._a = alpha;
	}
	//#endregion
}
