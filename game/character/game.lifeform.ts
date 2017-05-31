/**
 * @file The system namespace is the foundation for which every class is built upon.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="../../system/system.ts" />
/// <reference path="../../system/system.session.ts" />
/// <reference path="../../system/system.state.ts" />
/// <reference path="../../system/system.fsm.ts" />
/// <reference path="../../graphics/shape/graphics.shape.ts" />
/// <reference path="../../graphics/shape/graphics.circle.ts" />
/// <reference path="../../graphics/graphics.vector.ts" />

namespace Symphony.Game {
	"use strict";

	/**
	 * @class
	 * @classdesc The parent class for the Player and Enemy classes.
	 */
	export class LifeForm extends Graphics.Circle {
		protected lifePoints:number;
		protected healthPoints:number;
		protected maxHealthPoints:number;
		protected speed:number;

		/**
		 * @param {number} lp - The life points
		 * @param {number} hp - The health points
		 * @param {number} speed - The speed
		 * @param {number} x - The circle's x coordinate
		 * @param {number} y - The circle's y coordinate
		 * @param {number} r - The circle's radius
		 * @param {Graphics.ColorType} fillColor - The circle's fill color.
		 * @param {number} lineWidth - The circle's border width.
		 * @param {Graphics.ColorType} lineColor - The circle's border color.
		 */
		public constructor({lp = 1, hp = 5, speed = 10, x = 0, y = 0, r = 1, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
                        {lp?:number, hp?:number, speed?:number, x?:number, y?:number, r?:number, fillColor?:Graphics.ColorType|string, lineWidth?:number, lineColor?: Graphics.ColorType|string})
		{
			super({x: x, y: y, r: r, fillColor: fillColor, lineWidth: lineWidth, lineColor: lineColor});
			this.lifePoints = lp;
			this.healthPoints = hp;
			this.maxHealthPoints = hp;
			this.speed = speed;
		}

		//#region Getter/Setter Region (Note: regions are collapsible with IntelliJ)

		/**
		 * Gets the life points.
		 * @return {number}
		 */
		public get getLP(): number {
			return this.lifePoints;
		}

		/**
		 * Sets the life points.
		 * @param {number} hp - The health points to set.
		 * @return {void}
		 */
		public set setLP(hp: number) {
			this.lifePoints = hp;
		}

		/**
		 * Gets the health points.
		 * @return {number}
		 */
		public get getHP(): number {
			return this.healthPoints;
		}

		/**
		 * Sets the health points.
		 * @param {number} hp - The health points to set.
		 * @return {void}
		 */
		public set setHP(hp: number) {
			this.healthPoints = hp;
		}
		//#endregion

	}
}