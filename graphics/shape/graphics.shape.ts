/**
 * @file An abstract class for 2D shapes.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="../../graphics/graphics.vector.ts" />

/**
 * @namespace
 */
namespace Symphony.Graphics {
	"use strict";

	/**
	 * @class
	 * @classdesc An abstract class for 2D shapes
	 */
	export abstract class Shape extends Graphics.Vector {
		/**
		 * @param {number} x - The x coordinate
		 * @param {number} y - The y coordinate
		 */
		constructor({x = 0, y = 0}:{x?:number, y?:number}) {
			super({x:x, y:y});
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