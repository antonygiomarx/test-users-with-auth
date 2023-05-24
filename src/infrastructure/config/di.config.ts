import { container } from "tsyringe";
import { UserService } from "../../domain/services/user/user.service";
import { PasswordService } from "../../domain/services/auth/password/password.service";
import { RegisterService } from "../../domain/services/auth/register/register.service";
import { LoginService } from "../../domain/services/auth/login/login.service";
import { LoginUseCase } from "../../application/useCases/auth/login/login.usecase";
import { RegisterUseCase } from "../../application/useCases/auth/register/register.usecase";
import { CreateUserUseCase } from "../../application/useCases/user/create/create.usecase";
import { UserMongoRepository } from "../persistence/respositories/user/user-mongo.repository";
import { GetAllUsersUseCase } from "../../application/useCases/user/get-all/get-all.usecase";
import { GetUserUseCase } from "../../application/useCases/user/get/get.usecase";
import { DefaultErrorHandlerService } from "../../domain/services/error/error-handler.service";
import { UpdateUserUseCase } from "../../application/useCases/user/update/update.usecase";
import { DeleteUserUseCase } from "../../application/useCases/user/delete/delete.usecase";
import { TokenService } from "../../domain/services/auth/token/token.service";
import { ConfigService } from "../../domain/services/config/config.service";

export class DependencyRegistry {
  container = container;

  constructor() {
    this.register();
  }

  register(): void {
    // Use cases
    container.register<LoginUseCase>(LoginUseCase.name, {
      useClass: LoginUseCase,
    });

    container.register<RegisterUseCase>(RegisterUseCase.name, {
      useClass: RegisterUseCase,
    });

    container.register<CreateUserUseCase>(CreateUserUseCase.name, {
      useClass: CreateUserUseCase,
    });

    container.register<GetAllUsersUseCase>(GetAllUsersUseCase.name, {
      useClass: GetAllUsersUseCase,
    });

    container.register<GetUserUseCase>(GetUserUseCase.name, {
      useClass: GetUserUseCase,
    });

    container.register<UpdateUserUseCase>(UpdateUserUseCase.name, {
      useClass: UpdateUserUseCase,
    });

    container.register<DeleteUserUseCase>(DeleteUserUseCase.name, {
      useClass: DeleteUserUseCase,
    });

    // Repositories
    container.register<UserMongoRepository>(UserMongoRepository.name, {
      useClass: UserMongoRepository,
    });

    // Services
    container.register<UserService>(UserService.name, {
      useClass: UserService,
    });

    container.register<PasswordService>(PasswordService.name, {
      useClass: PasswordService,
    });

    container.register<RegisterService>(RegisterService.name, {
      useClass: RegisterService,
    });

    container.register<LoginService>(LoginService.name, {
      useClass: LoginService,
    });

    container.register<TokenService>(TokenService.name, {
      useClass: TokenService,
    });

    container.register<ConfigService>(ConfigService.name, {
      useClass: ConfigService,
    });

    container.register<DefaultErrorHandlerService>(
      DefaultErrorHandlerService.name,
      {
        useClass: DefaultErrorHandlerService,
      }
    );

    this.container = container;
  }
}
