/**
 * @file SquareShape class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { Shape } from './graphics.shape';
//import { injectable } from '../../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc Square shape.
 */
@injectable()
export class SquareShape extends Shape {
	/**
	 * @private
	 */
	protected _w: number;
	protected _h: number;

	/**
	 * Creates a new SquareShape.
	 * @public
	 * @constructor
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
	 * @public
	 * @return {number}
	 */
	public get w(): number {
		return this._w;
	}

	/**
	 * Gets the square's height.
	 * @public
	 * @return {number}
	 */
	public get h(): number {
		return this._h;
	}

	/**
	 * Sets the square's width.
	 * @public
	 * @param {number} width
	 * @return {void}
	 */
	public set w(width: number) {
		this._w = width;
	}

	/**
	 * Sets the square's height.
	 * @public
	 * @param {number} height
	 * @return {void}
	 */
	public set h(height: number) {
		this._h = height;
	}

	/**
	 * Gets the square's area.
	 * @public
	 * @return {number}
	 */
	public get getArea(): number {
		return (this.w * this.h);
	}
}
