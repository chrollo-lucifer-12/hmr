import express from "express";
import path from "path";
import { WebSocketServer } from "ws";
import http from "node:http";
const app = express();
import { watch, existsSync } from "fs";
import { readFile } from "fs/promises";

const hmrMiddleware = async (req, res, next) => {
  const pwd = process.cwd();
  if (!req.url.endsWith("js")) {
    return next();
  }

  console.log(pwd, req.url);

  const moduleContent = await readFile(path.join(pwd, req.url), "utf-8");
  const clientContent = await readFile(path.join(pwd, "HmrClient.js"), "utf-8");

  const content = `${clientContent} hmrClient(import.meta); ${moduleContent}`;

  res.type(".js");
  res.send(content);
};

app.use(hmrMiddleware);
app.use(express.static(process.cwd()));

const server = http.createServer(app);

const ws = new WebSocketServer({ server });
let socket;
ws.on("connection", (_socket) => {
  console.log("connected");
  socket = _socket;
});

const dir = path.join(
  path.dirname(new URL(import.meta.url).pathname.slice(1)),
  "src",
);

console.log(dir);

watch(dir, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log("changed:", filename);
    const payload = { type: "file-changed", file: `/src/${filename}` };
    socket?.send(JSON.stringify(payload));
  }
});

server.listen(8085, () => console.log("Listening at port 8085..."));
