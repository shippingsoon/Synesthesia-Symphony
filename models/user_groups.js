/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User groups table.
 * @param {Object} Sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('user_groups', {
		user_group_id: {
			field: 'user_group_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'The user group ID.',
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			field: 'title',
			type: data_types.STRING(20),
			comment: 'Name of user group.',
			allowNull: false,
			unique: 'title_un_idx'
		}
	});
};
