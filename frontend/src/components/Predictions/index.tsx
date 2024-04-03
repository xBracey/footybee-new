import { Fixture, Prediction, Team } from "../../../../shared/types/database";

interface IPredictions {
  teams: Team[];
  fixtures: Fixture[];
  predictions: Prediction[];
}

const Predictions = ({}: IPredictions) => {
  return <div>Hello World</div>;
};

export default Predictions;
