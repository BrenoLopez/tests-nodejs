import { CreateTodoUseCase } from "@core/application/use-cases";
import { TodoEntity } from "@core/domain/entities/todo/todo.entity";
import { DomainError } from "@core/domain/errors";
import { TodoRepositoryInterface } from "@core/domain/repositories/todo.repository";

class MockRepository implements TodoRepositoryInterface {
  async create(todo: TodoEntity): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }
}

describe("Create Todo Use Case", () => {
  let sut: CreateTodoUseCase;
  let mockTodoRepository: TodoRepositoryInterface;
  beforeAll(() => {
    mockTodoRepository = new MockRepository();
    sut = new CreateTodoUseCase(mockTodoRepository);
  });
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  test("Should be create todo", async () => {
    const create = jest.spyOn(mockTodoRepository, "create").mockResolvedValue(
      Promise.resolve({
        id: "any_uuid",
        title: "any_title",
        description: "any_description",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    await sut.execute({
      title: "any_title",
      description: "any_description",
    });
    expect(create).toBeCalledWith({
      title: "any_title",
      description: "any_description",
    });
  });

  test("Should be return unexpected error create todo", async () => {
    jest
      .spyOn(mockTodoRepository, "create")
      .mockRejectedValue(DomainError.unexpectedErrorCreateTodo);
    const result = sut.execute({
      title: "any_title",
      description: "any_description",
    });
    await expect(result).rejects.toThrowError(
      DomainError.unexpectedErrorCreateTodo
    );
  });
});
