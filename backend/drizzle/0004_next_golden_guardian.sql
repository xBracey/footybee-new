DROP TABLE IF EXISTS `predictions`;
--> statement-breakpoint
CREATE TABLE `predictions` (
	`username` text,
	`fixture_id` text,
	`home_team_score` integer,
	`away_team_score` integer,
	PRIMARY KEY(`fixture_id`, `username`),
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);