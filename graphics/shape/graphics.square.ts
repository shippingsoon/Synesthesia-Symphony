/*
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { Shape } from './graphics.shape';
import { Drawable, ColorType } from './../graphics';
import { Color } from './../graphics.color';

//Let the IDE know this is defined elsewhere.
declare const Math: any;

/**
 * @class
 * @classdesc Square shape.
 */
export class SquareShape extends Shape {
	//The square's width.
	protected w: number;
	protected h: number;

	/**
	 * Creates a new SquareShape.
	 * @param {number} x - The x coordinate.
	 * @param {number} y - The y coordinate.
	 * @param {number} w - The square's width.
	 * @param {number} h - The square's height.
	 */
	public constructor({x = 0, y = 0, w = 1, h = 1}: {x: number, y: number, w: number, h: number}) {
		super({x: x, y: y});

		this.w = w;
		this.h = h;
	}

	/**
	 * Gets the square's width.
	 * @return {number}
	 */
	public get getWidth(): number {
		return this.w;
	}

	/**
	 * Gets the square's height.
	 * @return {number}
	 */
	public get getHeight(): number {
		return this.h;
	}

	/**
	 * Sets the square's width.
	 * @param {number} width
	 * @return {void}
	 */
	public set setWidth(width: number) {
		this.w = width;
	}

	/**
	 * Sets the square's height.
	 * @param {number} height
	 * @return {void}
	 */
	public set setHeight(height: number) {
		this.h = height;
	}

	/**
	 * Gets the square's area.
	 * @return {number}
	 */
	public get getArea(): number {
		return (this.w * this.h);
	}
}

/**
 * @class
 * @classdesc A drawable square shape.
 */
export class Square extends SquareShape implements Drawable {
	//The square's color.
	protected fillColor: Color;

	//The width of the square's border.
	private lineWidth: number;

	//The color of the square's border.
	private lineColor: Color;

	//Determines if the square is updated.
	private _isActive: boolean = true;

	//Determines if the square is visible.
	private _isVisible: boolean = true;

	/**
	 * @param {number} x - The square's x coordinate
	 * @param {number} y - The square's y coordinate
	 * @param {number} w - The square's width.
	 * @param {number} h - The square's height.
	 * @param {ColorType} fillColor - The square's fill color.
	 * @param {number} lineWidth - The square's border width.
	 * @param {ColorType} lineColor - The square's border color.
	 */
	constructor({x = 0, y = 0, w = 1, h = 1, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
	{x?: number, y?: number, w?: number, h?: number, fillColor?: ColorType|string, lineWidth?: number, lineColor?: ColorType|string}) {
		super({x: x, y: y, w: w, h: h});
		this.fillColor = new Color(fillColor);
		this.lineWidth = lineWidth;
		this.lineColor = new Color(lineColor);
	}

	/**
	 * Draws the square.
	 * @param {CanvasRenderingContext2D} ctx - The HTML5 2D drawing context.
	 * return {void}
	 */
	public render(ctx: CanvasRenderingContext2D): void {
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();

			//Create a square shape.
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.w, this.h);

			//Fill in the circle with the given color.
			ctx.fillStyle = this.fillColor.getRGBA;
			ctx.fill();

			//Stroke an outline around the square.
			if (this.lineWidth) {
				ctx.strokeStyle = this.lineColor.getRGBA;
				ctx.lineWidth = this.lineWidth;
				ctx.stroke();
			}

			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}

	/**
	 * Gets the square's color.
	 * @return {ColorType}
	 */
	public getColor(): ColorType {
		return this.fillColor.getColor();
	}

	/**
	 *
	 * @param color
	 * @return {Square}
	 */
	public setColor(color: ColorType|string): this {
		this.fillColor.setColor(color);

		return this;
	}

	/**
	 * Get the color of this square in hexadecimal format.
	 * @return {string}
	 */
	public get getHex(): string {
		return this.fillColor.getHex;
	}

	/**
	 * Get the color of this square in rgba format.
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
