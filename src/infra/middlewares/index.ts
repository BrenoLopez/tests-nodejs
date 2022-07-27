import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

export function errorHandler(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const errorDto = {
    message: "Internal server error",
    statusCode: 500,
  };
  errorDto.message = error.message;
  errorDto.statusCode = error.statusCode;
  return response.status(error.statusCode).json(errorDto);
}

export function validator(
  dto: ClassConstructor<object>,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  const errors = validateSync(plainToInstance(dto, request.body));
  if (errors.length > 0) {
    //TODO: Alterar status para variavel enum
    //TODO: Adicionar arquivo com mensagens padronizadas e recuperar messagem de la
    return response.status(400).json({
      message: "Paramêtros inválidos",
      statusCode: 400,
      errors,
    });
  }
  next();
}
