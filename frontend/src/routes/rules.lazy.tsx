import { createLazyFileRoute } from "@tanstack/react-router";
import Banner from "../components/Banner";
import Box from "../components/Box";

const Rules = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner>
        <h1 className="text-2xl font-bold text-white">Rules</h1>
      </Banner>

      <div className="max-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 p-3">
        <Box className="flex flex-col gap-2 text-center text-sm">
          <h2 className="text-2xl font-bold">Welcome to FootyBee</h2>
          <p>
            Welcome to FootyBee, a World Cup 2022 football predictor where you
            can make predictions on games and create and join leagues with your
            friends.
          </p>
          <p>
            The football predictor consists of two rounds, one for the group
            stages of the competition, and one for the knockout stages. Below is
            a summary for how you gain points for each round
          </p>
        </Box>

        <div className="flex flex-col gap-4 md:flex-row">
          <Box className="flex flex-col items-center gap-2 text-center text-sm">
            <h2 className="text-2xl font-bold">Group Stage Rules</h2>
            <p>
              During the group stage, you can earn points based on the accuracy
              of your match predictions. The scoring system works as follows:
            </p>
            <ul className="flex flex-col gap-1 pl-3">
              <li>
                <b>Correct Score Prediction - 25 Points</b>
                <p>
                  If you predict the exact final score (e.g., 2-1), you'll earn
                  25 points.
                </p>
              </li>
              <li>
                <b>Correct Score Margin (excluding draws) - 15 Points</b>
                <p>
                  If you predict the correct goal difference, but not the exact
                  score (e.g., you predict 1-0, and the match ends 2-1), you'll
                  earn 15 points. This does not apply to draw predictions.
                </p>
              </li>
              <li>
                <b>Correct Draw Prediction - 10 Points</b>
                <p>
                  If you correctly predict a draw (e.g., 1-1 or 0-0), you'll
                  earn 10 points.
                </p>
              </li>
              <li>
                <b>Correct Winner Prediction - 5 Points</b>
                <p>
                  If you predict the correct winning team, but not the exact
                  score (e.g., you predict 3-0, and the match ends 2-1), you'll
                  earn 5 points.
                </p>
              </li>
            </ul>

            <p className="my-2 text-lg font-bold">Here are some examples</p>

            <ul className="flex flex-col gap-1 pl-3">
              <li>
                <b>You predict 2-1, the match ends 2-1:</b> <br />
                25 points (Correct Score)
              </li>
              <li>
                <b>You predict 1-0, the match ends 2-1:</b> <br />
                15 points (Correct Score Margin, excluding draws)
              </li>
              <li>
                <b>You predict 1-1, the match ends 1-1:</b> <br />
                25 points (Correct Score, since it's a draw)
              </li>
              <li>
                <b>You predict 1-1, the match ends 0-0:</b> <br />
                10 points (Correct Draw Prediction)
              </li>
              <li>
                <b>You predict 3-0, the match ends 2-1:</b> <br />5 points
                (Correct Winner Prediction)
              </li>
              <li>
                <b>You predict 1-1, the match ends 2-1:</b> <br /> 0 points
                (Incorrect Prediction)
              </li>
            </ul>
          </Box>

          <Box className="flex flex-col items-center gap-2 text-center text-sm">
            <h2 className="text-2xl font-bold">Knockout Stage Rules</h2>
            <p>
              In the knockout stages, starting from the Round of 16 all the way
              to the Final, you'll be predicting which teams will advance
              through each round. Points are awarded cumulatively based on how
              far you accurately predict a team's progression. For each team,
              you'll earn points if you correctly predict their advancement to
              the next round, with higher points awarded for predicting deeper
              runs:
            </p>

            <ul className="pl-3 font-bold">
              <li>Round of 16 Advancement: 15 points</li>
              <li>Quarterfinal Advancement: 20 points</li>
              <li>Semifinal Advancement: 30 points</li>
              <li>Tournament Winner: 40 points</li>
            </ul>

            <p className="my-2 text-lg font-bold">Here are some examples</p>

            <div className="flex w-full flex-col gap-4">
              <div>
                <p>
                  You predict Portugal to reach the final, but they win the
                  tournament, you earn:
                </p>
                <p>15 points (Round of 16 advancement)</p>
                <p>20 points (Quarter Final advancement)</p>
                <p>30 points (Semi Final advancement)</p>
                <p>
                  <b> For a total of 65 points</b>
                </p>
              </div>

              <div>
                <p>
                  You predict France to reach the semi finals, but they're
                  eliminated in the quarter finals, you earn:
                </p>
                <p>15 points (Round of 16 advancement)</p>
                <p>
                  <b> For a total of 15 points</b>
                </p>
              </div>

              <div>
                <p>
                  You predict Germany to reach the quarter finals, but they are
                  eliminated in the round of 16.
                </p>
                <p>
                  <b>You earn 0 points</b>
                </p>
              </div>

              <div>
                <p>
                  You predict England to win the tournament and they do! You
                  earn:
                </p>
                <p>15 points (Round of 16 advancement)</p>
                <p>20 points (Quarter Final advancement)</p>
                <p>30 points (Semi Final advancement)</p>
                <p>40 points (Final advancement)</p>
                <p>
                  <b> For a total of 105 points</b>
                </p>
              </div>
            </div>
          </Box>
        </div>

        <Box className="flex flex-col items-center gap-2 text-center text-sm">
          <h2 className="text-2xl font-bold">Bonus Player and Team Scoring</h2>
          <p>
            At the start of the predictor, you'll have the opportunity to select
            a bonus player and a bonus team. These selections can earn you
            additional points throughout the tournament:
          </p>

          <div className="flex items-center gap-2">
            <p>
              <b>Bonus Player</b> - For each goal scored by your chosen bonus
              player, you'll earn <b>10 points</b>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              <b>Bonus Team</b> - For each match your chosen bonus team wins a
              match, you'll earn <b>10 points</b>.
            </p>
          </div>

          <p className="my-2 text-lg font-bold">Here are some examples</p>

          <ul className="flex flex-col gap-1 pl-3">
            <li>
              <b>
                If your bonus player is Harry Kane, and he scores 5 goals in the
                tournament match, you'll earn:
              </b>
              <p>50 points (5 goals x 10 points)</p>
            </li>
            <li>
              <b>
                If your bonus team is France, and they win a group stage match
                against Australia, you'll earn:
              </b>
              <p>10 points</p>
            </li>
            <li>
              <b>
                If your bonus team is Germany, and they win all 3 of their group
                stage matches, you'll earn:
              </b>
              <p>30 points (3 wins x 10 points)</p>
            </li>
          </ul>
        </Box>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/rules")({
  component: Rules,
});
