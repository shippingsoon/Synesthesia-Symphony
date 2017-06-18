/**
 * @file The color
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @module Color
 */

'use strict';

import { ColorType, ColorName, isColorName } from './graphics.types';
import { LoDashStatic } from '../node_modules/@types/lodash/index';
import _ from 'lodash';
import parseCSSColor from '../resource/js/css-color-parser/csscolorparser';

/**
 * @class
 * @classdesc Creates an object containing RGBA components.
 */
export class Color {
	/**
	 * Numerical RGBA color values
	 * @private
	 */
	private r: number;
	private g: number;
	private b: number;
	private a: number;

	/**
	 * The color in hex and rgba format.
	 * @private
	 */
	private hexString: string;
	private rgbaString: string;

	/**
	 * Converts a color object to a hexadecimal string.
	 * @public
	 * @static
	 * @param {ColorType} color - The color object containing rgb colors that will be converted to hex.
	 * @param {LoDashStatic} __ - Lodash
	 * @return {string}
	 */
	public static buildHex(color: ColorType, __: LoDashStatic = _): string {
		let hexString: string = '#';

		//Here we append the red, green and blue component to the output variable.
		//First we use the toString(16) method to convert the color to hexadecimal format
		//and we use LoDash's pad() method to pad the number with '0' if it is less than 2 digits.
		hexString += __.pad(color.r.toString(16), 2, '0');
		hexString += __.pad(color.g.toString(16), 2, '0');
		hexString += __.pad(color.b.toString(16), 2, '0');

		return hexString;
	}

	/**
	 * Converts a color object to a hexadecimal string.
	 * @public
	 * @static
	 * @param {ColorType} color - The color object containing rgb colors that will be converted to hex.
	 * @param {LoDashStatic} __ - Lodash
	 * @return {string}
	 */
	public static buildRGBA(color: ColorType, __: LoDashStatic = _): string {
		//Use LoDash' join() method to concat the rgba colors. The array input values will be comma delimited i.e., rgba(0,0,0,1).
		return `rgba(${__.join([color.r, color.g, color.b, color.a], ', ')})`;
	}

	/**
	 * This method makes sure the colors are in the 0-255 range and it also makes sure the alpha value is between 0-1.
	 * @public
	 * @static
	 * @param {ColorType} color - The color to be checked.
	 * @param {LoDashStatic} __ - Lodash
	 * return {boolean}
	 */
	public static isValidColor(color: ColorType, __: LoDashStatic = _): boolean {
		return (
			__.inRange(color.r, 0, 256) &&
			__.inRange(color.g, 0, 256) &&
			__.inRange(color.b, 0, 256) &&
			__.inRange(color.a, 0, 2)
		);
	}

	/**
	 * Reads in a W3C color string and uses the 3rd party parseCSSColor() function to convert the color name to an object.
	 * @public
	 * @static
	 * @param {string} colorName - A W3C color name. See http://www.w3.org/TR/css3-color/
	 * @param {LoDashStatic} __ - Lodash
	 * @param {Function} parseColor - A method for parsing CSS color names to an array.
	 * @throws {Error}
	 * @return {ColorType}
	 */
	public static colorNameToObject(colorName: ColorName, __: LoDashStatic = _, parseColor: Function = parseCSSColor): ColorType {
		//Use 3rd party parseCSSColor() function to convert the color name to a rgba value.
		const parsedColors: number[] = parseColor(colorName);

		//If the parseCSSColor failed to parse the color we will raise an exception.
		if (__.isEmpty(parsedColors)) {
			throw new Error(`In Color.colorNameToObject(). Failed to set color: ${colorName}`);
		}

		return {
			r: parsedColors[0],
			g: parsedColors[1],
			b: parsedColors[2],
			a: parsedColors[3]
		};
	}

