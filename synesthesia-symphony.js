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

//Import first party modules.
var config = require('server_settings');
var server_utils = require('server_utils');

//Load the SSL certificate and private key.
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
app.set('models', require('./models'));
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
app.use(morgan());
app.use(express.static('./public', {maxAge: 86400000}));
app.use(router);

if (app.get('env') === 'development')
	app.use(errorHandler({dumpExceptions: true, showStack: true}));

//Express.js routes.
var routes = {
	index: require('./routes/index'),
	api: require('./routes/api')
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

