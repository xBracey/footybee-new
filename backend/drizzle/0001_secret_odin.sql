CREATE TABLE `groups` (
	`letter` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE teams ADD `group_letter` text REFERENCES groups(letter);
--> statement-breakpoint
ALTER TABLE fixtures ADD `group_letter` text REFERENCES groups(letter);
