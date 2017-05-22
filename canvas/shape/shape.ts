/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

namespace Symphony.Canvas.Shape {
	/**
	 * Defines classes that can be drawn to the screen.
	 * @interface
	 */
	export interface Drawable {
		draw(ctx:CanvasRenderingContext2D):void;
	}
}