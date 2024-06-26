CREATE TABLE `user_teams` (
	`username` text,
	`team_id` integer,
	`round_predictions` text,
	PRIMARY KEY(`team_id`, `username`),
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`round_predictions`) REFERENCES `rounds`(`round`) ON UPDATE no action ON DELETE no action
);
