import express from "express";
import http from "node:http";
import { readFile } from "fs/promises";
import { watch } from "fs";
import path from "path";
import { WebSocketServer } from "ws";

const dir = path.join(
  path.dirname(new URL(import.meta.url).pathname.slice(1)),
  "src",
);
const app = express();

const middleware = async (req, res, next) => {
  if (!req.url.endsWith(".js")) {
    return next();
  }
  if (req.url.includes("hmr-client")) return next();

  const pwd = process.cwd();
  const fileContent = await readFile(path.join(pwd, req.url), "utf-8");

  res.type(".js");
  res.send(fileContent);
};

app.use(middleware);
app.use(express.static(process.cwd()));

const server = http.createServer(app);

const ws = new WebSocketServer({ server });
let socket;

ws.on("connection", (_socket) => {
  console.log("connected");
  socket = _socket;
});

watch(dir, { recursive: true }, (_, fileName) => {
  if (fileName) {
    console.log("changed", fileName);
    const payload = { type: "file-changed", file: `/src/${fileName}` };
    socket?.send(JSON.stringify(payload));
  }
});

server.listen(3000, () => {
  console.log("running on 3000");
});
