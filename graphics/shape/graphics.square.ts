/**
 * @file Square class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { TYPES } from '../../bootstrap/bootstrap.types';
import { ICssColor } from '../graphics.types';
import { SquareShape } from './graphics.square-shape';
//import { injectable, inject } from '../../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc A drawable square shape.
 */
@injectable()
export class Square extends SquareShape {
	//The width of the shape's border.
	private lineWidth: number;

	//The shape's fill color.
	protected fillColor: ICssColor;

	//The color of the shape's border.
	private lineColor: ICssColor;

	/**
	 * @public
	 * @constructor
	 * @param {number} x - The shape's x coordinate
	 * @param {number} y - The shape's y coordinate
	 * @param {number} w - The shape's width
	 * @param {number} h - The shape's height
	 * @param {number} lineWidth - The circle's border width.
	 * @param {ICssColor} fillColor - The circle's fill color.
	 * @param {ICssColor} lineColor - The circle's border color.
	 */
	public constructor({x = 0, y = 0, w = 10, h = 10, lineWidth = 1}: {x?: number, y?: number, w?: number, h?: number, lineWidth?: number}, @inject(TYPES.CssColor) fillColor: ICssColor, @inject(TYPES.CssColor) lineColor: ICssColor) {
		super({x: x, y: y, w: w, h: h});
		this.lineWidth = lineWidth;
		this.fillColor = fillColor;
		this.lineColor = lineColor;
	}
}
