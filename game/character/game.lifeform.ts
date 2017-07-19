/**
 * @file The system namespace is the foundation for which every class is built upon.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { Circle } from '../../graphics/shape/graphics.circle';
import { IColor, ColorName, ICssColor } from '../../graphics/graphics.types';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';
//import 'reflect-metadata';

/**
 * @class
 * @classdesc The parent class for the Player and Enemy classes.
 */
@injectable()
export class LifeForm extends Circle {
	protected lifePoints: number;
	protected healthPoints: number;
	protected readonly maxHealthPoints: number;
	protected speed: number;

	/**
	 * @param {number} lp - The life points
	 * @param {number} hp - The health points
	 * @param {number} speed - The speed
	 * @param {number} x - The circle's x coordinate
	 * @param {number} y - The circle's y coordinate
	 * @param {number} r - The circle's radius
	 * @param {IColor} fillColor - The circle's fill color.
	 * @param {number} lineWidth - The circle's border width.
	 * @param {IColor} lineColor - The circle's border color.
	 */
	public constructor({x = 0, y = 0, r = 10, lineWidth = 1}: {x?: number, y?: number, r?: number, lineWidth?: number}, @inject(TYPES.CssColor) fillColor: ICssColor, @inject(TYPES.CssColor) lineColor: ICssColor) {
		super({x: x, y: y, r: r, lineWidth: lineWidth}, fillColor, lineColor);
		//this.lifePoints = lp;
		//this.healthPoints = hp;
		//this.maxHealthPoints = hp;
		//this.speed = speed;
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
