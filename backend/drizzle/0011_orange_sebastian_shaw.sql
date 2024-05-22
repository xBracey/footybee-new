CREATE TABLE `leagues` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`password` text,
	`creator_username` text,
	FOREIGN KEY (`creator_username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_leagues` (
	`username` text,
	`league_id` text,
	PRIMARY KEY(`league_id`, `username`),
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`league_id`) REFERENCES `leagues`(`id`) ON UPDATE no action ON DELETE no action
);
