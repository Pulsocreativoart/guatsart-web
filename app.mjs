import { createServer } from "node:http";
import next from "next";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const app = next({
  dev: false,
  hostname: process.env.HOSTNAME || "localhost",
  port,
});
const handle = app.getRequestHandler();

await app.prepare();
createServer((request, response) => handle(request, response)).listen(port);
