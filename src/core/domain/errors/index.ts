import { ErrorBase } from "./error-base";
import { UnexpectedErrorCreateTodo } from "./todo/unexpected-error-create-todo";
import { UnexpectedError } from "./unexpected.error";

export class DomainError extends ErrorBase {
  static unexpectedError = new UnexpectedError("Houve um erro inesperado!");
  static unexpectedErrorCreateTodo = new UnexpectedErrorCreateTodo(
    "Houve um erro ao criar item!"
  );
}
