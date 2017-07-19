/**
 * @file - The enemy class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { LifeForm } from './game.lifeform';
import { IState } from '../../system/system.types';
import { IColor, ColorName } from '../../graphics/graphics.types';
import { IEntity } from '../game.types';

/**
 * @class
 * @classdesc The enemy class.
 */
export class Enemy {
	/**
	 * @param {number} lp - The life points.
	 * @param {number} hp - The max health points.
	 * @param {number} speed - The primary speed this object will move at.
	 * @param {number} x - The object's x coordinate.
	 * @param {number} y - The object's y coordinate.
	 * @param {number} r - The object's radius.
	 * @param {IColor} fillColor - The circle's fill primaryColor.
	 * @param {number} lineWidth - The circle's border width.
	 * @param {IColor} lineColor - The circle's border primaryColor.
	 */
	public constructor({lp = 1, hp = 5, speed = 500, x = 0, y = 0, r = 1, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
	{lp?: number, hp?: number, speed?: number, x?: number, y?: number, r?: number, fillColor?: IColor|ColorName, lineWidth?: number, lineColor?: IColor|ColorName}) {

	}

	public start() {

	}

	public update(): void {

	}

	public draw(): void {
		//this.render(data.session.ctx);
	}

	public pause(): void {}
	public stop(): void {}
	public play(): void {}
}
