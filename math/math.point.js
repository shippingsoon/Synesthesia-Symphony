/*
 * @description - The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */
"use strict";
var Symphony;
(function (Symphony) {
    var Math;
    (function (Math) {
        var Point = (function () {
            function Point(_a) {
                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, ctx = _a.ctx;
                this.x = x;
                this.y = y;
                this.ctx = ctx;
            }
            Point.prototype.setX = function (x) {
                this.x = x;
                return this;
            };
            Point.prototype.getX = function () {
                return this.x;
            };
            Point.prototype.setY = function (y) {
                this.y = y;
                return this;
            };
            Point.prototype.getY = function () {
                return this.y;
            };
            /**
             *
             * @param {number} n -  The number that will be used for addition.
             * @returns {Symphony.Math.Point}
             */
            Point.prototype.addN = function (n) {
                this.x += n;
                this.y += n;
                return this;
            };
            /**
             *
             * @param {number} n - The number that will be used for subtraction.
             * @returns {Symphony.Math.Point}
             */
            Point.prototype.subtractN = function (n) {
                this.x -= n;
                this.y -= n;
                return this;
            };
            /**
             *
             * @param {number} n - The number that will be used for multiplication.
             * @returns {Symphony.Math.Point}
             */
            Point.prototype.multiplyN = function (n) {
                this.x *= n;
                this.y *= n;
                return this;
            };
            /**
             *
             * @param {number} n - The number that will be used for division.
             * @returns {Symphony.Math.Point}
             */
            Point.prototype.divideN = function (n) {
                try {
                    this.x /= n;
                    this.y /= n;
                }
                catch (e) {
                    console.error(e);
                }
                return this;
            };
            return Point;
        }());
        Math.Point = Point;
    })(Math = Symphony.Math || (Symphony.Math = {}));
})(Symphony || (Symphony = {}));
//# sourceMappingURL=math.point.js.map