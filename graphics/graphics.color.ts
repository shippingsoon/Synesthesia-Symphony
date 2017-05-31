/**
 * @file The color
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./graphics.ts" />

/**
 * @namespace
 */
namespace Symphony.Graphics {
	"use strict";

	/**
	 * @class
	 * @classdesc Creates an object containing RGBA components.
	 */
	export class Color {
		private r:number;
		private g:number;
		private b:number;
		private a:number;
		private hexString:string;
		private rgbaString:string;

		/**
		 * Color constructor.
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
		 * @requires module:Symphony.Graphics.colorNameToObject
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


}