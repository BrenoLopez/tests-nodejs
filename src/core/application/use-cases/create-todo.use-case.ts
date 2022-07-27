import { BaseUseCase } from "@core/base/use-cases/base.use-case";
import { DomainError } from "@core/domain/errors";
import { TodoRepositoryInterface } from "@core/domain/repositories/todo.repository";

type InputTodoCreate = {
  title: string;
  description?: string;
};

type OutputTodoCreated = InputTodoCreate & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export class CreateTodoUseCase implements BaseUseCase {
  constructor(private readonly todoRepository: TodoRepositoryInterface) {}
  async execute(todo: InputTodoCreate): Promise<OutputTodoCreated> {
    try {
      const createdTodo = await this.todoRepository.create(todo);
      return createdTodo;
    } catch (error) {
      throw DomainError.unexpectedErrorCreateTodo;
    }
  }
}
