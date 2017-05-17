/*
 * @description - Session management.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */
"use strict";
/// <reference path="./system.ts" />
var Symphony;
(function (Symphony) {
    var System;
    (function (System) {
        var Session;
        (function (Session) {
            /**
             * Loads configuration data from a JSON file or remote database.
             * @param {string} url - The URL to request data from.
             * @param {Function} callback - The callback method that will be invoked on success.
             * @returns {void}
             */
            function loadSession(url, callback) {
                jQuery.ajax({
                    dataType: "json",
                    url: url,
                    success: callback,
                    error: _onError
                });
            }
            Session.loadSession = loadSession;
            /**
             * Saves configuration data to a remote database via a RESTful JSON API.
             * @param {string} url - The URL of the RESTFul API that we will send data to.
             * @param {Symphony.System.Session.ConfigType} config - The configuration data we will be saving.
             * @param {Function} callback
             * @returns {void}
             */
            function saveSession(url, config, callback) {
                jQuery.ajax({
                    dataType: "json",
                    type: "POST",
                    url: url,
                    data: config,
                    success: callback,
                    error: _onError
                });
            }
            Session.saveSession = saveSession;
            /**
             * Initiates a session.
             * @param {Function} callback
             * @returns {void}
             */
            function init(callback) {
                //Read the configuration data from the config.json file.
                Session.loadSession("/synesthesia-symphony/config.json", function (json) {
                    //This will determine if we will pull configuration data from a database.
                    if (json.USE_DB) {
                        //Load the configuration data from a remote database.
                        //this.load("localhost:3000/api/load", callback);
                    }
                    else {
                        //Use the config data we received from the config.json file.
                        callback(json);
                    }
                });
            }
            Session.init = init;
            /**
             * Helper method for logging error messages. TODO: Add this to a Debug namespace.
             * @param {object} err - An object containing server request status.
             * @returns {void}
             */
            function _onError(err) {
                console.error("An error has occurred, make sure you are pulling valid JSON from the config.json file", err);
            }
        })(Session = System.Session || (System.Session = {}));
    })(System = Symphony.System || (Symphony.System = {}));
})(Symphony || (Symphony = {}));
//# sourceMappingURL=system.session.js.map