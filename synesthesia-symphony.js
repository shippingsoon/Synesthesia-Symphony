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
var express = require('express');
var https = require('https');
var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var compression = require('compression');
var errorHandler = require('errorhandler');
var app = express();
var router = express.Router();
var Sequelize = require('sequelize');

//Import first party modules.
var config = require('server_settings');
var server_utils = require('server_utils');

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
		syncOnAssociation: true,
		pool: {
			maxConnections: 10,
			minConnections: 0,
			maxIdleTime: 1000
		}
	}
};

//Configure sequelize.
var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, sequelize_settings);

//Import the models.
var models = {
	user_groups: sequelize.import('./models/user_groups'),
	users: sequelize.import('./models/users'),
	user_scores: sequelize.import('./models/user_scores'),
	user_settings: sequelize.import('./models/user_settings'),
	user_statistics: sequelize.import('./models/user_statistics'),
	user_stages: sequelize.import('./models/user_stages'),
	user_enemies: sequelize.import('./models/user_enemies')
};

//Set the foreign key relationships for referencial integrity.
models.user_groups.hasMany(models.users, {foreignKey: 'user_group_id', onDelete: 'cascade', onUpdate: 'no action'});
models.users.hasOne(models.user_scores, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
models.users.hasOne(models.user_settings, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
models.users.hasOne(models.user_statistics, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
models.users.hasOne(models.user_stages, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
models.users.hasOne(models.user_enemies, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});

sequelize.sync({force: true}).then(function(){
	models.user_groups
		.bulkCreate([
			{user_group_id: 1, title: 'Admin'},
			{user_group_id: 2, title: 'Member'},
			{user_group_id: 3, title: 'Guest'},
			{user_group_id: 4, title: 'Banned'}
		])
		.then(function() {
			models.users
				.bulkCreate([
					{user_id: 1, user_group_id: 1, email_address: 'admin@shippingsoon.com', user_name: 'admin', password: '$#REf5fsFc%*)dfF0o3#4', salt: '%GG#$DFDFc52DE#$s$^'},
					{user_id: 2, user_group_id: 3, email_address: 'info@shippingsoon.com', user_name: 'guest', password: '$#REoS4%!$fdfs9FsWA', salt: '%GG#@Ffsd4#J)*d8Bc23'}
				])
				.catch(server_utils.errorHandler);
		})
		.catch(server_utils.errorHandler);

});

var ssl_settings = {
    key: fs.readFileSync('./ssl/synesthesia-symphony.key'),
    cert: fs.readFileSync('./ssl/synesthesia-symphony.crt')
};

//Bind the HTTPS server to a port.
app.server = https.createServer(ssl_settings, app);
app.server.listen(config.server.port, function(){
	console.log("Express server listening on: %s:%s", app.server.address().address, app.get('port'));
});

//Configure Express.js.
app.engine('html', require('ejs').renderFile);
app.set('views', './views');
app.set('view engine', 'html');
app.set('port', config.server.port);
app.set('models', models);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(session({
	secret: config.server.secret,
	saveUninitialized: true,
	resave: true
}));
app.use(methodOverride());
app.use(compression());
//app.use(morgan());
app.use(express.static('./public', {maxAge: 86400000}));
app.use(router);

app.all('*', function(req, res) {
	var session = req.session;

	if (!session || !session.is_logged_in) {
		session.is_logged_in = false;
		
		//session.user_id =
	}
});

//if (app.get('env') === 'development')
//	app.use(errorHandler({ dumpExceptions: true, showStack: true }));

//Express.js routes.
var routes = {
	index: require('./routes/index')(models, config),
	api: require('./routes/api')(models, app, config)
};

//Home page.
router.route('/').get(routes.index.home);

//CRUD operations for all records.
router.route('/api/:version/:model')
	.post(routes.api.upsertModel) //Create.
	.get(routes.api.getModel) //Read.
	.put(routes.api.upsertModel) //Update.
	.delete(routes.api.dropModel); //Delete.

//CRUD operations for a given record.
router.route('/api/:version/:model/:id')
	.get(routes.api.getById) //Read.
	.put(routes.api.upsertModel) //Update.
	.delete(routes.api.dropById); //Delete.



