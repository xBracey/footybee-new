import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetRoundFixtures } from "../queries/useGetRoundFixtures";
import { FixturesPage } from "../pages/Fixtures";
import { KnockoutFixturesPage } from "../pages/Fixtures/Knockout";
import Loading from "../components/Loading";
import { CURRENT_STAGE } from "../../../shared/config";

const Fixtures = () => {
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: roundFixtures } = useGetRoundFixtures();

  if (CURRENT_STAGE === "knockout") {
    if (!teams || !roundFixtures) {
      return <Loading />;
    }
    return (
      <KnockoutFixturesPage teams={teams} roundFixtures={roundFixtures} />
    );
  }

  if (!teams || !fixtures) {
    return <Loading />;
  }

  return <FixturesPage teams={teams} fixtures={fixtures} />;
};

export const Route = createLazyFileRoute("/fixtures")({
  component: Fixtures,
});
