import { Expose } from "class-transformer";
import { CreateTodoDto } from "./create-todo.dto";

export class CreatedTodoDto extends CreateTodoDto {
  @Expose()
  id!: string;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}
