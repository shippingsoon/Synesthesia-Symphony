/*
 * @description - Vector constructor
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

namespace Symphony.Graphics {
	declare let Math:any;

	export class Vector {
		protected x:number;
		protected y:number;

		/**
		 * Vector constructor.
		 * @constructor
		 * @param {number} x - The x component of the vector.
		 * @param {number} y - The y component of the vector.
		 */
		constructor({x = 0, y = 0}:VectorType) {
			this.x = x;
			this.y = y;
		}

		/**
		 * Returns the magnitude of the vector.
		 * @return {number}
		 */
		public get getMagnitude():number {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		}

		/**
		 * Returns the angle of this vector
		 * @return {number}
		 */
		public get getAngle():number {
			if (this.x === 0)
				throw 'Division by zero in Vector->angle()';

			return Math.atan2(this.y / this.x);
		}

		/**
		 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
		 * @return {number}
		 */
		public get getLengthSquared():number {
			return ((this.x * this.x) + (this.y * this.y));
		}

		/**
		 * Adds two vectors.
		 * @param {Symphony.Graphics.VectorType} vector - The vector that will be added to this vector instance.
		 * @return {Symphony.Graphics.Vector}
		 */
		public add(vector:VectorType):this {
			this.x += vector.x;
			this.y += vector.y;

			return this;
		}

		/**
		 * Subtracts two vectors.
		 * @param {Symphony.Graphics.VectorType} vector - The vector that will be subtracted from this vector instance.
		 * @return {Symphony.Graphics.Vector}
		 */
		public subtract(vector:VectorType):this {
			this.x -= vector.x;
			this.y -= vector.y;

			return this;
		}

		/**
		 * Multiplies two vectors.
		 * @param {Symphony.Graphics.VectorType} vector - The vector that will be multiplied by this vector instance.
		 * @return {Symphony.Graphics.Vector}
		 */
		public multiply(vector:VectorType):this {
			this.x *= vector.x;
			this.y *= vector.y;

			return this;
		}

		/**
		 *
		 * @param {Symphony.Graphics.VectorType} vector - The vector that will divide this vector instance.
		 * @return {Symphony.Graphics.Vector}
		 */
		public divide(vector:VectorType):this {
			if (this.y === 0)
				throw 'Division by zero in Vector.divide()';

			this.x /= vector.x;
			this.y /= vector.y;

			return this;
		}

		/**
		 * Retrieves the vector's location
		 * @return {Symphony.Graphics.VectorType}
		 */
		public get getPosition():VectorType {
			return {x: this.x, y: this.y};
		}

		/**
		 *
		 * @param {Symphony.Graphics.VectorType} vector - The vector that we will use to set the position.
		 * @return {Symphony.Graphics.Vector}
		 */
		public set setPosition(vector:VectorType) {
			this.x = vector.x;
			this.y = vector.y;
		}

		/**
		 * Gets the x component of this vector.
		 * @return {number}
		 */
		public get getX():number {
			return this.x;
		}

		/**
		 * Sets the x component of this vector.
		 * @param {number} x - The number we will use to set the x component of the vector.
		 * @return {void}
		 */
		public set setX(x:number) {
			this.x = x;
		}

		/**
		 * Gets the y component of this vector.
		 * @return {number}
		 */
		public get getY():number {
			return this.y;
		}

		/**
		 * Sets the y component of this vector.
		 * @param {number} y - The number we will use to set the y component of the vector.
		 * @return {void}
		 */
		public set setY(y:number) {
			this.y = y;
		}
	}

	/**
	 * Defines a vector.
	 * @interface
	 */
	export interface VectorType {
		readonly x:number;
		readonly y:number;
	}
}