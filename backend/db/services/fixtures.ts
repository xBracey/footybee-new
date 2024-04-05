import { getFixtures, insertFixture } from "../repositories/fixtures";
import { ServiceHandler } from "./types";

export const getFixturesHandler: ServiceHandler = async (_, reply) => {
  const fixtures = await getFixtures();

  reply.send(fixtures);
};

export const insertFixturesHandler: ServiceHandler = async (request, reply) => {
  const data = request.body as {
    groupLetter: string;
    homeTeamId: number;
    awayTeamId: number;
    dateTime: number;
  };

  await insertFixture(data);

  reply.send(data);
};
