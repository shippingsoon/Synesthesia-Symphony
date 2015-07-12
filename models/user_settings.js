/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User Settings table.
 * @param {Object} sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('user_setting_id', {
		user_setting_id: {
			field: 'user_setting_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'The user settings ID',
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
		bgm_volume: {
			field: 'bgm_volume',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The background music volume level',
			allowNull: false,
			defaultValue: 127
		},
		sfx_volume: {
			field: 'sfx_volume',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The sound effects volume level',
			allowNull: false,
			defaultValue: 127
		},
		show_fps: {
			field: 'show_fps',
			type: data_types.BOOLEAN(),
			comment: 'Show frames per second counter',
			allowNull: false,
			defaultValue: 0
		}
	});
};

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_settings` (
  `user_setting_id` INT(4) UNSIGNED NULL AUTO_INCREMENT COMMENT 'The user settings ID.',
  `user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID which references the users table.',
  `bgm_volume` TINYINT(4) UNSIGNED NOT NULL DEFAULT 127 COMMENT 'The background music volume level.',
  `sfx_volume` TINYINT(4) UNSIGNED NOT NULL DEFAULT 127 COMMENT 'The sound effects volume level.',
  `show_fps` TINYINT(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Show frames per second counter.',
  PRIMARY KEY (`user_setting_id`)  COMMENT '',
  INDEX `user_id_fk_idx` (`user_id` ASC)  COMMENT '',
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `synesthesia_symphony`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
*/
