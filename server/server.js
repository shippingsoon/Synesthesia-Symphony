/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

'use strict';

//Import third party modules.
var restify = require('restify');
var mysql = require('mysql');
var Sequelize = require('sequelize');

//Import server modules.
var config = require('server_settings');
var restify_handlers = require('restify_handlers');

//Sequelize's configuration settings.
var sequelize_settings = {
	host: config.db.host,
	dialect: 'mysql',
	define: {
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		engine: 'InnoDB',
		charset: 'utf8',
		collate: 'utf8_general_ci',
		syncOnAssociation: true
	}
};

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, sequelize_settings);

var models = {
	user_groups: sequelize.import(__dirname + '/models/user_groups'),
	users: sequelize.import(__dirname + '/models/users')
};

models.user_groups.hasOne(models.users, {foreignKey: 'user_group_id_fk', onDelete: 'cascade', onUpdate: 'no action'});

sequelize.sync();

//Create the server.
var server = restify.createServer({
	name: config.server.name,
	version: config.server.version
});

server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser({mapParams: true}));
server.use(restify.queryParser());
server.use(restify.jsonp());

server.get('/get-by/id/:model/:id', restify_handlers.getModelById(restify, models, config.server));

server.get('/get/:model', restify_handlers.getModel(restify, models, config.server));
server.get('/get/:model/:offset', restify_handlers.getModel(restify, models, config.server));
server.get('/get/:model/:offset/:limit', restify_handlers.getModel(restify, models, config.server));
server.get('/get/:model/:offset/:limit/:order', restify_handlers.getModel(restify, models, config.server));

server.post('set/:method/:model/', restify_handlers.upsertModel(restify, models, config.server));

//Bind to a port.
server.listen(config.server.port, function() {
	if (config.server.debug)
		console.log('%s listening at %s', server.name, server.url);
});




