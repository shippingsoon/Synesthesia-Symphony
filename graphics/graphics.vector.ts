/**
 * @file Vector class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IVector, isVector, IMath } from './graphics.types';
import { injectable } from 'inversify';

//Let our compiler know that this object is defined elsewhere.
declare const Math: IMath;

/**
 * @classdesc Vector class.
 */
@injectable()
export class Vector implements IVector {
	//The x and y coordinates.
	protected _x: number;
	protected _y: number;

	/**
	 * Vector constructor.
	 * @param x - The x component of the vector.
	 * @param y - The y component of the vector.
	 */
	public constructor({x = 0, y = 0}: IVector) {
		this._x = x;
		this._y = y;
	}

	/**
	 * Adds two vectors.
	 * @param vector - The vector that will be added to this vector instance.
	 * @return {IVector}
	 */
	public add(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x += x;
		this.y += y;

		return this;
	}

	/**
	 * Subtracts two vectors.
	 * @param vector - The value that will be subtracted from this vector instance.
	 * @return {IVector}
	 */
	public subtract(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x -= x;
		this.y -= y;

		return this;
	}

	/**
	 * Multiplies two vectors.
	 * @param vector - The value that will be multiplied by this vector instance.
	 * @return {IVector}
	 */
	public multiply(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x *= x;
		this.y *= y;

		return this;
	}

	/**
	 * Divides two vectors.
	 * @param vector - The value that will be used to divide this vector instance.
	 * @throws {Error}
	 * @return {IVector}
	 */
	public divide(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		//Check for division by zero.
		if (x === 0 || y === 0) {
			throw new Error('Division by zero in Vector.divide()');
		}

		this.x /= x;
		this.y /= y;

		return this;
	}

	/**
	 * Retrieves the vector's location
	 * @return {IVector}
	 */
	public getPosition(): IVector {
		return {x: this.x, y: this.y};
	}

	/**
	 * Sets the position
	 * @param vector - The value that will be used to set the position of this vector instance.
	 * @return {IVector}
	 */
	public setPosition(vector: IVector|number): this {
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
	 * @return {void}
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
	 * @return {void}
	 */
	public set y(y: number) {
		this._y = y;
	}

	/**
	 * Returns the magnitude of the vector.
	 * @return {number}
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
			throw new Error('Division by zero in Vector.angle');
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
