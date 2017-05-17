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

namespace Symphony.Game {
    //Import dependencies.
    import State = System.State;
    import FSM = System.FSM;

    //Let the compiler know that we are using the Lodash utilities library..
    declare let _:any;
    declare let Keydown:any;
    declare let Math:any;

    export class Player extends Symphony.Math.Vector implements System.State {
        private fsm:System.FSM = new System.FSM();
        public r:number;
        public speed:number;
        public count:number = 0;

        public start(o:any) {

            for (var i = 0; i < 80; i++ ) {
                //var tmpPlayer = new Symphony.Game.Player({x:0, y:0, r:10, speed:i});
                //fsm.push({state:tmpPlayer, ctx:o.ctx});
            }
        }

        public update(o:any):void {
            //console.log(`o.dt: ${o.dt}`);
            //console.log(`this.speed: ${this.speed}`);
            //console.log(`this.speed * o.dt: ${this.speed * o.dt}`);

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

            //console.log(`(x: ${this.x}, y: ${this.y})`)

        }

        public draw(o:System.StateData):void {
            o.ctx.clearRect(0, 0, 800, 600);
            o.ctx.beginPath();
            o.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            o.ctx.fillStyle = 'green';
            o.ctx.fill();
            o.ctx.stroke();
        }

        constructor({x = 0, y = 0, r = 10, speed = 10}:{x?:number, y?:number, r?:number, speed?:number}) {
            super({x: x, y: y, ctx:null});

            this.r = r;
            this.speed = speed;
        }
    }
}

