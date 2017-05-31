/**
 * @file - The enemy class.
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
/// <reference path="./game.lifeform.ts" />
/// <reference path="../game.projectile.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	"use strict";

	//Let the IDE know this 3rd party Keydown module is defined elsewhere.
	declare let Keydown:any;

	/**
	 * @class
	 * @classdesc The enemy class.
	 */
	export class Enemy extends Game.LifeForm implements System.StateType {
		/**
		 * @param {number} lp - The life points.
		 * @param {number} hp - The max health points.
		 * @param {number} speed - The primary speed this object will move at.
		 * @param {number} x - The object's x coordinate.
		 * @param {number} y - The object's y coordinate.
		 * @param {number} r - The object's radius.
		 * @param {Graphics.ColorType} fillColor - The circle's fill primaryColor.
		 * @param {number} lineWidth - The circle's border width.
		 * @param {Graphics.ColorType} lineColor - The circle's border primaryColor.
		 */
		public constructor({lp = 1, hp = 5, speed = 500, x = 0, y = 0, r = 1, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
			 {lp?:number, hp?:number, speed?:number, x?:number, y?:number, r?:number, fillColor?:Graphics.ColorType|string, lineWidth?:number, lineColor?:Graphics.ColorType|string})
		{
			super({lp:lp, hp:hp, speed:speed, x:x, y:y, r:r, fillColor:fillColor, lineWidth:lineWidth, lineColor:lineColor});
		}

		public start(data:System.StateData) {

		}

		public update(data:System.StateData):void {

		}

		public draw(data:System.StateData):void {
			this.render(data.session.ctx);
		}

		public pause():void{}
		public stop():void{}
		public play():void{}
	}
}

