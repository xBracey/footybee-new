import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const tokenToUser = async (
  server: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    reply.status(401).send({ error: "Unauthorized" });
    return;
  }

  const verified = server.jwt.verify(token);

  if (!verified) {
    reply.status(401).send({ error: "Unauthorized" });
    return;
  }

  const userDecoded = server.jwt.decode(token) as { username: string };

  if (!userDecoded) {
    reply.status(404).send({ error: "User not found" });
    return;
  }

  return userDecoded;
};
