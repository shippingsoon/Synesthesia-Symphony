/**
 * @file Handles projectiles that are used by the player and enemies.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';
import { StateType, StateData } from './../system/system';
import { Circle } from './../graphics/shape/graphics.circle';
import { ColorType } from './../graphics/graphics';

/**
 * @class
 * @classdesc Handles projectiles that are used by the player and enemies.
 */
export class Projectile extends Circle implements StateType {
	private projectileIsOpen:boolean;

	/**
	 * @param {boolean} isOpen - Determines if the projectile leaves a trail.
	 * @param {number} x - The object's x coordinate.
	 * @param {number} y - The object's y coordinate.
	 * @param {number} r - The object's radius.
	 * @param {Graphics.ColorType} fillColor - The circle's fill color.
	 * @param {number} lineWidth - The circle's border width.
	 * @param {Graphics.ColorType} lineColor - The circle's border color.
	 */
	public constructor({isOpen = false, x = 0, y = 0, r = 1, fillColor = {r: 0, b: 0, g: 255, a: 1}, lineWidth = 1, lineColor = {r: 0, b: 0, g: 0, a: 1}}:
	                   {isOpen?:boolean, x?:number, y?:number, r?:number, fillColor?:ColorType|string, lineWidth?:number, lineColor?:ColorType|string})
	{
		super({x:x, y:y, r:r, fillColor:fillColor, lineWidth:lineWidth, lineColor:lineColor});
		this.projectileIsOpen = isOpen;
	}

	public start(data:StateData):void {

	}

	public update(data:StateData):void {
		if (this.projectileIsOpen) {
			this.createPaintTrail(data);
		}

		this.setY = this.getY + 10;
	}
	public draw(data:StateData):void {
		//console.log('drawing')
		this.render(data.session.ctx);
	}

	public get isOpen():boolean {
		return this.projectileIsOpen;
	}

	private createPaintTrail(data:StateData):void {
		let projectile = new Projectile({x: this.x, y: this.y, fillColor: this.fillColor.getColor(), lineWidth: 0, isOpen: false});
		data.manager.add('projectiles', projectile);
	}
}
