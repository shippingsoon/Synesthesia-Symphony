/*
 * @description - Color class
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/**
 * @namespace
 */
namespace Symphony.Graphics {
	//Let the IDE know we are using the 3rd party parseCSSColor() function.
	declare let parseCSSColor:any;

	//Let the IDE know we are using the 3rd party LoDash utilities library.
	declare let _:any;

	export class Color {
		private r:number;
		private g:number;
		private b:number;
		private a:number;
		private hexString:string;
		private rgbaString:string;

		/**
		 * Color constructor.
		 * @constructor
		 * @param {number} r - Red value ranging from 0 to 255.
		 * @param {number} g - Green value ranging from 0 to 255.
		 * @param {number} b - Blue value ranging from 0 to 255.
		 * @param {number} a - Alpha value ranging from 0 to 1. This determines the transparency.
		 * @throws {Error}
		 */
		public constructor({r = 0, g = 0, b = 0, a = 1}:Graphics.ColorType|any) {
			//The color we will be using to set the rgba values.
			let color:ColorType = {r: r, g: g, b: b, a: a};

			//If the argument passed to this method is a string, then it is a color name.
			if (_.isString(arguments[0])) {
				//Use 3rd party parseCSSColor() function to convert the color name to a rgba object.
				color = colorNameToObject(<string> arguments[0]);
			}

			//Set the colors.
			this.r = color.r;
			this.g = color.g;
			this.b = color.b;
			this.a = color.a;

			//Make sure the values are valid.
			if (!isValidColor(color))
				throw new Error(`Invalid RGBA colors: rgba(${r}, ${g}, ${b}, ${a})`);

			//Store a copy of the color object in hexadecimal and rgba format.
			this.hexString = buildHex(color);
			this.rgbaString = buildRGBA(color);
		}

		/**
		 * Gets the red, green, blue and alpha color components.
		 * @return {Symphony.Graphics.ColorType}
		 */
		public getColor():Graphics.ColorType {
			return {
				r: this.r,
				g: this.g,
				b: this.b,
				a: this.a
			};
		}

		/**
		 * Sets the color.
		 * @param {Symphony.Graphics.ColorType} color
		 * @throws {Error}
		 * @return {Symphony.Graphics.Color}
		 */
		public setColor(color:Graphics.ColorType|any):Color {
			//If the argument passed to this method is a string.
			if (_.isString(arguments[0])) {
				//Use 3rd party parseCSSColor() function to convert the color name to a rgba value.
				color = colorNameToObject(<string> arguments[0]);
			}

			this.r = color.r;
			this.g = color.g;
			this.b = color.b;
			this.a = color.a;

			//Make sure the values are valid.
			if (!isValidColor(this.getColor()))
				throw new Error(`Invalid RGBA colors: rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`);

			//Store a copy of the color object in hex and rgba format.
			this.hexString = buildHex(this.getColor());
			this.rgbaString = buildRGBA(this.getColor());

			return this;
		}

		//#region Getter/Setter Region (Note: regions are collapsible with IntelliJ)

		/**
		 * Gets the color of this object in hexadecimal format.
		 * @return {string}
		 */
		public get getHex():string {
			return this.hexString;
		}

		/**
		 * Gets the color of this object in rgba format.
		 * @return {string}
		 */
		public get getRGBA():string {
			return this.rgbaString;
		}

		/**
		 * Gets the red component.
		 * @return {number}
		 */
		public get getRed():number {
			return this.r;
		}

		/**
		 * Sets the red component.
		 * @param {number} red - A number between 0-255.
		 * @return {void}
		 */
		public set setRed(red:number) {
			this.r = red;

			//Make sure the values are valid.
			if (!isValidColor(this.getColor()))
				throw new Error(`Invalid RGBA colors: rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`);
		}

		/**
		 * Gets the green component.
		 * @return {number}
		 */
		public get getGreen():number {
			return this.g;
		}

		/**
		 * Sets the green component.
		 * @param {number} green - A number between 0-255.
		 * @return {void}
		 */
		public set setGreen(green:number) {
			this.g = green;
		}

		/**
		 * Gets the blue component.
		 * @return {number}
		 */
		public get getBlue():number {
			return this.b;
		}

		/**
		 * Sets the blue component.
		 * @param {number} blue - A number between 0-255.
		 * @return {void}
		 */
		public set setBlue(blue:number) {
			this.b = blue;
		}

		/**
		 * Gets the alpha component.
		 * @return {number}
		 */
		public get getAlpha():number {
			return this.a;
		}

		/**
		 * Sets the alpha component.
		 * @param {number} alpha - A number between 0-255.
		 * @return {void}
		 */
		public set setAlpha(alpha:number) {
			this.a = alpha;
		}

		//#endregion
	}

	/**
	 * Interface for classes that represent a color.
	 * @interface
	 */
	export interface ColorType {
		r:number;
		g:number;
		b:number;
		a:number;
	}

	/**
	 * Converts a color object to a hexadecimal string.
	 * @param {Symphony.Graphics.ColorType} color - The color object containing rgb colors that will be converted to hex.
	 * @return {string}
	 */
	export function buildHex(color:Graphics.ColorType):string {
		let hexString:string = '#';

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
	 * @param {Symphony.Graphics.ColorType} color - The color object containing rgb colors that will be converted to hex.
	 * @return {string}
	 */
	export function buildRGBA(color:Graphics.ColorType):string {
		//Use LoDash' join() method to concat the rgba colors. The array input values will be comma delimited i.e., rgba(0,0,0,1).
		return `rgba(${_.join([color.r, color.g, color.b, color.a])})`;
	}

	/**
	 * This method makes sure the colors are in the 0-255 range and it also makes sure the alpha value is between 0-1.
	 * @param {Symphony.Graphics.ColorType} color - The color to be checked.
	 * return {boolean}
	 */
	export function isValidColor(color:Graphics.ColorType):boolean {
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
	export function colorNameToObject(colorName:string):ColorType {
		//Use 3rd party parseCSSColor() function to convert the color name to a rgba value.
		let parsedColors:number[] = parseCSSColor(colorName);

		//If the parseCSSColor failed to parse the color we will raise an exception.
		if (_.isEmpty(parsedColors))
			throw new Error(`In Color.colorNameToObject(). Failed to set color: ${colorName}`);

		return {
			r: parsedColors[0],
			g: parsedColors[1],
			b: parsedColors[2],
			a: parsedColors[3]
		};
	}
}