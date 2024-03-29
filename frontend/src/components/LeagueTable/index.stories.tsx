import { Story } from "@ladle/react";
import LeagueTable from ".";

const fixtures = [
  {
    id: "1",
    homeTeamId: "1",
    awayTeamId: "2",
    dateTime: 1630512000000,
  },
  {
    id: "2",
    homeTeamId: "3",
    awayTeamId: "4",
    dateTime: 1630512000000,
  },
  {
    id: "3",
    homeTeamId: "2",
    awayTeamId: "3",
    dateTime: 1630512000000,
  },
  {
    id: "4",
    homeTeamId: "4",
    awayTeamId: "1",
    dateTime: 1630512000000,
  },
  {
    id: "5",
    homeTeamId: "1",
    awayTeamId: "3",
    dateTime: 1630512000000,
  },
  {
    id: "6",
    homeTeamId: "2",
    awayTeamId: "4",
    dateTime: 1630512000000,
  },
];

const teams = [
  { id: "1", name: "Germany" },
  { id: "2", name: "Spain" },
  { id: "3", name: "France" },
  { id: "4", name: "Italy" },
];

const results = [
  { id: "1", fixtureId: "1", homeTeamScore: 2, awayTeamScore: 1 },
  { id: "2", fixtureId: "2", homeTeamScore: 2, awayTeamScore: 1 },
  { id: "3", fixtureId: "3", homeTeamScore: 0, awayTeamScore: 3 },
  { id: "4", fixtureId: "4", homeTeamScore: 3, awayTeamScore: 2 },
  { id: "5", fixtureId: "5", homeTeamScore: 3, awayTeamScore: 1 },
  { id: "6", fixtureId: "6", homeTeamScore: 1, awayTeamScore: 1 },
];

export const LeagueTableStory: Story = () => (
  <LeagueTable fixtures={fixtures} results={results} teams={teams} />
);

LeagueTableStory.storyName = "LeagueTable";
