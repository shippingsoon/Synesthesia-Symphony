/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User Scores table.
 * @param {Object} sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('user_scores', {
		user_score_id: {
			field: 'user_score_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'The user score ID',
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			field: 'user_id',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The user ID which references the users table',
			allowNull: false
		},
		score: {
			field: 'score',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The player score',
			allowNull: false
		}
	});
};

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_scores` (
  `user_score_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The user score ID.',
  `user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID which references the users table.',
  `score` INT(4) UNSIGNED NULL COMMENT 'The player score.',
  PRIMARY KEY (`user_score_id`)  COMMENT '',
  INDEX `user_id_fk_idx` (`user_id` ASC)  COMMENT '',
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `synesthesia_symphony`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
*/
