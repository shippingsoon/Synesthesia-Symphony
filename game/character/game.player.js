/*
 * @description - The system namespace is the foundation for which every class is built upon.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../../system/system.ts" />
/// <reference path="../../system/system.state.ts" />
/// <reference path="../../system/system.fsm.ts" />
var Symphony;
(function (Symphony) {
    var Game;
    (function (Game) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(_a) {
                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.r, r = _d === void 0 ? 10 : _d, _e = _a.speed, speed = _e === void 0 ? 10 : _e;
                var _this = _super.call(this, { x: x, y: y, ctx: null }) || this;
                _this.fsm = new Symphony.System.FSM();
                _this.count = 0;
                _this.r = r;
                _this.speed = speed;
                return _this;
            }
            Player.prototype.start = function (o) {
                for (var i = 0; i < 80; i++) {
                    //var tmpPlayer = new Symphony.Game.Player({x:0, y:0, r:10, speed:i});
                    //fsm.push({state:tmpPlayer, ctx:o.ctx});
                }
            };
            Player.prototype.update = function (o) {
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
            };
            Player.prototype.draw = function (o) {
                o.ctx.clearRect(0, 0, 800, 600);
                o.ctx.beginPath();
                o.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                o.ctx.fillStyle = 'green';
                o.ctx.fill();
                o.ctx.stroke();
            };
            return Player;
        }(Symphony.Math.Vector));
        Game.Player = Player;
    })(Game = Symphony.Game || (Symphony.Game = {}));
})(Symphony || (Symphony = {}));
//# sourceMappingURL=game.player.js.map