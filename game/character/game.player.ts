/*
 * @description - The system namespace is the foundation for which every class is built upon.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
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
	declare let Keydown:any;

	export class Player extends Game.LifeForm implements System.StateType {
		private primaryColor:Graphics.Color;
		private secondaryColor:Graphics.Color;
		private primarySpeed:number;
		private secondarySpeed:number;

		/**
		 * @constructor
		 *
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
		public constructor({secondarySpeed = 250, secondaryColor = 'blue', lp = 1, hp = 5, speed = 500, x = 0, y = 0, r = 1, fillColor = 'green', lineWidth = 1, lineColor = 'black'}:
			 {secondarySpeed?:number, secondaryColor?:string|Graphics.Color, lp?:number, hp?:number, speed?:number, x?:number, y?:number, r?:number, fillColor?:Graphics.ColorType|string, lineWidth?:number, lineColor?:Graphics.ColorType|string})
		{
			super({lp: lp, hp: hp, speed: speed, x: x, y: y, r: r, fillColor: fillColor, lineWidth: lineWidth, lineColor: lineColor});
			this.primarySpeed = speed;
			this.secondarySpeed = secondarySpeed;
			this.primaryColor = new Graphics.Color(fillColor);
			this.secondaryColor = new Graphics.Color(secondaryColor);
		}

		public start(data:System.StateData) {

		}

		public update(data:System.StateData):void {
			//Handle keyboard input.
			this.handleInput(data);
		}

		public draw(data:System.StateData):void {
			//o.ctx.clearRect(0, 0, System.session.canvas.width, System.session.canvas.height);
			//console.log(`(${this.x}, ${this.y})`);

			this.render(data.session.ctx);
		}

		private handleInput(data:System.StateData):void {
			this.speed = ((Keydown.shift) ? this.secondarySpeed : this.primarySpeed) * (data.dt / 1000.0);
			this.fillColor = (Keydown.shift) ? this.secondaryColor : this.primaryColor;

			//console.log(`(${this.getX}, ${this.getY}) fps: ${data.session.getFPS.toFixed(2)}, projectiles: ${data.manager.get('projectiles').length}`);

			//The Up key has been pressed.
			if ((Keydown.up || Keydown.w))
				this.subtract({x: 0, y: this.speed});

			//The Down key has been pressed.
			if ((Keydown.down || Keydown.s))
				this.add({x: 0, y: this.speed});

			//The Left key is pressed.
			if ((Keydown.left || Keydown.a))
				this.subtract({x: this.speed, y: 0});

			//The Right key has been pressed.
			if ((Keydown.right || Keydown.d))
				this.add({x: this.speed, y: 0});

			//The Right key has been pressed.
			if ((Keydown.z)) {
				//debugger;
				let projectile = new Game.Projectile({x: this.x, y: this.y, r: this.r, fillColor: 'blue', isOpen: true})
				data.manager.add('projectiles', projectile);
			}


		}

		public pause():void{}
		public stop():void{}
		public play():void{}
	}
}

