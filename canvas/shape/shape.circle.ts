/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./shape.ts" />
/// <reference path="./../../canvas/canvas.color.ts" />
/// <reference path="./../../math/math.vector.ts" />


namespace Symphony.Canvas.Shape {
	export class CircleShape extends Symphony.Math.Vector {
		protected r:number;

		/**
		 * Creates a new CircleShape.
		 * @constructor
		 * @param {number} x
		 * @param {number} y
		 * @param {number} r
		 */
		public constructor({x = 0, y = 0, r = 1}:any) {
			super({x: x, y: y});

			//Make sure the radius is greater than 0.
			if (_.lte(r, 0))
				throw `Radius cannot be zero: ${r}`;

			this.r = r;
		}

		/**
		 * Gets the circle's radius.
		 * @return {number}
		 */
		public getRadius():number {
			return this.r;
		}

		/**
		 * Sets the circle's radius.
		 * @param radius
		 * @return {Symphony.Canvas.Shape.CircleShape}
		 */
		public setRadius(radius:number):this {
			//Make sure the radius is greater than 0.
			if (_.lte(radius, 0))
				throw `Radius cannot be zero: ${radius}`;

			this.r = radius;

			return this;
		}

	}

	export class Circle extends Canvas.Shape.CircleShape implements Canvas.Shape.Drawable {
		//The circle's color.
		private color:Canvas.Color;

		//The width of the circle's border.
		private lineWidth:number;

		//The color of the circle's border.
		private lineColor:Canvas.Color;

		private globalCompositeOperation:string;

		/**
		 * @constructor
		 * @param x
		 * @param y
		 * @param r
		 * @param color
		 * @param lineWidth
		 * @param lineColor
		 * @param globalCompositeOperation
		 */
		constructor({x = 0, y = 0, r = 0, color = {r:0, b:0, g:0, a:1} || 'green', lineWidth = 1, lineColor = {r:0, b:0, g:0, a:1}, globalCompositeOperation = null}:{x:number, y:number, r:number, color:Canvas.ColorType|string, lineWidth:number, lineColor:ColorType, globalCompositeOperation:string}) {
			super({x: x, y: y, r: r});
			this.color = new Color(color);
			this.lineWidth = lineWidth;
			this.lineColor = new Color(lineColor);
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
				ctx.arc(this.x, this.y, this.r, 0, 2 * 1 /*Math.PI*/, false);

				//Fill in the circle with the given color.
				ctx.fillStyle = this.color.getHex();
				ctx.fill();

				//If a line width is specified stroke an outline around the circle..
				if (this.lineWidth) {
					ctx.lineWidth = this.lineWidth;
					ctx.strokeStyle = this.lineColor.getHex();
					ctx.stroke();
				}

				//Restore the 2D rendering context back to its previous state.
				ctx.restore();
			}
		}

		/**
		 * Gets the circle's color.
		 * @return {Symphony.Canvas.ColorType}
		 */
		public getColor():Canvas.ColorType {
			return this.color.getColor();
		}

		public setColor(color:Canvas.ColorType):Circle {
			this.color.setColor(color);

			return this;
		}

		public getHex():string {
			return this.color.getHex();
		}

		public getRGBA():string {
			return this.color.getRGBA();
		}


	}


}