/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User Stages table.
 * @param {Object} sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('user_stages', {
		user_stage_id: {
			field: 'user_stage_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'The user stage ID',
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			field: 'user_id',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The user ID which references the users table',
			allowNull: false
		},
		title: {
			field: 'title',
			type: data_types.STRING(20),
			comment: 'The title of the stage',
			allowNull: false
		},
		date_added: {
			field: 'date_added',
			type: data_types.DATE(),
			comment: 'The date this record was added',
			allowNull: true,
			defaultValue: null //sequelize.fn('NOW')
		}
	});
};

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_stages` (
  `user_stage_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
  `user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID of the author of the stage.',
  `title` VARCHAR(20) NOT NULL COMMENT 'The title of the stage',
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  PRIMARY KEY (`user_stage_id`)  COMMENT '',
  INDEX `user_id_fk_idx` (`user_id` ASC)  COMMENT '',
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `synesthesia_symphony`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
*/
