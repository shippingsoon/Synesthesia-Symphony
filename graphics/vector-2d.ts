/**
 * @file Vector2D class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IVector2d, isVector } from './types';
import { injectable } from 'inversify';

/**
 * @classdesc Vector2d class.
 */
@injectable()
export class Vector2d implements IVector2d {
	//The x and y components of the 2D vector.
	protected _x: number;
	protected _y: number;

	/**
	 * @param x - The x component of the vector.
	 * @param y - The y component of the vector.
	 */
	public constructor({x = 0, y = 0}: IVector2d) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Sets the position
	 * @param vector - The value that will be used to set the position of this vector instance.
	 * @return {IVector2d} An instance of this class for method chaining.
	 */
	public setPosition(vector: IVector2d|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x = x;
		this.y = y;

		return this;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Gets the x component of this vector.
	 * @return {number}
	 */
	public get x(): number {
		return this._x;
	}

	/**
	 * Sets the x component of this vector.
	 * @param x - The number we will use to set the x component of the vector.
	 */
	public set x(x: number) {
		this._x = x;
	}

	/**
	 * Gets the y component of this vector.
	 * @return {number}
	 */
	public get y(): number {
		return this._y;
	}

	/**
	 * Sets the y component of this vector.
	 * @param y - The number we will use to set the y component of the vector.
	 */
	public set y(y: number) {
		this._y = y;
	}
	//#endregion
}
