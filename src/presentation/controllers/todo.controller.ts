import { CreateTodoUseCase } from "@core/application/use-cases";
import { UnexpectedErrorCreateTodo } from "@core/domain/errors/todo/unexpected-error-create-todo";
import { HttpException } from "@infra/exceptions";
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CreateTodoDto } from "../dtos/todo/create-todo.dto";
import { CreatedTodoDto } from "../dtos/todo/created-todo.dto";

interface CreateTodoBody extends Request {
  body: CreateTodoDto;
}

export class TodoController {
  constructor(private readonly createTodoUseCase: CreateTodoUseCase) {}

  async create({ body }: CreateTodoBody, response: Response): Promise<any> {
    try {
      const createdTodo = await this.createTodoUseCase.execute(body);
      const createdTodoDto = plainToInstance(CreatedTodoDto, createdTodo, {
        excludeExtraneousValues: true,
      });
      //TODO: Adicionar status do arquivo enum
      return response.status(200).json(createdTodoDto);
    } catch (error) {
      if (error instanceof UnexpectedErrorCreateTodo) {
        //TODO: Adicionar status do arquivo enum
        throw new HttpException(error, 400);
      }
    }
  }
}
