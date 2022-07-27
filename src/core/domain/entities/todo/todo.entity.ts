import { BaseEntity } from "@/core/base/entities";

export class TodoEntity extends BaseEntity {
  title!: string;
  description?: string;
}
