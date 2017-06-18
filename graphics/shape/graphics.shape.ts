/**
 * @file An abstract class for 2D shapes.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @module Shape
 */

'use strict';

import { Vector } from '../graphics.vector';

/**
 * @class
 * @classdesc An abstract class for 2D shapes
 * @abstract
 */
export abstract class Shape extends Vector {
	/**
	 * @public
	 * @constructor
	 * @param {number} x - The x coordinate
	 * @param {number} y - The y coordinate
	 */
	public constructor({x = 0, y = 0}: {readonly x?: number, readonly y?: number}) {
		super({x: x, y: y});
	}

	/**
	 * Returns the area of this shape.
	 * @public
	 * @abstract
	 * @return {number}
	 */
	public abstract get getArea(): number;
}
