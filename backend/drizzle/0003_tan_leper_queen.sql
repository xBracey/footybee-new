ALTER TABLE fixtures ADD `dateTime` integer;--> statement-breakpoint
ALTER TABLE `fixtures` DROP COLUMN `date`;--> statement-breakpoint
ALTER TABLE `fixtures` DROP COLUMN `time`;