/*
 * @description - The system namespace is the foundation for which every class is built upon.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */
"use strict";
/// <reference path="./system.session.ts" />
/// <reference path="../game/character/game.player.ts" />
var Symphony;
(function (Symphony) {
    var System;
    (function (System) {
        //The current time. This is used to measure the delta time between two frames.
        var currentTime = Date.now();
        /**
         * This is the program's entry point. This method loads a session from a config file or db, initiates resources, and invokes the game loop.
         * @returns {void}
         */
        function main() {
            //Load the configuration data.
            //DevNote: This is the only asynchronous callback hell you'll find in this codebase, I promise.
            System.Session.init(function (json) {
                //Store the configuration data.
                System.Config = json;
                //Load resources
                System.canvas = document.getElementById("out");
                System.ctx = System.canvas.getContext("2d");
                //Debug.
                System.fsm = new System.FSM();
                var player;
                player = new Symphony.Game.Player({ x: 0, y: 0, r: 10, speed: 300 });
                System.fsm.push({ state: player, ctx: System.ctx });
                //Start the recursive game loop.
                gameLoop();
            });
        }
        System.main = main;
        /**
         * This is the game loop. This method is recursively invoked via the requestAnimationFrame() method.
         * @returns {void}
         */
        function gameLoop() {
            //This variable holds the time that was stored in the previous frame.
            var previousTime = currentTime;
            //Update the current time.
            currentTime = Date.now();
            //Delta time is the time difference between the current and previous frames.
            var dt = currentTime - previousTime;
            //Here we use the requestAnimationFrame() method to recursively invoke the gameLoop() method.
            System.animationFrameId = requestAnimationFrame(gameLoop);
            //Update the instantaneous frames per second.
            System.FPS = 1000.0 / dt;
            //Limit the frame rate.
            if (dt > System.Config.TARGETED_FPS)
                dt = System.Config.TARGETED_FPS;
            //Handle logic in the current state.
            System.fsm.update({ ctx: System.ctx, dt: dt });
            //Render the current state.
            System.fsm.draw({ ctx: System.ctx, dt: dt });
        }
    })(System = Symphony.System || (Symphony.System = {}));
})(Symphony || (Symphony = {}));
//# sourceMappingURL=system.js.map