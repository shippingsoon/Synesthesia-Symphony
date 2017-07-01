/**
 * @file The player class handles user input for the player
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IState, IStateData } from '../../system/system.types';
import { LifeForm } from './game.lifeform';
import { IColor, ColorName } from '../../graphics/graphics.types';
import { Color } from '../../graphics/graphics.color';
import { Projectile } from '../game.projectile';
import { IEntity } from '../game.types';

//Let the IDE know this 3rd party Keydown module is defined elsewhere.
declare const Keydown: any;

/**
 * @class
 * @classdesc The player class
 */
export class Player extends LifeForm implements IState, IEntity {
	private primaryColor: Color;
	private secondaryColor: Color;
	private primarySpeed: number;
	private secondarySpeed: number;

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
	 * @param {number} secondarySpeed
	 * @param {IColor} secondaryColor
	 */
	public constructor({secondarySpeed = 250, secondaryColor = 'blue', lp = 1, hp = 5, speed = 500, x = 0, y = 0, r = 1, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
	{secondarySpeed?: number, secondaryColor?: ColorName|IColor, lp?: number, hp?: number, speed?: number, x?: number, y?: number, r?: number, fillColor?: IColor|ColorName, lineWidth?: number, lineColor?: IColor|ColorName}) {
		super({lp: lp, hp: hp, speed: speed, x: x, y: y, r: r, fillColor: fillColor, lineWidth: lineWidth, lineColor: lineColor});
		this.primarySpeed = speed;
		this.secondarySpeed = secondarySpeed;
		this.primaryColor = new Color(fillColor);
		this.secondaryColor = new Color(secondaryColor);
	}

	public start(data: IStateData) {

	}

	public update(data: IStateData): void {
		//Handle keyboard input.
		this.handleInput(data);
	}

	public draw(data: IStateData): void {
		//o.ctx.clearRect(0, 0, session.canvas.width, session.canvas.height);
		//console.log(`(${this.x}, ${this.y})`);

		this.render(data.session.ctx);
	}

	private handleInput(data: IStateData): void {
		this.speed = ((Keydown.shift) ? this.secondarySpeed : this.primarySpeed) * (data.dt / 1000.0);
		this.fillColor = (Keydown.shift) ? this.secondaryColor : this.primaryColor;

		//console.log(`(${this.getX}, ${this.getY}) fps: ${data.session.getFPS.toFixed(2)}, projectiles: ${data.manager.get('projectiles').length}`);

		//The Up key has been pressed.
		if ((Keydown.up || Keydown.w)) {
			this.subtract({x: 0, y: this.speed});
		}

		//The Down key has been pressed.
		if ((Keydown.down || Keydown.s)) {
			this.add({x: 0, y: this.speed});
		}

		//The Left key is pressed.
		if ((Keydown.left || Keydown.a)) {
			this.subtract({x: this.speed, y: 0});
		}

		//The Right key has been pressed.
		if ((Keydown.right || Keydown.d)) {
			this.add({x: this.speed, y: 0});
		}

		//The Right key has been pressed.
		if ((Keydown.z)) {
			//debugger;
			const projectile = new Projectile({x: this.x, y: this.y, r: this.r, fillColor: 'blue', isOpen: true});
			//data.manager.add('projectiles', projectile);
		}
	}

	public pause(): void {}
	public stop(): void {}
	public play(): void {}
}
