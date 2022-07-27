import { TodoEntity } from "../entities/todo/todo.entity";

export interface TodoRepositoryInterface {
  create(todo: TodoEntity): Promise<TodoEntity>;
  findAll(): Promise<TodoEntity[]>;
}
