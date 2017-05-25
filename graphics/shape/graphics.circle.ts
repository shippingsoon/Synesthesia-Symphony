/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="../graphics.vector.ts" />
/// <reference path="./graphics.shape.ts" />
/// <reference path="../graphics.color.ts" />



namespace Symphony.Graphics {
	declare let Math:any;

	export class CircleShape extends Graphics.Shape {
		protected r:number;

		/**
		 * Creates a new CircleShape.
		 * @constructor
		 * @param {number} x
		 * @param {number} y
		 * @param {number} r
		 */
		public constructor({x = 0, y = 0, r = 1}:{x:number, y:number, r:number}) {
			super({x: x, y: y});

			//Make sure the radius is greater than 0.
			if (_.lte(r, 0))
				throw `Radius must be greater than zero: ${r} in CircleShape.constructor()`;

			this.r = r;
		}

		/**
		 * Gets the circle's radius.
		 * @return {number}
		 */
		public get getRadius():number {
			return this.r;
		}

		/**
		 * Sets the circle's radius.
		 * @param {number} radius
		 * @return {void}
		 */
		public set setRadius(radius:number) {
			//Make sure the radius is greater than 0.
			if (_.lte(radius, 0))
				throw `Radius must be greater than zero: ${radius} in CircleShape.setRadius()`;

			this.r = radius;
		}

		/**
		 * Gets the circle's area.
		 * @return {number}
		 */
		public get getArea():number {
			return Math.PI * (this.r * this.r);
		}

	}

	export class Circle extends Graphics.CircleShape implements Graphics.Drawable {
		//The circle's color.
		private color:Graphics.Color;

		//The width of the circle's border.
		private lineWidth:number;

		//The color of the circle's border.
		private lineColor:Graphics.Color;

		private globalCompositeOperation:string;

		/**
		 * @constructor
		 * @param {number} x
		 * @param {number} y
		 * @param {number} r
		 * @param {Symphony.Graphics.ColorType} color
		 * @param {number} lineWidth
		 * @param {Symphony.Graphics.ColorType} lineColor -
		 * @param {any} gco - globalCompositeOperation
		 */
		constructor({x = 0, y = 0, r = 0, color = {r:0, b:0, g:255, a:1}, lineWidth = 1, lineColor = {r:0, b:0, g:0, a:1}, gco = null}:{x?:number, y?:number, r?:number, color?:Graphics.ColorType|string, lineWidth?:number, lineColor?:Graphics.ColorType|string, gco?:string}
		) {
			super({x: x, y: y, r: r});
			this.color = new Color(color);
			this.lineWidth = lineWidth;
			this.lineColor = new Color(lineColor);
			this.globalCompositeOperation = gco;
		}

		/**
		 * Draws the circle.
		 * @param {CanvasRenderingContext2D} ctx - The HTML5 2D drawing context.
		 * return {void}
		 */
		public draw(ctx:CanvasRenderingContext2D):void {
			if (ctx) {
				//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
				ctx.save();

				//Set the composition operation.
				if (this.globalCompositeOperation)
					ctx.globalCompositeOperation = this.globalCompositeOperation;

				//Make the shape circular.
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

				//Fill in the circle with the given color.
				ctx.fillStyle = this.color.getHex;
				ctx.fill();

				//If a line width is specified stroke an outline around the circle..
				if (this.lineWidth) {
					ctx.lineWidth = this.lineWidth;
					ctx.strokeStyle = this.lineColor.getHex;
					ctx.stroke();
				}

				//Restore the 2D rendering context back to its previous state.
				ctx.restore();
			}
		}

		/**
		 * Gets the circle's color.
		 * @return {Symphony.Graphics.ColorType}
		 */
		public getColor():Graphics.ColorType {
			return this.color.getColor();
		}

		/**
		 *
		 * @param color
		 * @return {Symphony.Graphics.Shape.Circle}
		 */
		public setColor(color:Graphics.ColorType):Circle {
			this.color.setColor(color);

			return this;
		}

		/**
		 * Get the color of this circle in hexadecimal format.
		 * @return {string}
		 */
		public getHex():string {
			return this.color.getHex;
		}

		/**
		 * Get the color of this circle in rgba format.
		 * @return {string}
		 */
		public getRGBA():string {
			return this.color.getRGBA;
		}


	}


}