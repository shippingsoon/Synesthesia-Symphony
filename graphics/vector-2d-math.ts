/**
 * @file Vector2dMath class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IVector2d, isVector, IMath } from './types';
import { injectable } from 'inversify';
import { Vector2d } from './vector-2d';

//Let our compiler know that this object is defined elsewhere.
declare const Math: IMath;

/**
 * @classdesc Vector2dMath class.
 */
@injectable()
export class Vector2dMath extends Vector2d {
	/**
	 * @param x - The x component of the vector.
	 * @param y - The y component of the vector.
	 */
	public constructor({x = 0, y = 0}: IVector2d) {
		super({x: x, y: y});
	}

	/**
	 * Adds two vectors.
	 * @param vector - The vector that will be added to this vector instance.
	 * @return {IVector2d} An instance of this class for method chaining.
	 */
	public add(vector: IVector2d|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x += x;
		this.y += y;

		return this;
	}

	/**
	 * Subtracts two vectors.
	 * @param vector - The value that will be subtracted from this vector instance.
	 * @return {IVector2d}
	 */
	public subtract(vector: IVector2d|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x -= x;
		this.y -= y;

		return this;
	}

	/**
	 * Multiplies two vectors.
	 * @param vector - The value that will be multiplied by this vector instance.
	 * @return {IVector2d} An instance of this class for method chaining.
	 */
	public multiply(vector: IVector2d|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x *= x;
		this.y *= y;

		return this;
	}

	/**
	 * Divides two vectors.
	 * @param vector - The value that will be used to divide this vector instance.
	 * @throws {Error}
	 * @return {IVector2d} An instance of this class for method chaining.
	 */
	public divide(vector: IVector2d|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		//Check for division by zero.
		if (x === 0 || y === 0) {
			throw new Error('Division by zero in Vector2d.divide()');
		}

		this.x /= x;
		this.y /= y;

		return this;
	}

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Returns the magnitude of the vector.
	 * @return {number} Magnitude of the vector
	 */
	public get magnitude(): number {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Returns the angle of this vector
	 * @throws {Error}
	 * @return {number}
	 */
	public get angle(): number {
		if (this.x === 0) {
			throw new Error('Division by zero in Vector2d.angle');
		}

		return Math.atan2(this.y / this.x);
	}

	/**
	 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
	 * @return {number}
	 */
	public get lengthSquared(): number {
		return ((this.x * this.x) + (this.y * this.y));
	}
	//#endregion
}
