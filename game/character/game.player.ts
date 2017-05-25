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

namespace Symphony.Game {
	//Import dependencies.
	import session = System.session;

	declare var Keydown:any;
	declare let Math:any;

	class _Player extends Symphony.Graphics.CircleShape {
		public speed:number;
		public circle:Graphics.Circle;

		constructor({x = 0, y = 0, r = 10, speed = 10, color = 'red'}:{x?:number, y?:number, r?:number, speed?:number, color?:Graphics.ColorType}) {
			super({x: x, y: y, r: r});
			this.speed = speed;

			this.circle = new Graphics.Circle({
				x: x,
				y: y,
				r: r,
				color: color
			});
		}

		public start(o:System.StateData) {

		}

		public update(o:System.StateData):void {
			let s = this.speed * (o.dt / 1000.0);
			console.log(`(${this.x}, ${this.y})`);

			//The Up key has been pressed.
			if ((Keydown.up || Keydown.w))
				this.y = this.y - s;

			//The Down key has been pressed.
			if ((Keydown.down || Keydown.s))
				this.y = this.y + s;

			//The Left key is pressed.
			if ((Keydown.left || Keydown.a))
				this.x = this.x - s;

			//The Right key has been pressed.
			if ((Keydown.right || Keydown.d))
				this.x = this.x + s;

			//this.circle.setPosition(this.getPosition());
			this.circle.setPosition = this.getPosition;

			//console.log(`${Symphony.System.FPS.toFixed(2)} (x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}) ${new Date()}`)

		}

		public draw(o:System.StateData):void {
			o.ctx.clearRect(0, 0, System.session.canvas.width, System.session.canvas.height);
			console.log(`(${this.x}, ${this.y})`);
			this.circle.draw(o.ctx);
		}
	}

	export class Player extends _Player {
		public constructor(o:any){
			super(o);


		}



	}
}

