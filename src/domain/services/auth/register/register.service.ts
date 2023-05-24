import { inject, injectable } from "tsyringe";
import { RegisterResult } from "../../../../application/useCases/auth/register/register.result";
import { UserService } from "../../user/user.service";
import { TokenService } from "../token/token.service";

@injectable()
export class RegisterService {
  constructor(
    @inject(UserService.name) private userService: UserService,
    @inject(TokenService.name) private readonly tokenService: TokenService
  ) {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResult> {
    const user = await this.userService.create({ name, email, password });

    const token = await this.tokenService.generate(user.id);

    return { success: true, token };
  }
}
