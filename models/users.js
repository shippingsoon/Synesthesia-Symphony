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
 * @param {Object} sequelize - Sequelize module.
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
		}
	});
};

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`users` (
  `user_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The user ID.',
  `user_group_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user group.',
  `email_address` VARCHAR(100) NOT NULL COMMENT 'The user email address.',
  `user_name` VARCHAR(20) NOT NULL COMMENT 'The user name.',
  `password` VARCHAR(100) NOT NULL COMMENT 'The user password.',
  `salt` VARCHAR(100) NOT NULL COMMENT 'The password salt.',
  PRIMARY KEY (`user_id`)  COMMENT '',
  INDEX `user_group_id_fk_idx` USING BTREE (`user_group_id` ASC)  COMMENT '',
  UNIQUE INDEX `email_address_un_idx` (`email_address` ASC)  COMMENT '',
  CONSTRAINT `user_group_id_fk`
    FOREIGN KEY (`user_group_id`)
    REFERENCES `synesthesia_symphony`.`user_groups` (`user_group_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
*/
