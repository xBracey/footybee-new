CREATE TABLE `rounds` (
	`round` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roundFixtures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`round` text,
	`home_team_id` integer,
	`away_team_id` integer,
	`dateTime` integer,
	`home_team_score` integer,
	`away_team_score` integer,
	FOREIGN KEY (`round`) REFERENCES `rounds`(`round`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`home_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`away_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_round_fixtures` (
	`username` text,
	`round_fixture_id` integer,
	`points` integer,
	PRIMARY KEY(`round_fixture_id`, `username`),
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`round_fixture_id`) REFERENCES `roundFixtures`(`id`) ON UPDATE no action ON DELETE no action
);

