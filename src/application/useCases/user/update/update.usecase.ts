import { inject, injectable } from "tsyringe";
import { UpdateUserDto } from "../../../dtos/update-user.dto";
import { UpdateUserResult } from "./update.result";
import { UserService } from "../../../../domain/services/user/user.service";
import { UserNotFoundException } from "../../../../domain/exceptions/users";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {}

  public async execute(
    id: string,
    user: UpdateUserDto
  ): Promise<UpdateUserResult> {
    const updatedUser = await this.userService.update(id, user);

    if (!updatedUser) {
      throw new UserNotFoundException(`El usuario con id ${id} no existe`);
    }

    return { success: true, user: updatedUser };
  }
}
