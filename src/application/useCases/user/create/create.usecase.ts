import { inject, injectable } from "tsyringe";
import { CreateUserDto } from "../../../dtos/create-user.dto";
import { CreateUserResult } from "./create.result";
import { UserService } from "../../../../domain/services/user/user.service";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserService.name) private readonly userService: UserService
  ) {}

  public async execute(user: CreateUserDto): Promise<CreateUserResult> {
    const createdUser = await this.userService.create(user);

    return { success: true, user: createdUser };
  }
}
