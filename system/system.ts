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
	//Start a new session.
	export let session:System.Session;

	//The current time. This is used to measure the delta time between two frames.
	let currentTime:any = Date.now();

	/**
	 * This is the program's entry point. This method loads a session from a config file, initiates resources, and invokes the game loop.
	 * @return {void}
	 */
	export async function main(configURL:string = "/synesthesia-symphony/config.json") {
		//Start a new session.
		System.session = new System.Session();

		try {
			//Load the config.json file into the session instance.
			//Here we use async await to avoid callback hell.
			System.session.setConfig = await System.session.load(configURL);
		}
		catch (err) {
			console.error("Session.load() error, make sure the config.json file contains the correct data", err);
		}

		//Make sure the config data is set.
		if (_.isEmpty(System.session.config.RESOLUTIONS))
			throw "Make sure the config.json file is valid JSON and implements the ConfigType interface found in System.Session.ts";

		//Initiate resources such as canvas width.
		//The Session.initResources() method uses CSS3 media queries to determine the size for the canvas' width and height.
		System.session.initResources(System.session.config.RESOLUTIONS);

		//Transition to the Intro state.
		System.session.FSM.push({state: new Game.Stage(), ctx: System.session.ctx});

		//Start the recursive game loop.
		gameLoop();
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
		if (dt > System.session.config.TARGETED_FPS)
			dt = System.session.config.TARGETED_FPS;

		//Handle logic in the current state.
		System.session.FSM.update({ctx: System.session.ctx, dt: dt});

		//Render the current state.
		System.session.FSM.draw({ctx: System.session.ctx, dt: dt});
	}
}