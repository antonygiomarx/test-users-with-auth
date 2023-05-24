import { inject, injectable } from "tsyringe";
import { DeleteUserResult } from "./delete.result";
import { UserService } from "../../../../domain/services/user/user.service";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(UserService.name) private readonly userService: UserService
  ) {}

  public async execute(id: string): Promise<DeleteUserResult> {
    await this.userService.delete(id);

    return {
      success: true,
    };
  }
}
