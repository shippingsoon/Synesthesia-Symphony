/**
 * @file Circle class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { TYPES } from '../../bootstrap/inversify.types';
import { Drawable, ICssColor } from '../graphics.types';
import { CircleShape } from './graphics.circle-shape';
//import { injectable, inject } from '../../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc A drawable circle shape.
 */
@injectable()
export class Circle extends CircleShape implements Drawable {
	//The width of the circle's border.
	private lineWidth: number;

	//The circle's fill color.
	protected fillColor: ICssColor;

	//The color of the circle's border.
	private lineColor: ICssColor;

	/**
	 * @public
	 * @constructor
	 * @param {number} x - The circle's x coordinate
	 * @param {number} y - The circle's y coordinate
	 * @param {number} r - The circle's radius
	 * @param {number} lineWidth - The circle's border width.
	 * @param {ICssColor} fillColor - The circle's fill color.
	 * @param {ICssColor} lineColor - The circle's border color.
	 */
	public constructor({x = 0, y = 0, r = 10, lineWidth = 1}:
	{x?: number, y?: number, r?: number, lineWidth?: number}, @inject(TYPES.CssColor) fillColor: ICssColor, @inject(TYPES.CssColor) lineColor: ICssColor) {
		super({x: x, y: y, r: r});
		this.lineWidth = lineWidth;
		this.fillColor = fillColor;
		this.lineColor = lineColor;
	}

	/**
	 * Draws the circle.
	 * @public
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
			ctx.fillStyle = this.fillColor.rgba;
			ctx.fill();

			//If a line width is specified stroke an outline around the circle..
			if (this.lineWidth) {
				ctx.lineWidth = this.lineWidth;
				ctx.strokeStyle = this.lineColor.hex;
				ctx.stroke();
			}

			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}

	/**
	 * Gets the circle's fill color.
	 * @public
	 * @return {ICssColor}
	 */
	public getFillColor(): ICssColor {
		return this.fillColor;
	}
}
