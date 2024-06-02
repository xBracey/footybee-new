import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Fragment } from "react";
import { Info, Switch } from "../Icons/Icons";

interface ILeagueTableModal {}

const LeagueTableModal = ({}: ILeagueTableModal) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Fragment>
      <Modal
        opened={opened}
        onClose={close}
        title="League Table Tiebreakers"
        centered
      >
        <p className="mb-3 text-sm">
          If two or more teams are equal on points on completion of the group
          matches, the following tie-breaking criteria are applied
        </p>
        <ol className="ml-4 flex list-decimal flex-col gap-1 text-sm">
          <li>
            Higher number of points obtained in the matches played between the
            teams in question
          </li>
          <li>
            Superior goal difference resulting from the matches played between
            the teams in question;
          </li>
          <li>
            Higher number of goals scored in the matches played between the
            teams in question
          </li>
          <li>
            If, after having applied criteria 1 to 3, teams still have an equal
            ranking, criteria 1 to 3 are reapplied exclusively to the matches
            between the teams who are still level to determine their final
            rankings.[a] If this procedure does not lead to a decision, criteria
            5 to 10 will apply;
          </li>
          <li>Superior goal difference in all group matches</li>
          <li>Higher number of goals scored in all group matches</li>
          <li>
            If on the last round of the group stage, two teams who are facing
            each other are tied in points, goal difference and goals scored then
            they drew their match, their ranking is determined by a penalty
            shoot-out. (This criterion is not used if more than two teams had
            the same number of points.)
          </li>
          <li>
            Lower disciplinary points total in all group matches (1 point for a
            single yellow card, 3 points for a red card as a consequence of two
            yellow cards, 3 points for a direct red card, 4 points for a yellow
            card followed by a direct red card);
          </li>
        </ol>

        <p className="mt-3 text-sm">
          With the data we have, we can determine the league table for the first
          6 tiebreakers. If there is still a tie, we will show this icon{" "}
          <Switch className="inline h-3.5 w-3.5" /> which will allow you to
          choose the order of the league table
        </p>
      </Modal>

      <button onClick={open}>
        <Info className="h-7 w-7 text-white" />
      </button>
    </Fragment>
  );
};

export default LeagueTableModal;
