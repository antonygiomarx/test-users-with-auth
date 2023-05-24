import { inject, injectable } from "tsyringe";
import { UserWithoutPassword } from "../../repositories/user.repository";
import { UserMongoRepository } from "../../../infrastructure/persistence/respositories/user/user-mongo.repository";
import { UpdateUserDto } from "../../../application/dtos/update-user.dto";
import { CreateUserDto } from "../../../application/dtos/create-user.dto";
import { PasswordService } from "../auth/password/password.service";
import { UserAlreadyExistsException } from "../../exceptions/users";

@injectable()
export class UserService {
  constructor(
    @inject(UserMongoRepository.name)
    private readonly userRepository: UserMongoRepository,
    @inject(PasswordService.name)
    private readonly passwordService: PasswordService
  ) {}

  async create(user: CreateUserDto): Promise<UserWithoutPassword> {
    const existingUser = await this.userRepository.getByEmail(user.email);

    if (existingUser) {
      throw new UserAlreadyExistsException(
        `El usuario con el correo ${user.email} ya existe`
      );
    }

    const hashedPassword = await this.passwordService.hash(user.password);

    const userToCreate = {
      ...user,
      password: hashedPassword,
    };

    return this.userRepository.create(userToCreate);
  }

  async getAll(): Promise<UserWithoutPassword[] | null> {
    return this.userRepository.getAll();
  }

  async get(userId: string): Promise<UserWithoutPassword | null> {
    return this.userRepository.get(userId);
  }

  async update(
    userId: string,
    user: UpdateUserDto
  ): Promise<UserWithoutPassword | null> {
    const existingUser = await this.userRepository.getByEmail(user.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(
        `El usuario con el correo ${user.email} ya existe`
      );
    }

    return this.userRepository.update(userId, user);
  }

  async delete(userId: string): Promise<boolean> {
    return this.userRepository.delete(userId);
  }
}
