CREATE TABLE `user_fixtures` (
	`username` text,
	`fixture_id` integer,
	`points` integer,
	PRIMARY KEY(`fixture_id`, `username`),
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `points`;--> statement-breakpoint
ALTER TABLE user_groups ADD `points` integer;