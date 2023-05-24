import { inject, injectable } from "tsyringe";
import { GetAllUsersResult } from "./get-all.result";
import { UserNotFoundException } from "../../../../domain/exceptions/users/user-not-found.exception";
import { UserService } from "../../../../domain/services/user/user.service";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("UserService") private readonly userService: UserService
  ) {}

  async execute(): Promise<GetAllUsersResult> {
    const users = await this.userService.getAll();

    if (!users || users?.length === 0)
      throw new UserNotFoundException("No se encontraron usuarios");

    return {
      success: true,
      users,
    };
  }
}
