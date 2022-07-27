import { errorHandler } from "@infra/middlewares";
import { routes } from "@infra/routes";
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
app.use(routes);
app.use(errorHandler);
app.use((_: Request, response: Response) => {
  return response.status(404).send("Página não encontrada! ;-;");
});

createSecureServer(
  {
    key: readFileSync(resolve(__dirname, "..", "ssl/localhost.key")),
    cert: readFileSync(resolve(__dirname, "..", "ssl/localhost.crt")),
    allowHttp1: true,
  } as SecureServerOptions,
  app
).listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
