import { inject, injectable } from "tsyringe";
import { PasswordService } from "../password/password.service";
import { UserMongoRepository } from "../../../../infrastructure/persistence/respositories/user/user-mongo.repository";
import { InvalidCredentialsException } from "../../../exceptions/auth";
import { LoginResult } from "../../../../application/useCases/auth/login/login.result";
import { TokenService } from "../token/token.service";

@injectable()
export class LoginService {
  constructor(
    @inject(UserMongoRepository.name)
    private userRepository: UserMongoRepository,
    @inject(PasswordService.name) private passwordService: PasswordService,
    @inject(TokenService.name) private tokenService: TokenService
  ) {}

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.getForAuth(email);

    if (!user) {
      throw new InvalidCredentialsException("Usuario o contraseña inválidos");
    }

    const isValidPassword = await this.passwordService.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsException("Usuario o contraseña inválidos");
    }

    const token = await this.tokenService.generate(user.id);

    return { success: true, token };
  }
}
