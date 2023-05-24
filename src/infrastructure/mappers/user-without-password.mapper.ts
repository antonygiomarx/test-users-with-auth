import { UserWithoutPassword } from "../../domain/repositories/user.repository";

export class UserWithoutPasswordMapper {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date
  ) {}

  map(): UserWithoutPassword {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
