import { inject, injectable } from "tsyringe";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "../../config/config.service";

@injectable()
export class TokenService {
  constructor(
    @inject(ConfigService.name) private readonly configService: ConfigService
  ) {}

  async verify(token: string): Promise<JwtPayload> {
    return jwt.verify(
      token,
      this.configService.get<string>("JWT_SECRET")
    ) as JwtPayload;
  }

  async generate(id: string): Promise<string> {
    return jwt.sign({ id }, this.configService.get<string>("JWT_SECRET"), {
      expiresIn: this.configService.get<string>("JWT_EXPIRES_IN"),
    });
  }
}
