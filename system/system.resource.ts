/*
 * @description - Resource management.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.ts" />

namespace Symphony.System.Resource {
	/**
	 * This method initiates resources such as the System.canvas and System.ctx.
	 * @param {Symphony.System} system - The System namespace.
	 * @return {void}
	 */
	export function init(system:any):void {
		//Detect the current screen resolution.
		//The getResolution() method will return a System.Config.RESOLUTIONS object containing the width and height
		//which we will use to set the canvas' width and height.
		let resolution:System.Session.ResolutionType = getResolution(system.Config.RESOLUTIONS);

		//Set the canvas.
		system.canvas = <HTMLCanvasElement> document.querySelector("#canvas-layer");
		system.bg_canvas = <HTMLCanvasElement> document.querySelector("#background-layer");

		//Use the value from System.Config.RESOLUTIONS to update the canvas width and height.
		system.canvas.width = resolution.CANVAS_W;
		system.canvas.height = resolution.CANVAS_H;
		system.bg_canvas.width = resolution.W;
		system.bg_canvas.height = resolution.H;

		//Set the HTML5 2D drawing context.
		system.ctx = system.canvas.getContext("2d");
		system.bg_ctx = system.bg_canvas.getContext("2d");

		//Create a new Finite State Machine.
		system.fsm = new system.FSM();
	}

	/**
	 * This method tries to detect the screen resolution. It returns an object containing a width and height.
	 * @param {Symphony.System.Config.RESOLUTIONS} resolutions - The screen resolutions.
	 * @return {Symphony.System.Session.ResolutionType}
	 */
	export function getResolution(resolutions:any):System.Session.ResolutionType {
		//Check to see if this is a medium screen resolution.
		if (window.matchMedia(`(min-width:${resolutions['MEDIUM'].W}px)`).matches)
			return resolutions['MEDIUM'];

		//Check to see if this is a high screen resolution.
		else if (window.matchMedia(`(min-width:${resolutions['HIGH'].W}px)`).matches)
			return resolutions['HIGH'];

		//Return the low resolution.
		return resolutions['LOW'];
	}
}
