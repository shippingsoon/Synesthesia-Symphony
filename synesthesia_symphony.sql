-- Create the database if it does not exist.
CREATE DATABASE IF NOT EXISTS `synesthesia_symphony`;

-- Use the database.
USE `synesthesia_symphony`;

-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`users`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`users` (
	`user_id` int(4) unsigned NOT NULL AUTO_INCREMENT,
	`user_group_id` int(4) NOT NULL,
	`user_name` varchar(20) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(200) NOT NULL,
	`salt` varchar(200) NOT NULL,
	`first_ip_address` varchar(15) NOT NULL,
	`last_ip_address` varchar(15) NOT NULL,
	`date_joined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_login` int(4) unsigned NOT NULL,
	PRIMARY KEY (`user_id`),
	UNIQUE KEY `email` (`email`),
	UNIQUE KEY `user_name` (`user_name`),
	KEY `user_group_id` (`user_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`enemies`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`enemies` (
	`enemy_id` INT(4) PRIMARY AUTO INCREMENT,	
	
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`enemy_patterns`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`enemy_patterns` (
	`enemy_pattern_id` INT(4) PRIMARY AUTO INCREMENT,
	`enemy_id` INT(4) NOT NULL FOREIGN,
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`enemy_paths`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`enemy_paths` (
	`enemy_path_id` INT(4) PRIMARY AUTO INCREMENT,
	`enemy_id` INT(4) NOT NULL FOREIGN,
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`user_settings`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`user_settings` (
	`user_setting_id` INT(4) PRIMARY AUTO INCREMENT,
	`user_id` INT(4) NOT NULL FOREIGN,
	`master_volume` INT(4) NOT NULL DEFAULT 127,
	`bgm_volume` INT(4) NOT NULL DEFAULT 127,
	`sfx_volume` INT(4) NOT NULL DEFAULT 127,
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;	



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`users`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`users` (
	`user_id` INT(4) PRIMARY AUTO INCREMENT,
	`user_group_id` INT(4) NOT NULL FOREIGN,
	
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`user_groups`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`user_groups` (
	`user_group_id` INT PRIMARY AUTO INCREMENT,
	`title` VARCHAR(30),
	
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`user_statistics`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`user_statistics` (
	`user_statistics_id` INT(4) PRIMARY AUTO INCRMENT,
	`user_id` INT(4) NOT NULL FOREIGN,
	`time_spent` TIMESTAMP,
	`date_added` TIMESTAMP,
	`user_agent` VARCHAR(120),
	`ip_address`	VARCHAR(15),
	`referrer` VARCHAR(250),
	
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;



-- Drop this table if it exists.
DROP TABLE IF EXISTS `synesthesia_symphony`.`user_scores`;

-- Create the table.
CREATE TABLE `synesthesia_symphony`.`user_scores` (
	`user_score_id` INT PRIMARY AUTO INCREMENT,
	`user_id` INT(4) NOT NULL FOREIGN,
	`score` INT,
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8_general_cl;
