/*
 * @description - The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

namespace Symphony.Math {
	export class Point {
		protected x:number;
		protected y:number;
		protected ctx:CanvasRenderingContext2D;

		constructor({x = 0, y = 0, ctx}:{x:number, y:number,ctx:CanvasRenderingContext2D}) {
			this.x = x;
			this.y = y;
			this.ctx = ctx;
		}

		public setX(x:number):this {
			this.x = x;

			return this;
		}

		public getX():number {
			return this.x;
		}

		public setY(y:number):this {
			this.y = y;

			return this;
		}

		public getY():number {
			return this.y;
		}

		/**
		 *
		 * @param {number} n -  The number that will be used for addition.
		 * @returns {Symphony.Math.Point}
		 */
		public addN(n:number):this {
			this.x += n;
			this.y += n;

			return this;
		}

		/**
		 *
		 * @param {number} n - The number that will be used for subtraction.
		 * @returns {Symphony.Math.Point}
		 */
		public subtractN(n:number):this {
			this.x -= n;
			this.y -= n;

			return this;
		}

		/**
		 *
		 * @param {number} n - The number that will be used for multiplication.
		 * @returns {Symphony.Math.Point}
		 */
		public multiplyN(n:number):this {
			this.x *= n;
			this.y *= n;

			return this;
		}

		/**
		 *
		 * @param {number} n - The number that will be used for division.
		 * @returns {Symphony.Math.Point}
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