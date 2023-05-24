import { inject, injectable } from "tsyringe";
import { LoginService } from "../../../../domain/services/auth/login/login.service";
import { LoginResult } from "./login.result";

@injectable()
export class LoginUseCase {
  constructor(@inject(LoginService.name) private loginService: LoginService) {}

  async execute(email: string, password: string): Promise<LoginResult> {
    return this.loginService.login(email, password);
  }
}