	/**
	 * Color constructor.
	 * @public
	 * @constructor
	 * @requires module:_
	 * @requires module:parseCSSColor
	 * @param {ColorType|ColorName} color - Can either be a name of a color such as 'red' or an object containing rgba values.
	 * @param {Function} parseColor - A method for parsing CSS color names to an array.
	 * @param {LoDashStatic} __ - Lodash
	 * @throws {Error}
	 */
	public constructor(color: ColorType|ColorName, private parseColor: Function = parseCSSColor, private __: LoDashStatic = _) {
	//public constructor(color: ColorName|ColorType) {
		//If the argument passed to this method is a string, then it is a color name.
		//Use the 3rd party parseCSSColor() function to convert the color name to a rgba object.
		const {r = 0, g = 0, b = 0, a = 1} = {...((isColorName(color)) ? Color.colorNameToObject(color, __, parseColor) : color)};

		//Set the colors.
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;

		//Make sure the values are valid.
		if (!Color.isValidColor({r: r, g: g, b: b, a: a}, __)) {
			throw new Error(`Invalid RGBA colors:  rgba(${r}, ${g}, ${b}, ${a})`);
		}

		//Store a copy of the color object in hexadecimal and rgba format.
		this.hexString = Color.buildHex({r: r, g: g, b: b, a: a}, __);
		this.rgbaString = Color.buildRGBA({r: r, g: g, b: b, a: a}, __);
	}

	/**
	 * Gets the red, green, blue and alpha color components.
	 * @public
	 * @return {ColorType}
	 */
	public getColor(): ColorType {
		return {
			r: this.r,
			g: this.g,
			b: this.b,
			a: this.a
		};
	}

	/**
	 * Sets the color.
	 * @public
	 * @param {ColorType|ColorName} color
	 * @throws {Error}
	 * @return {Color}
	 */
	public setColor(color: ColorType|ColorName): this {
		//If the argument passed to this method is a string.
		//If the argument passed to this method is a string, then it is a color name.
		//Use the 3rd party parseCSSColor() function to convert the color name to a rgba object.
		const {r = 0, g = 0, b = 0, a = 1} = {...((isColorName(color)) ? Color.colorNameToObject(color, this.__, this.parseColor) : color)};

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;

		//Make sure the values are valid.
		if (!Color.isValidColor(this.getColor(), this.__)) {
			throw new Error(`Invalid RGBA colors: rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`);
		}

		//Store a copy of the color object in hex and rgba format.
		this.hexString = Color.buildHex(this.getColor(), this.__);
		this.rgbaString = Color.buildRGBA(this.getColor(), this.__);

		return this;
	}

	//#region Getter/Setter Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the color of this object in hexadecimal format.
	 * @public
	 * @return {string}
	 */
	public get getHex(): string {
		return this.hexString;
	}

	/**
	 * Gets the color of this object in rgba format.
	 * @public
	 * @return {string}
	 */
	public get getRGBA(): string {
		return this.rgbaString;
	}

	/**
	 * Gets the red component.
	 * @public
	 * @return {number}
	 */
	public get getRed(): number {
		return this.r;
	}

	/**
	 * Sets the red component.
	 * @public
	 * @param {number} red - A number between 0-255.
	 * @throws {Error}
	 * @return {void}
	 */
	public set setRed(red: number) {
		this.r = red;

		//Make sure the values are valid.
		if (!Color.isValidColor(this.getColor(), this.__)) {
			throw new Error(`Invalid RGBA colors: rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`);
		}
	}

	/**
	 * Gets the green component.
	 * @public
	 * @return {number}
	 */
	public get getGreen(): number {
		return this.g;
	}

	/**
	 * Sets the green component.
	 * @public
	 * @param {number} green - A number between 0-255.
	 * @return {void}
	 */
	public set setGreen(green: number) {
		this.g = green;
	}

	/**
	 * Gets the blue component.
	 * @public
	 * @return {number}
	 */
	public get getBlue(): number {
		return this.b;
	}

	/**
	 * Sets the blue component.
	 * @public
	 * @param {number} blue - A number between 0-255.
	 * @return {void}
	 */
	public set setBlue(blue: number) {
		this.b = blue;
	}

	/**
	 * Gets the alpha component.
	 * @public
	 * @return {number}
	 */
	public get getAlpha(): number {
		return this.a;
	}

	/**
	 * Sets the alpha component.
	 * @public
	 * @param {number} alpha - A number between 0-255.
	 * @return {void}
	 */
	public set setAlpha(alpha: number) {
		this.a = alpha;
	}
	//#endregion
}
