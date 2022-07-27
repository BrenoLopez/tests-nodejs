export class HttpException extends Error {
  name: string;
  statusCode: number;
  constructor(error: Error, status: number) {
    super(error.message);
    this.name = error.name;
    this.statusCode = status;
  }
}
