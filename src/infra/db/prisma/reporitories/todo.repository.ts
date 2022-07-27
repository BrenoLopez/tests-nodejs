import { TodoEntity } from "@/core/domain/entities/todo/todo.entity";
import { TodoRepositoryInterface } from "@/core/domain/repositories/todo.repository";
import { prisma } from "../index";
export class TodoPrismaRepository implements TodoRepositoryInterface {
  async create(todo: TodoEntity): Promise<TodoEntity> {
    const createdTodo = await prisma.todo.create({ data: todo });
    return createdTodo as TodoEntity;
  }

  findAll(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }
}
