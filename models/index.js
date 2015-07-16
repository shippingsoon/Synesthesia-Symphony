/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

'use strict';

//Load third party modules.
var Sequelize = require('sequelize');

//Load first party modules.
var config = require('server_settings').db;
var server_utils = require('server_utils');

//Sequelize's configuration settings.
var sequelize_settings = {
	host: config.host,
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
var sequelize = new Sequelize(config.database, config.user, config.password, sequelize_settings);

//A list of models to load.
var models = [
	'user_groups',
	'users',
	'user_scores',
	'user_settings',
	'user_statistics',
	'user_stages',
	'user_enemies'
];

//Import the models.
models.forEach(function(model){
	module.exports[model] = sequelize.import(__dirname + '/' + model);
});

//Set the foreign key relationships for referencial integrity.
module.exports.user_groups.hasMany(module.exports.users, {foreignKey: 'user_group_id', onDelete: 'cascade', onUpdate: 'no action'});
module.exports.users.hasOne(module.exports.user_scores, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
module.exports.users.hasOne(module.exports.user_settings, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
module.exports.users.hasOne(module.exports.user_statistics, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
module.exports.users.hasOne(module.exports.user_stages, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});
module.exports.users.hasOne(module.exports.user_enemies, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'no action'});

sequelize.sync({force: true}).then(function(){
	module.exports.user_groups
		.bulkCreate([
			{user_group_id: 1, title: 'Admin'},
			{user_group_id: 2, title: 'Member'},
			{user_group_id: 3, title: 'Guest'},
			{user_group_id: 4, title: 'Banned'}
		])
		.then(function() {
			module.exports.users
				.bulkCreate([
					{user_id: 1, user_group_id: 1, email_address: 'admin@shippingsoon.com', user_name: 'admin', password: '$#REf5fsFc%*)dfF0o3#4', salt: '%GG#$DFDFc52DE#$s$^'},
					{user_id: 2, user_group_id: 3, email_address: 'info@shippingsoon.com', user_name: 'guest', password: '$#REoS4%!$fdfs9FsWA', salt: '%GG#@Ffsd4#J)*d8Bc23'}
				])
				.catch(server_utils.errorHandler);
		})
		.catch(server_utils.errorHandler);

});

module.exports.sequelize = sequelize;

