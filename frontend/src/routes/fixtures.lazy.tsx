import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetResults } from "../queries/useGetResults";
import { FixturesPage } from "../pages/Fixtures";
import Loading from "../components/Loading";

const Fixtures = () => {
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: results } = useGetResults();

  if (!teams || !fixtures || !results) {
    return <Loading />;
  }

  return <FixturesPage teams={teams} fixtures={fixtures} results={results} />;
};

export const Route = createLazyFileRoute("/fixtures")({
  component: Fixtures,
});
