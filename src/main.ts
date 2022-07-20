import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import { readFileSync } from "fs";
import { createSecureServer, SecureServerOptions } from "http2";
import http2Express from "http2-express-bridge";
import { resolve } from "path";

config();

const app = http2Express(express);

const PORT = Number(process.env.PORT) || 3333;
app.use(cors());
app.use(express.json());
app.get("/", (_: Request, response: Response) => {
  return response.send("hello");
});

createSecureServer(
  {
    key: readFileSync(resolve(__dirname, "..", "ssl/localhost.key")),
    cert: readFileSync(resolve(__dirname, "..", "ssl/localhost.crt")),
    allowHttp1: true,
  } as SecureServerOptions,
  app
).listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
