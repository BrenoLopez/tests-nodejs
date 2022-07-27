import { ErrorBase } from "../error-base";

export class UnexpectedErrorCreateTodo extends ErrorBase {
  constructor(message: string) {
    const error = new Error(message);
    super(error);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
