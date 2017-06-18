/**
 * @file Vector math.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { VectorType, isVector } from './graphics.types';

//Let our compiler know that this object is defined elsewhere.
declare const Math: any;

/**
 * @class
 * @classdesc Vector math.
 */
export class Vector {
	/**
	 * The x and y coordinates.
	 * @protected
	 */
	protected x: number;
	protected y: number;

	/**
	 * Vector constructor.
	 * @constructor
	 * @public
	 * @param {number} x - The x component of the vector.
	 * @param {number} y - The y component of the vector.
	 */
	public constructor({x = 0, y = 0}: VectorType) {
		this.x = x;
		this.y = y;
	}

	//#region Getter/Setter Region (Note: regions are collapsible with IntelliJ)

	/**
	 * Returns the magnitude of the vector.
	 * @public
	 * @return {number}
	 */
	public get getMagnitude(): number {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Returns the angle of this vector
	 * @public
	 * @throws {Error}
	 * @return {number}
	 */
	public get getAngle(): number {
		if (this.x === 0) {
			throw new Error('Division by zero in Vector.angle()');
		}

		return Math.atan2(this.y / this.x);
	}

	/**
	 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
	 * @public
	 * @return {number}
	 */
	public get getLengthSquared(): number {
		return ((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Adds two vectors.
	 * @public
	 * @param {VectorType} vector - The vector that will be added to this vector instance.
	 * @return {Vector}
	 */
	public add(vector: VectorType|number): this {
		if (isVector(vector)) {
			this.x += vector.x;
			this.y += vector.y;
		}
		else {
			this.x += vector;
			this.y += vector;
		}

		return this;
	}

	/**
	 * Subtracts two vectors.
	 * @public
	 * @param {VectorType|number} vector - The vector that will be subtracted from this vector instance.
	 * @return {Vector}
	 */
	public subtract(vector: VectorType|number): this {
		if (isVector(vector)) {
			this.x -= vector.x;
			this.y -= vector.y;
		}
		else {
			this.x -= vector;
			this.y -= vector;
		}

		return this;
	}

	/**
	 * Multiplies two vectors.
	 * @public
	 * @param {VectorType|number} vector - The vector that will be multiplied by this vector instance.
	 * @return {Vector}
	 */
	public multiply(vector: VectorType|number): this {
		if (isVector(vector)) {
			this.x *= vector.x;
			this.y *= vector.y;
		}
		else {
			this.x *= vector;
			this.y *= vector;
		}

		return this;
	}

	/**
	 * Divides two vectors.
	 * @public
	 * @param {VectorType|number} vector - The vector that will divide this vector instance.
	 * @return {Vector}
	 */
	public divide(vector: VectorType|number): this {
		if (isVector(vector)) {
			//Do not divide if we received a value of zero.
			if (vector.x !== 0) {
				this.x /= vector.x;
			}

			if (vector.y !== 0) {
				this.y /= vector.y;
			}
		}
		else {
			if (vector !== 0) {
				this.x /= vector;
				this.y /= vector;
			}
		}

		return this;
	}

	/**
	 * Retrieves the vector's location
	 * @public
	 * @return {VectorType}
	 */
	public get getPosition(): VectorType {
		return {x: this.x, y: this.y};
	}

	/**
	 * Sets the position
	 * @public
	 * @param {VectorType|number} vector - The vector that we will use to set the position.
	 * @return {Vector}
	 */
	public set setPosition(vector: VectorType|number) {
		if (isVector(vector)) {
			this.x = vector.x;
			this.y = vector.y;
		}
		else {
			this.x = vector;
			this.y = vector;
		}
	}

	/**
	 * Gets the x component of this vector.
	 * @public
	 * @return {number}
	 */
	public get getX(): number {
		return this.x;
	}

	/**
	 * Sets the x component of this vector.
	 * @public
	 * @param {number} x - The number we will use to set the x component of the vector.
	 * @return {void}
	 */
	public set setX(x: number) {
		this.x = x;
	}

	/**
	 * Gets the y component of this vector.
	 * @public
	 * @return {number}
	 */
	public get getY(): number {
		return this.y;
	}

	/**
	 * Sets the y component of this vector.
	 * @public
	 * @param {number} y - The number we will use to set the y component of the vector.
	 * @return {void}
	 */
	public set setY(y: number) {
		this.y = y;
	}

	//#endregion
}
