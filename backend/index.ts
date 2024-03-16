import fastify from "fastify";
import { getUsers } from "./db";
import cors from "@fastify/cors";

const server = fastify();

server.register(cors);

server.get("/", async (request, reply) => {
  return "Hello there! 👋";
});

server.get("/users", async (request, reply) => {
  return getUsers();
});

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
