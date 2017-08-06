/*
 * @file
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ColorName, ICssColor, isColorName, IVector2d} from '../types';
import {injectable} from 'inversify';

/**
 * @classdesc DrawableRectangle mixin.
 */
@injectable()
export class DrawableRectangle {
	/**
	 * Draws the shape.
	 * @param ctx - The HTML5 2D drawing context.
	 * @param position - The position of the shape.
	 * @param w - The shape's width.
	 * @param h - The shape's height.
	 * @param fillColor - The shape's fill color.
	 * @param lineColor - The color of the shape's border.
	 * @param lineWidth - The width of the shape's border.
	 */
	public render(ctx: CanvasRenderingContext2D, position: IVector2d, w: number, h: number, fillColor: ICssColor|ColorName = 'green', lineColor: ICssColor|ColorName = 'black', lineWidth: number = 1): void {
		//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
		ctx.save();

		//Create a square shape.
		ctx.beginPath();
		ctx.rect(Math.round(position.x), Math.round(position.y), Math.round(w), Math.round(h));

		//Fill in the circle with the given color.
		ctx.fillStyle = isColorName(fillColor) ? fillColor : fillColor.rgba;
		ctx.fill();

		//Stroke an outline around the square.
		if (lineWidth) {
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = isColorName(lineColor) ? lineColor : lineColor.hex;
			ctx.stroke();
		}

		//Restore the 2D rendering context back to its previous state.
		ctx.restore();
	}
}
