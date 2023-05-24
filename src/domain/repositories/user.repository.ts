import { User } from "../models/user.model";
import { UpdateUserDto } from "../../application/dtos/update-user.dto";
import { CreateUserDto } from "../../application/dtos/create-user.dto";

export type UserWithoutPassword = Omit<User, "password">;

export interface UserRepository {
  create(user: CreateUserDto): Promise<UserWithoutPassword>;

  get(userId: string): Promise<UserWithoutPassword | null>;

  getAll(): Promise<UserWithoutPassword[] | null>;

  getByEmail(email: string): Promise<UserWithoutPassword | null>;

  getForAuth(email: string): Promise<User | null>;

  update(
    userId: string,
    user: UpdateUserDto
  ): Promise<UserWithoutPassword | null>;

  delete(userId: string): Promise<boolean>;
}
