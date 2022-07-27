import { CreateTodoUseCase } from "@/core/application/use-cases";
import { TodoController } from "@/presentation/controllers/todo.controller";
import { CreateTodoDto } from "@/presentation/dtos/todo/create-todo.dto";
import { NextFunction, Request, Response, Router } from "express";
import { TodoPrismaRepository } from "../db/prisma/reporitories/todo.repository";
import { validator } from "../middlewares";

const PREFIX = "/todos";
const todoRoutes = Router({ caseSensitive: true });
const todoController = new TodoController(
  new CreateTodoUseCase(new TodoPrismaRepository())
);

todoRoutes.post(
  PREFIX,
  (request: Request, response: Response, next: NextFunction) => {
    validator(CreateTodoDto, request, response, next);
  },
  (request: Request, response: Response, next: NextFunction) => {
    todoController.create(request, response).catch((error: Error) => {
      next(error);
    });
  }
);
// todoRoutes.get("/", (_, response) => {
//   return response.send("hello");
// });
export { todoRoutes };
