/**
 * @file DrawCircle mixin.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ColorName, ICssColor, isColorName, IVector2d} from '../types';
import { injectable } from 'inversify';

/**
 * @classdesc DrawCircle mixin.
 */
@injectable()
export class DrawCircle {
	/**
	 * Draws the shape.
	 * @param ctx - The HTML5 2D drawing context.
	 * @param position - The position of the shape.
	 * @param r - The shape's radius.
	 * @param fillColor - The shape's fill color.
	 * @param lineColor - The color of the shape's border.
	 * @param lineWidth - The width of the shape's border.
	 */
	public render(ctx: CanvasRenderingContext2D, position: IVector2d, r: number, fillColor: ICssColor|ColorName = 'green', lineColor: ICssColor|ColorName = 'black', lineWidth: number = 1): void {
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();

			//Make the shape circular.
			ctx.beginPath();
			ctx.arc(Math.round(position.x), Math.round(position.y), Math.round(r), 0, 2 * Math.PI, false);

			//Fill in the circle with the given color.
			ctx.fillStyle = isColorName(fillColor) ? fillColor : fillColor.rgba;
			ctx.fill();

			//If a line width is specified stroke an outline around the circle..
			if (lineWidth) {
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = isColorName(lineColor) ? lineColor : lineColor.hex;
				ctx.stroke();
			}

			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}
}
