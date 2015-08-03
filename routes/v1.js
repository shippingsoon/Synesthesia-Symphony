/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

'use strict';

//Load 3rd party modules.
var express = require('express');
var v1 = express.Router();

//Load 1st party modules.
var server_utils = require('server_utils');

//Express.js routes.
var routes = {
	v1: {
		index: require('./v1/index'),
		api: require('./v1/api')
	}
};

v1.use(server_utils.loadSession);

//Home page.
v1.route('/')
	.get(routes.v1.index.home);

//Admin page.
v1.route('/admin')
	.get(server_utils.requireLogin, routes.v1.index.admin);

//Login page.
v1.route('/login')
	.get(routes.v1.index.login)
	.post(routes.v1.index.login);

//Logout.
v1.route('/logout')
	.get(routes.v1.index.logout);

//Registration page.
v1.route('/register')
	.get(routes.v1.index.register)
	.post(routes.v1.index.register);

	//CRUD operations for all records.
v1.route('/api/:model')
	.post(routes.v1.api.upsertModel) //Create.
	.get(routes.v1.api.getModel) //Read.
	.put(routes.v1.api.upsertModel) //Update.
	.delete(routes.v1.api.dropModel); //Delete.

//CRUD operations for a given record.
v1.route('/api/:model/:id')
	.get(routes.v1.api.getById) //Read.
	.put(routes.v1.api.upsertModel) //Update.
	.delete(routes.v1.api.dropById); //Delete.

module.exports = v1;

