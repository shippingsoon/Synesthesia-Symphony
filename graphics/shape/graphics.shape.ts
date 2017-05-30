/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="../../graphics/graphics.vector.ts" />

/**
 * @namespace
 */
namespace Symphony.Graphics {
	export abstract class Shape extends Graphics.Vector {
		/**
		 * @param {Graphics.VectorType}
		 * @constructor
		 */
		constructor({x = 0, y = 0}:{x?:number, y?:number}) {
			super({x: 0, y:0});
		}

		/**
		 * Returns the area of this shape.
		 * @return {number}
		 */
		public abstract get getArea():number;
	}

	/**
	 * Defines classes that can be drawn to the screen.
	 * @interface
	 */
	export interface Drawable {
		render(ctx:CanvasRenderingContext2D):void;
	}
}