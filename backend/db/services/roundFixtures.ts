import {
  editRoundFixture,
  getRoundFixture,
  getRoundFixtures,
  insertRoundFixture,
} from "../repositories/roundFixtures";
import { ServiceHandler } from "./types";

export const getRoundFixturesHandler: ServiceHandler = async (_, reply) => {
  const roundFixtures = await getRoundFixtures();

  reply.send(roundFixtures);
};

export const getRoundFixtureHandler: ServiceHandler = async (
  request,
  reply
) => {
  const { id } = request.params as { id: string };
  const roundFixture = await getRoundFixture(parseInt(id));

  if (!roundFixture) {
    reply.status(404).send({ error: "RoundFixture not found" });
  }

  reply.send(roundFixture);
};

export const insertRoundFixturesHandler: ServiceHandler = async (
  request,
  reply
) => {
  const data = request.body as {
    round: string;
    homeTeamId: number;
    awayTeamId: number;
    dateTime: number;
    order: number;
  };

  await insertRoundFixture(data);

  reply.send(data);
};

export const editRoundFixtureHandler: ServiceHandler = async (
  request,
  reply
) => {
  const { id } = request.params as { id: string };

  const data = request.body as {
    round: string;
    homeTeamId: number;
    awayTeamId: number;
    dateTime: number;
    order: number;
  };

  await editRoundFixture(parseInt(id), data);

  reply.send(data);
};
