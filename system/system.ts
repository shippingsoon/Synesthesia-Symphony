/*
 * @description - The system namespace is the foundation for which every class is built upon.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.session.ts" />
/// <reference path="../game/character/game.player.ts" />

namespace Symphony.System {
	//This variable holds ReadOnly configuration data.
	export let Config:System.Session.ConfigType;
	//The instantaneous frames per second the app is getting.
	export let FPS:number;
	//Finite state machine.
	export let fsm:System.FSM;
	//HTML5 2D drawing context.
	export let ctx:CanvasRenderingContext2D;
	//HTML5 canvas element.
	export let canvas:HTMLCanvasElement;
	//The request ID that is returned from the requestAnimationFrame() method.
	export let animationFrameId:number;
	//The current time. This is used to measure the delta time between two frames.
	let currentTime:any = Date.now();

	/**
	 * This is the program's entry point. This method loads a session from a config file, initiates resources, and invokes the game loop.
	 * @returns {void}
	 */
	export function main():void {
		//Load the configuration data.
		//DevNote: This is the only asynchronous callback hell you'll find in this codebase, I promise.
		System.Session.init(function(json) {
			//Store the ReadOnly configuration data.
			System.Config = json;

			//Load resources
			System.canvas = <HTMLCanvasElement> document.getElementById("out");
			System.ctx = System.canvas.getContext("2d");

			//Debug.
			System.fsm = new System.FSM();
			let player: Game.Player;
			player = new Game.Player({x: 0, y: 0, r: 10, speed: 300});
			System.fsm.push({state: player, ctx: ctx});

			//Start the recursive game loop.
			gameLoop();
		});
	}

	/**
	 * This is the game loop. This method is recursively invoked via the requestAnimationFrame() method.
	 * @returns {void}
	 */
	function gameLoop():void {
		//This variable holds the time that was stored in the previous frame.
		let previousTime:any = currentTime;

		//Update the current time.
		currentTime = Date.now();

		//Delta time is the time difference between the current and previous frames.
		let dt:number = currentTime - previousTime;

		//Here we use the requestAnimationFrame() method to recursively invoke the gameLoop() method.
		System.animationFrameId = requestAnimationFrame(gameLoop);

		//Update the instantaneous frames per second.
		System.FPS = 1000.0 / dt;

		//Limit the frame rate.
		if (dt > System.Config.TARGETED_FPS)
			dt = System.Config.TARGETED_FPS;

		//Handle logic in the current state.
		System.fsm.update({ctx: ctx, dt: dt});

		//Render the current state.
		System.fsm.draw({ctx: ctx, dt: dt});
	}
}