/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * Users table.
 * @param {Object} Sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('users', {
		user_id: {
			field: 'user_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'The user ID',
			primaryKey: true,
			autoIncrement: true
		},
		user_group_id: {
			field: 'user_group_id',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The user group',
			allowNull: false
		},
		email_address: {
			field: 'email_address',
			type: data_types.STRING(100),
			comment: 'The user email address',
			allowNull: false,
			unique: 'email_address_un_idx'
		},
		user_name: {
			field: 'user_name',
			type: data_types.STRING(20),
			comment: 'The user name',
			allowNull: false
		},
		password: {
			field: 'password',
			type: data_types.STRING(200),
			comment: 'The user password',
			allowNull: false
		},
		salt: {
			field: 'salt',
			type: data_types.STRING(200),
			comment: 'The user salt',
			allowNull: false
		},
		date_added: {
			field: 'date_added',
			type: data_types.DATE,
			comment: 'Date added',
			allowNull: false
		}
	});
};
