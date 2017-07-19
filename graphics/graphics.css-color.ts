/**
 * @file CSS Color class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IColor, ColorName, isColorName, COLORS } from './graphics.types';
import { Color } from './graphics.color';
import { injectable, unmanaged } from 'inversify';

/**
 * @classdesc Creates an object containing RGBA components.
 */
@injectable()
export class CssColor extends Color {
	//The color in hexadecimal format.
	private _hex: string;

	//The color in RGBA format.
	private _rgba: string;

	/**
	 * Converts a color object to a hexadecimal string.
	 * @param color - The color object containing rgb colors that will be converted to hex.
	 * @return {string}
	 */
	public static colorToHex(color: IColor): string {
		return [color.r, color.g, color.b].reduce(
			(a, b) => a + b.toString(16).repeat(b < 16 ? 2 : 1),
			'#'
		);
	}

	/**
	 * Converts a color object to a hexadecimal string.
	 * @param color - The color object containing rgb colors that will be converted to hex.
	 * @return {string}
	 */
	public static colorToRgba(color: IColor): string {
		return `rgba(${[color.r, color.g, color.b, color.a].join(', ')})`;
	}

	/**
	 * Color constructor.
	 * @param {IColor|ColorName} color - Can either be a name of a color such as 'red' or an object containing rgba values.
	 * @throws {Error}
	 */
	public constructor(@unmanaged() color: IColor|ColorName) {
		super(isColorName(color) ? COLORS[<string>color] : color);

		this._hex = CssColor.colorToHex(this);
		this._rgba = CssColor.colorToRgba(this);
	}

	/**
	 * Set the color.
	 * @param {IColor|ColorName} color - Can either be a name of a color such as 'red' or an object containing rgba values.
	 * @throws {Error}
	 */
	public setColor(color: IColor|ColorName): this {
		const {r = 1, g = 1, b = 1, a = 0} = {...isColorName(color) ? COLORS[<string>color] : color};

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
		this._hex = CssColor.colorToHex(this);
		this._rgba = CssColor.colorToRgba(this);

		return this;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ IDEA)
	/**
	 * Gets the color of this object in hexadecimal format.
	 * @return {string}
	 */
	public get hex(): string {
		return this._hex;
	}

	/**
	 * Gets the color of this object in RGBA format.
	 * @return {string}
	 */
	public get rgba(): string {
		return this._rgba;
	}
	//#endregion
}
