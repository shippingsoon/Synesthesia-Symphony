/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */
'use strict';

//Load 1st party modules.
var server_utils = require('server_utils');

/*
 * Home page.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.home = function(req, res, next) {
	debugger;
	res.render('index', {title: 'Index | ', base_url: server_utils.baseUrl(req, '')});
};

/*
 * Login page.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.login = function(req, res, next) {
	//Get the Users model.
	var Users = req.app.get('models').users;

	if (req.body.email_address && req.body.password) {
		Users
			.findOne({where: {email_address: req.body.email_address}})
			.then(function(user){
				//User was found and password matches.
				if (user && (req.body.password === user.password)) {
					//Store the session.
					req.session.user = {
						user_id: user.user_id,
						user_group_id: user.user_group_id,
						user_name: user.user_name,
						email_address: user.email_address,
					};

					//Redirect the user.
					res.redirect('/admin');
				}
				//User was not found or invalid credentials.
				else {
					req.session.reset();

					res
						.status(400)
						.render('login', {message: 'Invalid login', base_url: server_utils.baseUrl(req, 'login')});
				}
			})
			.catch(server_utils.errorHandler);
	}
	//Render the login page.
	else {
		res
			.status(200)
			.render('login', {message: '', base_url: server_utils.baseUrl(req, 'login')});
	}
};

/*
 * Logout.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.logout = function(req, res, next) {
	//Clear the user's session.
	req.session.reset();

	//Redirect the user.
	res.redirect('/login');
};

/*
 * Admin page.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.admin = function(req, res, next) {
	res.status(200).json({foo: 'bar'});
};

/*
 * Registration page.
 * @param {Object} req - Server request.
 * @param {Object} res - Server response.
 * @param {Function} next - Invokes next callback.
 * @return {Undefined}
 */
module.exports.register = function(req, res, next) {
	//Get the Users model.
	var Users = req.app.get('models').users;
	
	server_utils.registerUser(Users, {
		user_name: 'james',
		user_group_id: 2,
		email_address: 'foo@bar.com',
		password: 'foobar'
	});

	res.status(200).json({foo: 'bar'});
};


