import { inject, injectable } from "tsyringe";
import { RegisterService } from "../../../../domain/services/auth/register/register.service";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("RegisterService") private registerService: RegisterService
  ) {}

  async execute(name: string, email: string, password: string) {
    return this.registerService.register(name, email, password);
  }
}
