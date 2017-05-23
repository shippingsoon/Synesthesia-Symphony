/*
 * @description - The system namespace is the foundation for which every class is built upon.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.session.ts" />
/// <reference path="./system.fsm.ts" />
/// <reference path="./system.state.ts" />
/// <reference path="../game/state/game.intro.ts" />

namespace Symphony.System {
	//Session
	export let session:System.Session;

	/*
	//This variable holds ReadOnly configuration data.
	export let Config:System.ConfigType;

	//The instantaneous frames per second the app is getting.
	export let FPS:number;

	//Finite state machine.
	export let fsm:System.FSM;

	//HTML5 2D drawing context.
	export let ctx:CanvasRenderingContext2D;
	export let bg_ctx:CanvasRenderingContext2D;

	//HTML5 canvas element.
	export let canvas:HTMLCanvasElement;
	export let bg_canvas:HTMLCanvasElement;

	//The request ID that is returned from the requestAnimationFrame() method.
	export let animationFrameId:number;
	*/

	//The current time. This is used to measure the delta time between two frames.
	let currentTime:any = Date.now();

	/**
	 * This is the program's entry point. This method loads a session from a config file, initiates resources, and invokes the game loop.
	 * @return {void}
	 */
	export function main():void {
		//Load the configuration data.
		//DevNote: This is the only asynchronous callback hell you'll find in this codebase, I promise.
		System.session = new System.Session((json) => {
			alert('hello');
			//Transition to the Intro state.
			this.FSM.push({state: new Game.State.Stage, ctx: System.session.ctx});
			console.log("foobar");
			//Start the recursive game loop.
			gameLoop();
		});

		/*
		//Load the configuration data.
		//DevNote: This is the only asynchronous callback hell you'll find in this codebase, I promise.
		System.init(function(json) {
			//Store the ReadOnly configuration data.
			System.Config = json;

			//Initiate resources such as canvas width. After this call,
			//the System.canvas, System.ctx, and System.fsm should be set.
			System.Resource.init(System);

			//Transition to the Intro state.
			//System.fsm.push({state: new Game.State.Stage, ctx: System.ctx});

			//Start the recursive game loop.
			//gameLoop();
		});
		*/
	}

	/**
	 * This is the game loop. This method is recursively invoked via the requestAnimationFrame() method.
	 * @return {void}
	 */
	function gameLoop():void {
		//This variable holds the time that was stored in the previous frame.
		let previousTime:any = currentTime;

		//Update the current time.
		currentTime = Date.now();

		//Delta time is the time difference between the current and previous frames.
		let dt:number = currentTime - previousTime;

		//Here we use the requestAnimationFrame() method to recursively invoke the gameLoop() method.
		System.session.setAnimationFrameId = requestAnimationFrame(gameLoop);

		//Update the instantaneous frames per second.
		System.session.setFPS = 1000.0 / dt;

		//Limit the frame rate.
		if (dt > System.session.CONFIG.TARGETED_FPS)
			dt = System.session.CONFIG.TARGETED_FPS;

		//Handle logic in the current state.
		System.session.FSM.update({ctx: System.session.ctx, dt: dt});

		//Render the current state.
		System.session.FSM.draw({ctx: System.session.ctx, dt: dt});
	}
}