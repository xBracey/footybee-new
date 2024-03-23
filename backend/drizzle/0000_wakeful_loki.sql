CREATE TABLE `users` (
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `fixtures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`home_team_id` text,
	`away_team_id` text,
	`date` integer,
	`time` integer,
	FOREIGN KEY (`home_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`away_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `leagues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`creator_user_id` text,
	FOREIGN KEY (`creator_user_id`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fixture_id` text,
	`home_team_score` integer,
	`away_team_score` integer,
	FOREIGN KEY (`fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `predictions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`fixture_id` text,
	`home_team_score` integer,
	`away_team_score` integer,
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_leagues` (
	`username` text,
	`league_id` text,
	PRIMARY KEY(`league_id`, `username`)
);
--> statement-breakpoint
CREATE TABLE `points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`fixture_id` text,
	`points` integer,
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);