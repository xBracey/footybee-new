import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { FixturesPage } from "../pages/Fixtures";
import Loading from "../components/Loading";

const Fixtures = () => {
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();

  if (!teams || !fixtures) {
    return <Loading />;
  }

  return <FixturesPage teams={teams} fixtures={fixtures} />;
};

export const Route = createLazyFileRoute("/fixtures")({
  component: Fixtures,
});
