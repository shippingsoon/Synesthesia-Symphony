/**
 * @file Color class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IColor } from './graphics.types';
import { injectable, unmanaged } from 'inversify';

/**
 * @classdesc Creates an object containing RGBA components.
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
	 * @param r - A numerical representation of the red value. This number must be between 0-255.
	 * @param g - A numerical representation of the green value. This number must be between 0-255.
	 * @param b - A numerical representation of the blue value. This number must be between 0-255.
	 * @param a - Determines the transparency of the color. This number must be between 0-1.
	 * @throws {Error}
	 */
	public constructor(@unmanaged() {r = 0, g = 0, b = 0, a = 1}: {readonly r?: number, readonly g?: number, readonly b?: number, readonly a?: number}) {
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
	 * @param red - A numerical representation of the red value. This number must be between 0-255.
	 * @throws {Error}
	 */
	public set r(red: number) {
		//Make sure the value is between 0-255.
		if (red < 0 || red > 255) {
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
	 * @param green - A numerical representation of the green value. This number must be between 0-255.
	 * @throws {Error}
	 */
	public set g(green: number) {
		//Make sure the value is between 0-255.
		if (green < 0 || green > 255) {
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
	 * @param blue - A numerical representation of the blue value. This number must be between 0-255.
	 * @throws {Error}
	 */
	public set b(blue: number) {
		//Make sure the value is between 0-255.
		if (blue < 0 || blue > 255) {
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
	 * @param alpha - Determines the transparency of the color. This number must be between 0-1.
	 * @throws {Error}
	 */
	public set a(alpha: number) {
		//Make sure the value is between 0-1.
		if (alpha < 0 || alpha > 1) {
			throw new Error('Alpha value must be between 0-1');
		}

		this._a = alpha;
	}
	//#endregion
}
