/**
 * @file Vector math.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IVector, isVector, IMath } from './graphics.types';
//import { injectable } from '../node_modules/inversify/es/inversify';
import { injectable, inject } from 'inversify';
//import 'reflect-metadata';

//Let our compiler know that this object is defined elsewhere.
declare const Math: IMath;

/**
 * @class
 * @classdesc Vector math.
 */
@injectable()
export class Vector implements IVector {
	/**
	 * The x and y coordinates.
	 * @protected
	 */
	protected _x: number;
	protected _y: number;

	/**
	 * Vector constructor.
	 * @public
	 * @constructor
	 * @param {number} x - The x component of the vector.
	 * @param {number} y - The y component of the vector.
	 * @param {IMath} _Math - Math library.
	 */
	public constructor({x = 0, y = 0}: IVector, protected _Math: IMath = Math) {
		this._x = x;
		this._y = y;
	}

	/**
	 * Adds two vectors.
	 * @public
	 * @param {IVector} vector - The vector that will be added to this vector instance.
	 * @return {Vector}
	 */
	public add(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x += x;
		this.y += y;

		return this;
	}

	/**
	 * Subtracts two vectors.
	 * @public
	 * @param {IVector|number} vector - The vector that will be subtracted from this vector instance.
	 * @return {Vector}
	 */
	public subtract(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x -= x;
		this.y -= y;

		return this;
	}

	/**
	 * Multiplies two vectors.
	 * @public
	 * @param {IVector|number} vector - The vector that will be multiplied by this vector instance.
	 * @return {Vector}
	 */
	public multiply(vector: IVector|number): this {
		const {x = 0, y = 0} = {...isVector(vector) ? vector : [vector, vector]};

		this.x *= x;
		this.y *= y;

		return this;
	}

	/**
	 * Divides two vectors.
	 * @public
	 * @param {IVector|number} vector - The vector that will divide this vector instance.
	 * @throws {Error}
	 * @return {Vector}
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
	 * @public
	 * @return {IVector}
	 */
	public getPosition(): IVector {
		return {x: this.x, y: this.y};
	}

	/**
	 * Sets the position
	 * @public
	 * @param {IVector|number} vector - The vector that we will use to set the position.
	 * @return {Vector}
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
	 * @public
	 * @return {number}
	 */
	public get x(): number {
		return this._x;
	}

	/**
	 * Sets the x component of this vector.
	 * @public
	 * @param {number} x - The number we will use to set the x component of the vector.
	 * @return {void}
	 */
	public set x(x: number) {
		this._x = x;
	}

	/**
	 * Gets the y component of this vector.
	 * @public
	 * @return {number}
	 */
	public get y(): number {
		return this._y;
	}

	/**
	 * Sets the y component of this vector.
	 * @public
	 * @param {number} y - The number we will use to set the y component of the vector.
	 * @return {void}
	 */
	public set y(y: number) {
		this._y = y;
	}

	/**
	 * Returns the magnitude of the vector.
	 * @public
	 * @return {number}
	 */
	public get magnitude(): number {
		return this._Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Returns the angle of this vector
	 * @public
	 * @throws {Error}
	 * @return {number}
	 */
	public get angle(): number {
		if (this.x === 0) {
			throw new Error('Division by zero in Vector.angle');
		}

		return this._Math.atan2(this.y / this.x);
	}

	/**
	 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
	 * @public
	 * @return {number}
	 */
	public get lengthSquared(): number {
		return ((this.x * this.x) + (this.y * this.y));
	}
	//#endregion
}
