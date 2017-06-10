/**
 * @file The graphics namespace contains various drawing routines.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';
//Let the IDE know we are using the 3rd party parseCSSColor() function.
declare let parseCSSColor:any;

//Let the IDE know we are using the 3rd party LoDash utilities library.
declare let _:any;

/**
 * Interface for classes that represent a color.
 * @interface
 */
export interface ColorType {
	r: number;
	g: number;
	b: number;
	a: number;
}

/**
 * Converts a color object to a hexadecimal string.
 * @param {Graphics.ColorType} color - The color object containing rgb colors that will be converted to hex.
 * @return {string}
 */
export function buildHex(color: ColorType): string {
	let hexString: string = '#';

	//Here we append the red, green and blue component to the output variable.
	//First we use the toString(16) method to convert the color to hexadecimal format
	//and we use LoDash's pad() method to pad the number with '0' if it is less than 2 digits.
	hexString += _.pad(color.r.toString(16), 2, '0');
	hexString += _.pad(color.g.toString(16), 2, '0');
	hexString += _.pad(color.b.toString(16), 2, '0');

	return hexString;
}

/**
 * Converts a color object to a hexadecimal string.
 * @param {Graphics.ColorType} color - The color object containing rgb colors that will be converted to hex.
 * @return {string}
 */
export function buildRGBA(color: ColorType): string {
	//Use LoDash' join() method to concat the rgba colors. The array input values will be comma delimited i.e., rgba(0,0,0,1).
	return `rgba(${_.join([color.r, color.g, color.b, color.a], ', ')})`;
}

/**
 * This method makes sure the colors are in the 0-255 range and it also makes sure the alpha value is between 0-1.
 * @param {Graphics.ColorType} color - The color to be checked.
 * return {boolean}
 */
export function isValidColor(color: ColorType): boolean {
	return (
		_.inRange(color.r, 0, 256) &&
		_.inRange(color.g, 0, 256) &&
		_.inRange(color.b, 0, 256) &&
		_.inRange(color.a, 0, 2)
	);
}

/**
 * Reads in a W3C color string and uses the 3rd party parseCSSColor() function to convert the color name to an object.
 * @param {string} colorName - A W3C color name. See http://www.w3.org/TR/css3-color/
 * @throws {Error}
 * @return {ColorType}
 */
export function colorNameToObject(colorName: string): ColorType {
	//Use 3rd party parseCSSColor() function to convert the color name to a rgba value.
	let parsedColors: number[] = parseCSSColor(colorName);

	//If the parseCSSColor failed to parse the color we will raise an exception.
	if (_.isEmpty(parsedColors)) {
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
 * Clears the HTML5 canvas.
 * @param {CanvasRenderingContext2D} ctx - The HTML5 2D drawing context.
 * @param {HTMLCanvasElement} canvas - The HTML5 canvas element.
 * return {void}
 */
export function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Defines classes that can be drawn to the screen.
 * @interface
 */
export interface Drawable {
	render(ctx:CanvasRenderingContext2D):void;
}