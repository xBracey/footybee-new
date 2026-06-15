import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { buildApiRoutes } from "./db/router";
import {
  startLiveScoreWorker,
  stopLiveScoreWorker,
} from "./db/services/liveScoreWorker";
import "dotenv/config";

const server = fastify({
  logger: false,
});

server.register(jwt, {
  secret: "ArcticLegoHuskySquaredle",
});

server.register(cors);

server.register(buildApiRoutes, { prefix: "/api" });

server.listen(
  {
    host: "0.0.0.0",
    port: 7231,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Started server at ${address}`);

    // Background worker: poll Live Score API and update in-play fixtures.
    startLiveScoreWorker();
  }
);

// Graceful shutdown so we don't leave a tick in flight.
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    stopLiveScoreWorker();
    server.close().finally(() => process.exit(0));
  });
}
