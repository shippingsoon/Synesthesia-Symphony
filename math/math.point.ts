/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

namespace Symphony.Math {
	export class Point {
		protected x:number;
		protected y:number;

		/**
		 *
		 * @param x
		 * @param y
		 */
		public constructor({x = 0, y = 0}:{x:number, y:number}) {
			this.x = x;
			this.y = y;
		}

		/**
		 *
		 * @param {number} x
		 * @return {Symphony.Math.Point}
		 */
		public setX(x:number):this {
			this.x = x;

			return this;
		}

		/**
		 *
		 * @return {number}
		 */
		public getX():number {
			return this.x;
		}

		/**
		 *
		 * @param {number} y
		 * @return {Symphony.Math.Point}
		 */
		public setY(y:number):this {
			this.y = y;

			return this;
		}

		/**
		 *
		 * @return {number}
		 */
		public getY():number {
			return this.y;
		}

		/**
		 *
		 * @param {number} n -  The number that will be used for addition.
		 * @return {Symphony.Math.Point}
		 */
		public addN(n:number):this {
			this.x += n;
			this.y += n;

			return this;
		}

		/**
		 *
		 * @param {number} n - The number that will be used for subtraction.
		 * @return {Symphony.Math.Point}
		 */
		public subtractN(n:number):this {
			this.x -= n;
			this.y -= n;

			return this;
		}

		/**
		 *
		 * @param {number} n - The number that will be used for multiplication.
		 * @return {Symphony.Math.Point}
		 */
		public multiplyN(n:number):this {
			this.x *= n;
			this.y *= n;

			return this;
		}

		/**
		 *
		 * @param {number} n - The number that will be used for division.
		 * @return {Symphony.Math.Point}
		 */
		public divideN(n:number):this {
			try {
				this.x /= n;
				this.y /= n;
			}
			catch (e) {
				console.error(e);
			}

			return this;
		}
	}
}