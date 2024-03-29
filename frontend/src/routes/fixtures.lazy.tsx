import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetResults } from "../queries/useGetResults";
import { FixturesPage } from "../pages/Fixtures";

const Fixtures = () => {
  const teams = useGetTeams();
  const fixtures = useGetFixtures();
  const results = useGetResults();

  if (!teams || !fixtures || !results) {
    return <div className="p-4">Loading</div>;
  }

  return (
    <div className="p-4">
      <FixturesPage teams={teams} fixtures={fixtures} results={results} />
    </div>
  );
};

export const Route = createLazyFileRoute("/fixtures")({
  component: Fixtures,
});
