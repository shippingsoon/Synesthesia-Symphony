/*
 * @description - The system namespace is the foundation for which every class is built upon.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="../../system/system.ts" />
/// <reference path="../../system/system.state.ts" />
/// <reference path="../../system/system.fsm.ts" />
/// <reference path="../../canvas/shape/shape.ts" />
/// <reference path="../../canvas/shape/shape.circle.ts" />
/// <reference path="../../math/math.vector.ts" />

namespace Symphony.Game {
	//Import dependencies.
    import State = System.State;
    import FSM = System.FSM;

	declare var Keydown:any;
	declare let Math:any;

    export class Player extends Symphony.Canvas.Shape.CircleShape implements System.State {
        public speed:number;
        public circle:Canvas.Shape.Circle;

	    constructor({x = 0, y = 0, r = 10, speed = 10}:{x?:number, y?:number, r?:number, speed?:number}) {
		    super({x: x, y: y, r: r});
		    this.speed = speed;

		    this.circle = new Canvas.Shape.Circle({
			    x: x,
			    y: y,
			    r: r,
			    color: 'red'
		    });
	    }

        public start(o:any) {

        }

        public update(o:any):void {
            var s = this.speed * (o.dt / 1000.0);

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

            this.circle.setPosition(this.getPosition());

            //console.log(`${Symphony.System.FPS.toFixed(2)} (x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}) ${new Date()}`)

        }

        public draw(o:System.StateData):void {
	    	o.ctx.clearRect(0, 0, System.canvas.width, System.canvas.height)
			this.circle.draw(o.ctx);
        }
    }
}

