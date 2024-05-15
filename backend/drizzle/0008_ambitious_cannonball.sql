CREATE TABLE `userGroups` (
	`username` text,
	`group_letter` text,
	`switches` text,
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`group_letter`) REFERENCES `groups`(`letter`) ON UPDATE no action ON DELETE no action
);
