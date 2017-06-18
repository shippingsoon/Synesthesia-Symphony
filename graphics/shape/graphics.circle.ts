/**
 * @file The circle class implements a drawable circle shape.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { Shape } from './graphics.shape';
import { Drawable, ColorType, ColorName } from '../graphics.types';
import { Color } from '../graphics.color';

//Let the IDE know this is defined elsewhere.
declare const Math: any;

/**
 * @class
 * @classdesc Circle shape.
 */
export class CircleShape extends Shape {
	private static readonly error: Error = new Error(`Radius must be greater than zero: in CircleShape.constructor()`);

	//The circle's radius.
	protected r: number;

	/**
	 * Creates a new CircleShape.
	 * @param {number} x - The x coordinate.
	 * @param {number} y - The y coordinate.
	 * @param {number} r - The circle's radius.
	 * @throws {Error}
	 */
	public constructor({x = 0, y = 0, r = 1}: {x: number, y: number, r: number}) {
		super({x: x, y: y});

		//Make sure the radius is greater than 0.
		if (r <= 0) {
			throw CircleShape.error;
		}

		this.r = r;
	}

	/**
	 * Gets the circle's radius.
	 * @return {number}
	 */
	public get getRadius(): number {
		return this.r;
	}

	/**
	 * Sets the circle's radius.
	 * @param {number} radius
	 * @throws {Error}
	 * @return {void}
	 */
	public set setRadius(radius: number) {
		//Make sure the radius is greater than 0.
		if (radius <= 0) {
			throw CircleShape.error;
		}

		this.r = radius;
	}

	/**
	 * Gets the circle's area.
	 * @return {number}
	 */
	public get getArea(): number {
		return Math.PI * (this.r * this.r);
	}
}

/**
 * @class
 * @classdesc A drawable circle shape.
 */
export class Circle extends CircleShape implements Drawable {
	//The circle's color.
	protected fillColor: Color;

	//The width of the circle's border.
	private lineWidth: number;

	//The color of the circle's border.
	private lineColor: Color;

	//Determines if the circle is updated.
	private _isActive: boolean = true;

	//Determines if the circle is visible.
	private _isVisible: boolean = true;

	/**
	 * @param {number} x - The circle's x coordinate
	 * @param {number} y - The circle's y coordinate
	 * @param {number} r - The circle's radius
	 * @param {ColorType} fillColor - The circle's fill color.
	 * @param {number} lineWidth - The circle's border width.
	 * @param {ColorType} lineColor - The circle's border color.
	 */
	constructor({x = 0, y = 0, r = 10, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
	{x?: number, y?: number, r?: number, fillColor?: ColorType|ColorName, lineWidth?: number, lineColor?: ColorType|ColorName}) {
		super({x: x, y: y, r: r});
		this.fillColor = new Color(fillColor);
		this.lineWidth = lineWidth;
		this.lineColor = new Color(lineColor);
	}

	/**
	 * Draws the circle.
	 * @param {CanvasRenderingContext2D} ctx - The HTML5 2D drawing context.
	 * return {void}
	 */
	public render(ctx: CanvasRenderingContext2D): void {
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();

			//Make the shape circular.
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

			//Fill in the circle with the given color.
			ctx.fillStyle = this.fillColor.getRGBA;
			ctx.fill();

			//If a line width is specified stroke an outline around the circle..
			if (this.lineWidth) {
				ctx.lineWidth = this.lineWidth;
				ctx.strokeStyle = this.lineColor.getHex;
				ctx.stroke();
			}

			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}

	/**
	 * Gets the circle's color.
	 * @return {ColorType}
	 */
	public getColor(): ColorType {
		return this.fillColor.getColor();
	}

	/**
	 *
	 * @param color
	 * @return {Circle}
	 */
	public setColor(color: ColorType|ColorName): this {
		this.fillColor.setColor(color);

		return this;
	}

	/**
	 * Get the color of this circle in hexadecimal format.
	 * @return {string}
	 */
	public get getHex(): string {
		return this.fillColor.getHex;
	}

	/**
	 * Get the color of this circle in rgba format.
	 * @return {string}
	 */
	public get getRGBA(): string {
		return this.fillColor.getRGBA;
	}

	/**
	 * Get isActive state. This will determine if the object is updated.
	 * @return {boolean}
	 */
	public get isActive(): boolean {
		return this._isActive;
	}

	/**
	 * Get isActive state. This will determine if the object is updated.
	 * @return {boolean}
	 */
	public get isVisible(): boolean {
		return this._isVisible;
	}
}
