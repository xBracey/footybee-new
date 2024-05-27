ALTER TABLE users ADD `bonus_player_id` integer REFERENCES players(id);--> statement-breakpoint
ALTER TABLE users ADD `bonus_team_id` integer REFERENCES teams(id);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `top_scorer_player_id`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `tournament_winner_id`;