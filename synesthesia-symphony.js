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
var methodOverride = require('method-override');
var compression = require('compression');
var errorHandler = require('errorhandler');
var app = express();
var router = express.Router();
var Sequelize = require('sequelize');

//Import first party modules.
var config = require('server_settings');

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

//Configure sequelize.
var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, sequelize_settings);

//Import the models.
var models = {
	user_groups: sequelize.import('./models/user_groups'),
	users: sequelize.import('./models/users')
};

//Set relations.
models.user_groups.hasOne(models.users, {foreignKey: 'user_group_id_fk', onDelete: 'cascade', onUpdate: 'no action'});
sequelize.sync();

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(methodOverride());
app.use(compression());
app.use(morgan());
app.use(express.static('./public', {maxAge: 86400000}));
app.use(router);

if (app.get('env') === 'development')
	app.use(errorHandler({ dumpExceptions: true, showStack: true }));

//Express.js routes.
var routes = {
	index: require('./routes/index')(models, app, config),
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



