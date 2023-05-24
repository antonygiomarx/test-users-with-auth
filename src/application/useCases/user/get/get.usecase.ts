import { inject, injectable } from "tsyringe";
import { GetUserResult } from "./get.result";
import { UserService } from "../../../../domain/services/user/user.service";

@injectable()
export class GetUserUseCase {
  constructor(
    @inject(UserService.name) private readonly userService: UserService
  ) {}

  public async execute(id: string): Promise<GetUserResult> {
    const user = await this.userService.get(id);

    return { success: true, user };
  }
}
