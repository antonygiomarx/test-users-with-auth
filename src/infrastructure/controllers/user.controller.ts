import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-code.util";
import { DependencyRegistry } from "../config/di.config";
import { GetAllUsersUseCase } from "../../application/useCases/user/get-all/get-all.usecase";
import { CreateUserUseCase } from "../../application/useCases/user/create/create.usecase";
import { DefaultErrorHandlerService } from "../../domain/services/error/error-handler.service";
import { GetUserUseCase } from "../../application/useCases/user/get/get.usecase";
import { UpdateUserUseCase } from "../../application/useCases/user/update/update.usecase";
import { DeleteUserUseCase } from "../../application/useCases/user/delete/delete.usecase";
import { GetUserResponse } from "../../application/useCases/user/get/get.response";
import { GetAllUsersResponse } from "../../application/useCases/user/get-all/get-all.response";
import { CreateUserResponse } from "../../application/useCases/user/create/create.response";
import { UpdateUserResponse } from "../../application/useCases/user/update/update.response";
import { DeleteUserResponse } from "../../application/useCases/user/delete/delete.response";

const dependencyRegistry = new DependencyRegistry();

const defaultErrorHandlerService =
  dependencyRegistry.container.resolve<DefaultErrorHandlerService>(
    DefaultErrorHandlerService.name
  );

export class UserController {
  async getAll(
    _: Request,
    res: Response
  ): Promise<Response<GetAllUsersResponse>> {
    try {
      const getAllUsersUseCase =
        dependencyRegistry.container.resolve<GetAllUsersUseCase>(
          GetAllUsersUseCase.name
        );

      const result = await getAllUsersUseCase.execute();

      return res.status(HttpStatusCode.OK).json({
        success: result.success,
        users: result.users,
      });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }

  async getById(
    req: Request,
    res: Response
  ): Promise<Response<GetUserResponse>> {
    try {
      const { id } = req.params;

      const getUserUseCase =
        dependencyRegistry.container.resolve<GetUserUseCase>(
          GetUserUseCase.name
        );

      const result = await getUserUseCase.execute(id);

      return res.status(HttpStatusCode.OK).json({
        success: result.success,
        user: result.user,
      });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }

  async create(
    req: Request,
    res: Response
  ): Promise<Response<CreateUserResponse>> {
    const { name, email, password } = req.body;

    try {
      const createUserUseCase =
        dependencyRegistry.container.resolve<CreateUserUseCase>(
          CreateUserUseCase.name
        );

      const result = await createUserUseCase.execute({
        name,
        email,
        password,
      });

      return res.status(HttpStatusCode.CREATED).json({
        user: result.user,
        success: result.success,
      });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }

  async update(
    req: Request,
    res: Response
  ): Promise<Response<UpdateUserResponse>> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updateUserUseCase =
        dependencyRegistry.container.resolve<UpdateUserUseCase>(
          UpdateUserUseCase.name
        );

      const result = await updateUserUseCase.execute(id, {
        name,
        email,
        password,
      });

      return res.status(HttpStatusCode.OK).json({
        user: result.user,
        success: result.success,
      });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }

  async delete(
    req: Request,
    res: Response
  ): Promise<Response<DeleteUserResponse>> {
    try {
      const { id } = req.params;

      const deleteUserUseCase =
        dependencyRegistry.container.resolve<DeleteUserUseCase>(
          DeleteUserUseCase.name
        );

      await deleteUserUseCase.execute(id);

      return res.status(HttpStatusCode.OK).json({
        success: true,
      });
    } catch (error) {
      return defaultErrorHandlerService.handle(error, res);
    }
  }
}
