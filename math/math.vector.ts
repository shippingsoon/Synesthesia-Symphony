/*
 * @description - The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./math.point.ts" />


namespace Symphony.Math {
	declare let Math:any;

	export class Vector extends Point {
		/**
		 * @constructor
		 * @param {number} x - The x coordinate.
		 * @param {number} y - The y coordinate.
		 * @param {number} ctx - The HTML5 2D rendering context.
		 */
		constructor({x = 0, y = 0}:{x:number, y:number}) {
			super({x: x, y: y});
		}

		/**
		 * Returns the magnitude of the vector.
		 * @return {number}
		 */
		public magnitude():number {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		}

		/**
		 * Returns the angle of this vector
		 * @return {number}
		 */
		public angle():number {
			let n:number = 0;

			try {
				n = Math.atan2(this.y / this.x);
			}
			catch (e) {
				console.error(e);
			}

			return n;
		}

		/**
		 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
		 * @return {number}
		 */
		public lengthSquared():number {
			return ((this.x * this.x) + (this.y * this.y));
		}


		/**
		 * Adds two vectors.
		 * @param {Symphony.Math.VectorType} vector - The vector that will be added to this vector instance.
		 * @return {Symphony.Math.Vector}
		 */
		public add(vector:VectorType):this {
			this.x += vector.x;
			this.y += vector.y;

			return this;
		}

		/**
		 * Subtracts two vectors.
		 * @param {Symphony.Math.VectorType} vector - The vector that will be subtracted from this vector instance.
		 * @return {Symphony.Math.Vector}
		 */
		public subtract(vector:VectorType):this {
			this.x -= vector.x;
			this.y -= vector.y;

			return this;
		}

		/**
		 * Multiplies two vectors.
		 * @param {Symphony.Math.VectorType} vector - The vector that will be multiplied by this vector instance.
		 * @return {Symphony.Math.Vector}
		 */
		public multiply(vector:VectorType):this {
			this.x *= vector.x;
			this.y *= vector.y;

			return this;
		}

		/**
		 *
		 * @param {Symphony.Math.VectorType} vector - The vector that will divide this vector instance.
		 * @return {Symphony.Math.Vector}
		 */
		public divide(vector:VectorType):this {
			try {
				this.x /= vector.x;
				this.y /= vector.y;
			}
			catch (e) {
				console.error(e);
			}

			return this;
		}

		/**
		 *
		 * @param {Symphony.Math.VectorType} vector - The vector that we will use to set the position.
		 * @return {Symphony.Math.Vector}
		 */
		public setPosition(vector:VectorType):this {
			this.x = vector.x;
			this.y = vector.y;

			return this;
		}

		/**
		 * Retrieves the vector's location
		 * @return {Symphony.Math.VectorType}
		 */
		public getPosition():VectorType {
			return {x: this.x, y: this.y};
		}
	}

	/**
	 * Defines a vector.
	 * @interface
	 */
	export interface VectorType {
		x:number;
		y:number;
	}
}