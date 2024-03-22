import fastify from "fastify";
import cors from "@fastify/cors";
import { buildApiRoutes } from "./db/router";

const server = fastify();

server.register(cors);

server.register(buildApiRoutes, { prefix: "/api" });

server.listen(
  {
    host: "0.0.0.0",
    port: 8080,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Started server at ${address}`);
  }
);
