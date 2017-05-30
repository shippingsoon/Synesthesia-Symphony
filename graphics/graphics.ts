/**
 * @description - The graphics namespace contains various drawing routines.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/**
 * @namespace
 */
namespace Symphony.Graphics {
	/**
	 * Clears the HTML5 canvas.
	 * @param {CanvasRenderingContext2D} ctx - The HTML5 2D drawing context.
	 * @param {HTMLCanvasElement} canvas - The HTML5 canvas element.
	 * return {void}
	 */
	export function clearCanvas(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement):void {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}