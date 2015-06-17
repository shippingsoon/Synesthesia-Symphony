-- Create the database if it does not exist.

CREATE DATABASE IF NOT EXISTS `synesthesia_symphony`;

USE `synesthesia_symphony`;

-- `synesthesia_symphony`.`user_groups`

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `synesthesia_symphony`.`user_groups`;

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_groups` (
	`user_group_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The user group ID.',
	`title` VARCHAR(20) NOT NULL COMMENT 'Name of user group.',
	PRIMARY KEY (`user_group_id`),
	UNIQUE INDEX `title_un_idx` (`title` ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

START TRANSACTION;

INSERT INTO `synesthesia_symphony`.`user_groups` (`title`) VALUES ('Admin'), ('Moderator'), ('Banned'), ('Guest');

COMMIT;

-- `synesthesia_symphony`.`users`

DROP TABLE IF EXISTS `synesthesia_symphony`.`users`;

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`users` (
	`user_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The user ID.',
	`user_group_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user group.',
	`email_address` VARCHAR(100) NOT NULL COMMENT 'The user email address',
	`user_name` VARCHAR(20) NOT NULL COMMENT 'The user name.',
	`password` VARCHAR(100) NOT NULL COMMENT 'The user password.',
	`salt` VARCHAR(100) NOT NULL COMMENT 'The password salt.',
	PRIMARY KEY (`user_id`),
	INDEX `user_group_id_fk_idx` USING BTREE (`user_group_id` ASC),
	UNIQUE INDEX `email_address_un_idx` (`email_address` ASC),
	CONSTRAINT `user_group_id_fk` FOREIGN KEY (`user_group_id`)
		REFERENCES `synesthesia_symphony`.`user_groups` (`user_group_id`)
		ON DELETE CASCADE ON UPDATE NO ACTION
)  ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

INSERT INTO `synesthesia_symphony`.`users` (`user_group_id`, `user_name`, `password`, `salt`) VALUES (1, 'Anonymous', 'CHANGE_ME', 'CHANGE_ME');

-- `synesthesia_symphony`.`user_statistics`

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_statistics` (
	`user_statistic_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Statistic ID.',
	`user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID which references the users table.',
	`date_added` TIMESTAMP NULL DEFAULT NULL COMMENT 'The date this row was added.',
	`date_updated` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW() COMMENT 'The date this row was updated.',
	`user_agent` VARCHAR(250) NULL COMMENT 'The user client.',
	`referrer` VARCHAR(250) NULL COMMENT 'The HTTP referrer.',
	`ip_address` VARCHAR(100) NOT NULL COMMENT 'The user IP address.',
	PRIMARY KEY (`user_statistic_id`),
	INDEX `user_id_fk_idx` (`user_id` ASC),
	CONSTRAINT `user_id_fk0`
		FOREIGN KEY (`user_id`)
			REFERENCES `synesthesia_symphony`.`users` (`user_id`)
			ON DELETE CASCADE
			ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

DROP TRIGGER IF EXISTS `synesthesia_symphony`.`user_statistics_before_insert`;

CREATE TRIGGER `synesthesia_symphony`.`user_statistics_before_insert`
	BEFORE INSERT ON `synesthesia_symphony`.`user_statistics`
	FOR EACH ROW
	SET NEW.`date_added` = NOW(),
		NEW.`ip_address` = SUBSTRING_INDEX(USER(), '@', -1);

INSERT INTO `synesthesia_symphony`.`user_statistics` (`user_id`, `user_agent`, `referrer`) VALUES (1, 'Firefox', 'https://www.google.com');

-- `synesthesia_symphony`.`user_settings`

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_settings` (
	`user_setting_id` INT(4) UNSIGNED NULL AUTO_INCREMENT COMMENT 'The user settings ID.',
	`user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID which references the users table.',
	`bgm_volume` TINYINT(4) UNSIGNED NOT NULL DEFAULT 127 COMMENT 'The background music volume level.',
	`sfx_volume` TINYINT(4) UNSIGNED NOT NULL DEFAULT 127 COMMENT 'The sound effects volume level.',
	`show_fps` TINYINT(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Show frames per second counter.',
	PRIMARY KEY (`user_setting_id`),
	INDEX `user_id_fk_idx` (`user_id` ASC),
	CONSTRAINT `user_id_fk1`
		FOREIGN KEY (`user_id`)
			REFERENCES `synesthesia_symphony`.`users` (`user_id`)
			ON DELETE CASCADE
			ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

-- `synesthesia_symphony`.`user_scores`

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`user_scores` (
	`user_score_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'The user score ID.',
	`user_id` INT(4) UNSIGNED NOT NULL COMMENT 'The user ID which references the users table.',
	`score` INT(4) UNSIGNED NULL COMMENT 'The player score.',
	PRIMARY KEY (`user_score_id`),
	INDEX `user_id_fk_idx` (`user_id` ASC),
	CONSTRAINT `user_id_fk2`
		FOREIGN KEY (`user_id`)
			REFERENCES `synesthesia_symphony`.`users` (`user_id`)
			ON DELETE CASCADE
			ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

-- `synesthesia_symphony`.`midis`

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`midis` (
	`midi_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'MIDI ID.',
	`file_name` VARCHAR(45) NOT NULL COMMENT 'MIDI file name.',
	`file_path` VARCHAR(255) NOT NULL COMMENT 'Relative path to midi file.',
	`title` VARCHAR(45) NOT NULL COMMENT 'Title of this MIDI file.',
	`composer` VARCHAR(45) NULL COMMENT 'The composer of this MIDI.',
	`year` VARCHAR(4) NULL COMMENT 'The year this MIDI was made.',
	`company` VARCHAR(45) NULL COMMENT 'The owner of this MIDI.',
	`arranger` VARCHAR(45) NULL COMMENT 'The author of this MIDI.',
	`duration` TIME(4) NOT NULL COMMENT 'Duration of the MIDI song.',
	PRIMARY KEY (`midi_id`)
) ENGINE = InnoDB;

-- `synesthesia_symphony`.`midi_channels`.

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`midi_channels` (
	`midi_channel_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'MIDI channel ID.',
	`midi_program_id` INT(4) UNSIGNED NOT NULL COMMENT 'MIDI program ID which refrences the midi_programs table.',
	`midi_id` INT(4) UNSIGNED NOT NULL COMMENT 'MIDI ID which references the midis table.',
	INDEX `midi_program_id_fk_idx` (`midi_program_id` ASC),
	UNIQUE INDEX `midi_channel_id_un_idx` (`midi_program_id` ASC, `midi_id` ASC),
	PRIMARY KEY (`midi_channel_id`),
	INDEX `midi_id_fk_idx` (`midi_id` ASC),
	CONSTRAINT `midi_program_id_fk`
		FOREIGN KEY (`midi_program_id`)
			REFERENCES `synesthesia_symphony`.`midi_programs` (`midi_program_id`)
				ON DELETE CASCADE
				ON UPDATE NO ACTION,
	CONSTRAINT `midi_id_fk`
		FOREIGN KEY (`midi_id`)
			REFERENCES `synesthesia_symphony`.`midis` (`midi_id`)
				ON DELETE CASCADE
				ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- `synesthesia_symphony`.`midi_programs`

CREATE TABLE IF NOT EXISTS `synesthesia_symphony`.`midi_programs` (
	`midi_program_id` INT(4) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'MIDI program ID.',
	`title` VARCHAR(20) NOT NULL COMMENT 'Name of MIDI program event.',
	PRIMARY KEY (`midi_program_id`)
) ENGINE = InnoDB;


SET FOREIGN_KEY_CHECKS = 1;


