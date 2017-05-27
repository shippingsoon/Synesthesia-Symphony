/*
 * @description - Color class
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

namespace Symphony.Graphics {
	//Let the TypeScript compiler know we are using the 3rd party parseCSSColor() function.
	declare let parseCSSColor:Function;

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
		 * @param {number} r - Red.
		 * @param {number} g - Green.
		 * @param {number} b - Blue.
		 * @param {number} a - Alpha.
		 */
		public constructor({r = 0, g = 0, b = 0, a = 1}:Graphics.ColorType|any) {
			//If the argument passed to this method is a string.
			if (_.isString(arguments[0])) {
				//Use 3rd party parseCSSColor() function to convert the color name to a rgba value.
				let parsedColors:number[] = parseCSSColor(arguments[0]);

				if (_.isEmpty(parsedColors))
					parsedColors = [0, 0, 0, 1];

				r = parsedColors[0];
				g = parsedColors[1];
				b = parsedColors[2];
				a = parsedColors[3];
			}

			//Set the colors.
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a;

			//Make sure the values are valid.
			if (!isValidColor({r: r, g: g, b: b, a: a}))
				throw `Invalid RGBA colors: rgba(${r}, ${g}, ${b}, ${a})`;

			//Store a copy of the color object in hexadecimal and rgba format.
			this.hexString = buildHex({r: r, g: g, b: b, a: a});
			this.rgbaString = buildRGBA({r: r, g: g, b: b, a: a});
		}

		/**
		 * Gets the red, green, blue and alpha color components.
		 * @return {Symphony.Graphics.ColorType}
		 */
		public getColor():Graphics.ColorType {
			return {
				r: this.r,
				g: this.b,
				b: this.b,
				a: this.a
			};
		}

		/**
		 * Sets the color.
		 * @param {Symphony.Graphics.ColorType} color
		 * @return {Symphony.Graphics.Color}
		 */
		public setColor(color:Graphics.ColorType|any):Color {
			//If the argument passed to this method is a string.
			if (_.isString(arguments[0])) {
				//Use 3rd party parseCSSColor() function to convert the color name to a rgba value.
				let parsedColors:number[] = parseCSSColor(arguments[0]);

				if (_.isEmpty(parsedColors))
					parsedColors = [0, 0, 0, 1];
				color = new Object();
				color.r = parsedColors[0];
				color.g = parsedColors[1];
				color.b = parsedColors[2];
				color.a = parsedColors[3];
			}

			this.r = color.r;
			this.g = color.g;
			this.b = color.b;
			this.a = color.a;

			//Make sure the values are valid.
			if (!isValidColor(this.getColor()))
				throw `Invalid RGBA colors: rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;

			//Store a copy of the color object in hex and rgba format.
			this.hexString = buildHex(this.getColor());
			this.rgbaString = buildRGBA(this.getColor());

			return this;
		}

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
				throw `Invalid RGBA colors: rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
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


}