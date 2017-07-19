/**
 * @file CircleShape class
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { ICircle } from '../graphics.types';
import { Shape } from './graphics.shape';
//import { injectable } from '../../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc Circle shape.
 */
@injectable()
export class CircleShape extends Shape implements ICircle {
	//The circle's radius.
	protected _r: number;

	/**
	 * Creates a new CircleShape.
	 * @public
	 * @constructor
	 * @param {number} x - The x coordinate.
	 * @param {number} y - The y coordinate.
	 * @param {number} r - The circle's radius. Must be greater than zero.
	 * @throws {Error}
	 */
	public constructor({x = 0, y = 0, r = 1}: {readonly x?: number, readonly y?: number, readonly r?: number}) {
		super({x: x, y: y});

		//Make sure the radius is greater than 0.
		if (r <= 0) {
			throw new Error(`Radius must be greater than zero: in CircleShape.constructor()`);
		}

		this.r = r;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the circle's radius.
	 * @return {number}
	 */
	public get r(): number {
		return this._r;
	}

	/**
	 * Sets the circle's radius.
	 * @param {number} radius
	 * @throws {Error}
	 * @return {void}
	 */
	public set r(radius: number) {
		//Make sure the radius is greater than 0.
		if (radius <= 0) {
			throw new Error(`Radius must be greater than zero: in CircleShape.r`);
		}

		this._r = radius;
	}

	/**
	 * Gets the circle's area.
	 * @return {number}
	 */
	public get getArea(): number {
		return Math.PI * (this.r * this.r);
	}
	//#endregion
}
