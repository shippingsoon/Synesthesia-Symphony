/*
 * @description - Synesthesia Symphony
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * User Enemies table.
 * @param {Object} sequelize - Sequelize module.
 * @param {Object} data_types - Sequelize data types.
 * @return {Object}
 */
module.exports = function(sequelize, data_types) {
	return sequelize.define('user_enemies', {
		user_enemy_id: {
			field: 'user_enemy_id',
			type: data_types.INTEGER(4).UNSIGNED,
			allowNull: false,
			comment: 'The enemy ID',
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			field: 'user_id',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The author user ID',
			allowNull: false
		},
		x: {
			field: 'x',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The enemy x coordinate',
			allowNull: false
		},
		y: {
			field: 'y',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The enemy y coordinate',
			allowNull: false
		},
		radius: {
			field: 'radius',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: 'The enemy radius',
			allowNull: false
		},
		color: {
			field: 'color',
			type: data_types.STRING(20),
			comment: 'The enemy color',
			allowNull: false
		},
		life_points: {
			field: 'life_points',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: '',
			allowNull: false
		},
		hit_points: {
			field: 'hit_points',
			type: data_types.INTEGER(4).UNSIGNED,
			comment: '',
			allowNull: false
		}
	});
};

/*
CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_enemies` (
  `user_enemy_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Enemy ID.',
  `user_id` INT(4) UNSIGNED NOT NULL COMMENT '',
  `x` INT(4) NOT NULL COMMENT 'The enemy x coordinate.',
  `y` INT(4) NOT NULL COMMENT 'The enemy y coordinate.',
  `radius` INT(4) UNSIGNED NOT NULL COMMENT 'The enemy radius.',
  `color` VARCHAR(20) NULL COMMENT 'The enemy color.',
  `life_points` INT(4) UNSIGNED NOT NULL COMMENT '',
  `hit_points` INT(4) UNSIGNED NOT NULL COMMENT '',
  PRIMARY KEY (`user_enemy_id`)  COMMENT '',
  INDEX `user_id_fk_idx` (`user_id` ASC)  COMMENT '',
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `synesthesia_symphony`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
*/
