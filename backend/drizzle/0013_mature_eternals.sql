ALTER TABLE users ADD `top_scorer_player_id` integer REFERENCES players(id);--> statement-breakpoint
ALTER TABLE users ADD `tournament_winner_id` integer REFERENCES teams(id);--> statement-breakpoint
ALTER TABLE users ADD `points` integer DEFAULT 0 NOT NULL;