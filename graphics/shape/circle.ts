/**
 * @file Circle class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { injectable, unmanaged } from 'inversify';
import { ICircle, IVector2dMath } from '../types';
import { Shape } from './shape';

/**
 * @classdesc A circle shape.
 */
@injectable()
export class Circle extends Shape implements ICircle {
	//The circle's radius. This value must be positive.
	protected _r: number;

	/**
	 * @param position - The circle's x coordinate
	 * @param r - The circle's radius. This value must be positive.
	 */
	public constructor(@unmanaged() position: IVector2dMath, @unmanaged() r: number) {
		super(position);
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
	 */
	public set r(radius: number) {
		//Make sure the radius is greater than 0.
		if (radius <= 0) {
			throw new Error(`Radius must be greater than zero, you entered: ${radius}`);
		}

		this._r = Math.round(radius);
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
