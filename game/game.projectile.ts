/**
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */


/// <reference path="../graphics/shape/graphics.circle.ts" />
/// <reference path="../system/system.state.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	export class Projectile extends Graphics.Circle implements System.StateType {
		private projectileIsOpen:boolean;

		/**
		 * @constructor
		 * @param {number} lp - The life points
		 * @param {number} mhp - The max health points
		 * @param {number} speed - The speed
		 * @param {number} fireRate - The fire rate
		 * @param {number} x - The circle's x coordinate
		 * @param {number} y - The circle's y coordinate
		 * @param {number} r - The circle's radius
		 * @param {Graphics.ColorType} fillColor - The circle's fill color.
		 * @param {number} lineWidth - The circle's border width.
		 * @param {Graphics.ColorType} lineColor - The circle's border color.
		 * @param {any} gco - The HTML5 canvas globalCompositeOperation.
		 */
		public constructor({isOpen = false, x = 0, y = 0, r = 1, fillColor = {r: 0, b: 0, g: 255, a: 1}, lineWidth = 1, lineColor = {r: 0, b: 0, g: 0, a: 1}, gco = null}: { isOpen?: boolean, x?: number, y?: number, r?: number, fillColor?: Graphics.ColorType | string, lineWidth?: number, lineColor?: Graphics.ColorType | string, gco?: string}) {
			super({x: x, y: y, r: r, fillColor: fillColor, lineWidth: lineWidth, lineColor: lineColor, gco: gco});
			this.projectileIsOpen = isOpen;
		}

		public start(data:System.StateData):void {

		}

		public update(data:System.StateData):void {
			if (this.projectileIsOpen) {
				this.createPaintTrail(data);
			}

			this.setY = this.getY + 10;
		}
		public draw(data:System.StateData):void {
			//console.log('drawing')
			this.render(data.session.ctx);
		}

		public get isOpen():boolean {
			return this.projectileIsOpen;
		}

		private createPaintTrail(data:System.StateData):void {
			let projectile = new Projectile({x: this.x, y: this.y, fillColor: this.fillColor.getColor(), lineWidth: 0, isOpen: false});
			data.manager.add('projectiles', projectile);
		}
	}
}