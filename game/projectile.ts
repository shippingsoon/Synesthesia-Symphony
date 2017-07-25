/**
 * @file Handles projectiles that are used by the player and enemies.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IState } from '../system/types';
import { Circle } from '../graphics/shape/circle';
import { IColor, ColorName } from '../graphics/types';

/**
 * @class
 * @classdesc Handles projectiles that are used by the player and enemies.
 */
export class Projectile {
	private projectileIsOpen: boolean;

	/**
	 * @public
	 * @constructor
	 * @param {boolean} isOpen - Determines if the projectile leaves a trail.
	 * @param {number} x - The object's x coordinate.
	 * @param {number} y - The object's y coordinate.
	 * @param {number} r - The object's radius.
	 * @param {IColor} fillColor - The circle's fill color.
	 * @param {number} lineWidth - The circle's border width.
	 * @param {IColor} lineColor - The circle's border color.
	 */
	public constructor({isOpen = false, x = 0, y = 0, r = 1, fillColor = {r: 0, b: 0, g: 255, a: 1}, lineWidth = 1, lineColor = {r: 0, b: 0, g: 0, a: 1}}:
	{isOpen?: boolean, x?: number, y?: number, r?: number, fillColor?: IColor|ColorName, lineWidth?: number, lineColor?: IColor|ColorName}) {
		this.projectileIsOpen = isOpen;
	}

	public start(): void {

	}

	public update(): void {
		if (this.projectileIsOpen) {
			//this.createPaintTrail(data);
		}

		//this.y = this.y + 10;
	}
	public draw(): void {
		//console.log('drawing')
		//this.render(data.session.ctx);
	}

	public get isOpen(): boolean {
		return this.projectileIsOpen;
	}

	private createPaintTrail(): void {
		//const projectile = new Projectile({x: this.x, y: this.y, fillColor: this.fillColor.getColor(), lineWidth: 0, isOpen: false});
		//data.manager.add('projectiles', projectile);
	}
}
