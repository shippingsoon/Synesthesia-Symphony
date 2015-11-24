/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User Statistics table.
 * @param {Object} sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('user_statistics', {
		user_statistic_id: {
			field: 'user_statistic_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'Statistic ID',
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			field: 'user_id',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The user ID which references the users table',
			allowNull: false,
			unique: 'user_id_un_idx'
		},
		date_added: {
			field: 'date_added',
			type: data_types.DATE(),
			comment: 'The date this record was added',
			allowNull: true,
			defaultValue: null //sequelize.fn('NOW')
		},
		date_updated: {
			field: 'date_updated',
			type: data_types.DATE(),
			comment: 'The date this record was last updated',
			allowNull: true,
			defaultValue: null //sequelize.fn('NOW() ON UPDATE NOW')
		},
		user_agent: {
			field: 'user_agent',
			type: data_types.STRING(500),
			comment: 'The user agent',
			allowNull: true
		},
		referrer: {
			field: 'referrer',
			type: data_types.STRING(500),
			comment: 'The HTTP referrer',
			allowNull: true
		},
		ip_address: {
			field: 'ip_address',
			type: data_types.STRING(11),
			comment: 'The user IP address',
			allowNull: true
		}
	});
};

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_statistics` (
  `user_statistic_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Statistic ID.',
  `user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID which references the users table.',
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'The date this row was added.',
  `date_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'The date this row was updated.',
  `user_agent` VARCHAR(500) NULL COMMENT 'The user client.',
  `referrer` VARCHAR(500) NULL COMMENT 'The HTTP referrer.',
  `ip_address` VARCHAR(1) NOT NULL COMMENT 'The user IP address.',
  PRIMARY KEY (`user_statistic_id`)  COMMENT '',
  INDEX `user_id_fk_idx` (`user_id` ASC)  COMMENT '',
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `synesthesia_symphony`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
*/
