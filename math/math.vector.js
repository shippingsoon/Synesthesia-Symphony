/*
 * @description - The FSM (Finite State Machine) is a design pattern that allows developers to easily manage game states.
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
/// <reference path="./math.point.ts" />
var Symphony;
(function (Symphony) {
    var Math;
    (function (Math_1) {
        var Vector = (function (_super) {
            __extends(Vector, _super);
            /**
             *
             * @param {number} x - The x coordinate.
             * @param {number} y - The y coordinate.
             * @param {number} ctx - The HTML5 2D rendering context.
             */
            function Vector(_a) {
                var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, ctx = _a.ctx;
                return _super.call(this, { x: x, y: y, ctx: ctx }) || this;
            }
            /**
             * Returns the magnitude of the vector.
             * @returns {Number}
             */
            Vector.prototype.magnitude = function () {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
            };
            /**
             * Returns the angle of this vector
             * @returns {Number}
             */
            Vector.prototype.angle = function () {
                var n = 0;
                try {
                    n = Math.atan2(this.y / this.x);
                }
                catch (e) {
                    console.error(e);
                }
                return n;
            };
            /**
             * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
             * @returns {Number}
             */
            Vector.prototype.lengthSquared = function () {
                return ((this.x * this.x) + (this.y * this.y));
            };
            /**
             * Adds two vectors.
             * @param {Symphony.Math.Vector} vector - The vector that will be added to this vector instance.
             * @returns {Symphony.Math.Vector}
             */
            Vector.prototype.add = function (vector) {
                this.x += vector.getX();
                this.y += vector.getY();
                return this;
            };
            /**
             * Subtracts two vectors.
             * @param {Symphony.Math.Vector} vector - The vector that will be subtracted from this vector instance.
             * @returns {Symphony.Math.Vector}
             */
            Vector.prototype.subtract = function (vector) {
                this.x -= vector.getX();
                this.y -= vector.getY();
                return this;
            };
            /**
             * Multiplies two vectors.
             * @param {Symphony.Math.Vector} vector - The vector that will be multiplied by this vector instance.
             * @returns {Symphony.Math.Vector}
             */
            Vector.prototype.multiply = function (vector) {
                this.x *= vector.getX();
                this.y *= vector.getY();
                return this;
            };
            /**
             *
             * @param {Symphony.Math.Vector} vector - The vector that will divide this vector instance.
             * @returns {Symphony.Math.Vector}
             */
            Vector.prototype.divide = function (vector) {
                try {
                    this.x /= vector.getX();
                    this.y /= vector.getY();
                }
                catch (e) {
                    console.error(e);
                }
                return this;
            };
            /**
             *
             * @param {Symphony.Math.Vector} vector - The vector that we will use to set the position.
             * @returns {Symphony.Math.Vector}
             */
            Vector.prototype.setPosition = function (vector) {
                this.x = vector.getX();
                this.y = vector.getY();
                return this;
            };
            /**
             * Retrieves the vector's location
             * @returns {Symphony.Math.VectorType}
             */
            Vector.prototype.getPosition = function () {
                return { x: this.x, y: this.y };
            };
            return Vector;
        }(Math_1.Point));
        Math_1.Vector = Vector;
    })(Math = Symphony.Math || (Symphony.Math = {}));
})(Symphony || (Symphony = {}));
//# sourceMappingURL=math.vector.js.map