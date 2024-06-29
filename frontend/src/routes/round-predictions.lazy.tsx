import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetMe } from "../queries/useGetMe";
import Loading from "../components/Loading";
import { useGetRoundFixtures } from "../queries/useGetRoundFixtures";
import RoundPredictions from "../components/RoundPredictions";
import { IRoundPrediction } from "../components/RoundPredictions/types";
import { UserTeam } from "../../../shared/types/database";
import { useEditUserTeams } from "../queries/useEditUserTeams";
import { useGetUserTeams } from "../queries/useGetUserTeams";
import { CheckIcon, Dialog } from "@mantine/core";
import { useState } from "react";
import PredictionLock from "../components/PredictionLock";

const RoundPredictionsRoute = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams, isLoading: teamsIsLoading } = useGetTeams();
  const { data: roundFixtures, isLoading: roundFixturesIsLoading } =
    useGetRoundFixtures();
  const { data: userTeams, isLoading: userTeamsIsLoading } = useGetUserTeams(
    user?.username
  );

  const [savedDialog, setSavedDialog] = useState(false);

  const { editUserTeams, isLoading: editUserTeamsIsLoading } = useEditUserTeams(
    () => {
      setSavedDialog(true);

      setTimeout(() => {
        setSavedDialog(false);
      }, 4000);
    }
  );

  if (
    userIsLoading ||
    teamsIsLoading ||
    roundFixturesIsLoading ||
    userTeamsIsLoading
  ) {
    return <Loading />;
  }

  if (!user || !user.username) {
    return <Navigate to="/login" />;
  }

  const onSubmit = (predictions: IRoundPrediction[]) => {
    const finalTeamIds = roundFixtures
      .filter((f) => f.round === "Round of 16")
      .map((f) => [f.homeTeamId, f.awayTeamId])
      .flat();
    const finalTeams = teams.filter((t) => finalTeamIds.includes(t.id));
    const userTeams: UserTeam[] = finalTeams.map((t) => ({
      username: user.username,
      roundPredictions:
        predictions.find(
          (p) =>
            (p.homeTeamId === t.id && p.winner === "away") ||
            (p.awayTeamId === t.id && p.winner === "home")
        )?.round ?? "Winner",
      teamId: t.id,
      points: 0,
    }));

    editUserTeams(userTeams);
  };

  const isPredictionLocked = true;

  return (
    <div className={`relative`}>
      <PredictionLock isLocked={isPredictionLocked} />

      <div
        className={`relative ${
          isPredictionLocked ? "pointer-events-none opacity-70" : ""
        }`}
      >
        <Dialog opened={savedDialog}>
          <p className="text-shamrock-700 flex items-center pl-2 text-center text-lg">
            <CheckIcon className="mr-4 h-4 w-4" />
            Predictions saved successfully!
          </p>
        </Dialog>

        <RoundPredictions
          teams={teams}
          roundFixtures={roundFixtures}
          onSubmit={onSubmit}
          isLoading={editUserTeamsIsLoading}
          userTeams={userTeams}
        />
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/round-predictions")({
  component: RoundPredictionsRoute,
});
