import { ErrorBase } from "./error-base";

export class UnexpectedError extends ErrorBase {
  constructor(message: string) {
    const error = new Error(message);
    super(error);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
