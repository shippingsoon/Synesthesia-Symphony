/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User Groups table.
 * @param {Object} sequelize - Sequelize module.
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

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_groups` (
  `user_group_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The user group ID.',
  `title` VARCHAR(20) NOT NULL COMMENT 'Name of user group.',
  PRIMARY KEY (`user_group_id`)  COMMENT '',
  UNIQUE INDEX `title_un_idx` (`title` ASC)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
*/
