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
var session = require('client-sessions');
var methodOverride = require('method-override');
var compression = require('compression');
var errorHandler = require('errorhandler');
var app = express();

//Expressjs routers.
var routers = {
	v1: require('./routes/v1'),
	//v2: require('./routes/v2'),
};

//Import first party modules.
var config = require('server_settings');
var server_utils = require('server_utils');

//Load the SSL certificate and private key.
var ssl_settings = {
    key: fs.readFileSync('./ssl/synesthesia-symphony.key'),
    cert: fs.readFileSync('./ssl/synesthesia-symphony.crt')
};

//Client session settings.
var session_settings = {
	secret: config.server.secret,
	cookieName: 'session',
	duration: 30 * 60 * 1000, //Session is valid for 30 minutes.
	activeDuration: 5 * 60 * 1000, //The user can keep session active for 5 minutes.
	httpOnly: true,
	secure: true,
	ephemeral: true
};

//Bind the HTTPS server to a port.
app.server = https.createServer(ssl_settings, app);
app.server.listen(config.server.port, function(){
	console.log("Expressjs server listening on: %s:%s", app.server.address().address, app.get('port'));
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
app.use(session(session_settings));
app.use(methodOverride());
app.use(compression());
//app.use(morgan());
app.use(express.static('./public', {maxAge: 86400000}));

//Load the modular routers.
app.use('/v1', routers.v1);
//app.use('/v2', routers.v2);

//Default to the latest version of the API.
app.use('/', routers.v1);

if (app.get('env') === 'development')
	app.use(errorHandler({dumpExceptions: true, showStack: true}));

