import * as mongoose from "mongoose";
import { inject, injectable } from "tsyringe";
import {
  UserRepository,
  UserWithoutPassword,
} from "../../../../domain/repositories/user.repository";
import { User } from "../../../../domain/models/user.model";
import { CreateUserDto } from "../../../../application/dtos/create-user.dto";
import { UpdateUserDto } from "../../../../application/dtos/update-user.dto";
import { UserWithoutPasswordMapper } from "../../../mappers/user-without-password.mapper";
import { UserNotFoundException } from "../../../../domain/exceptions/users";
import { ConfigService } from "../../../../domain/services/config/config.service";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

@injectable()
export class UserMongoRepository implements UserRepository {
  private readonly userModel: mongoose.Model<User>;

  constructor(
    @inject(ConfigService.name)
    private readonly configService: ConfigService
  ) {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(this.configService.get<string>("MONGO_URI"), {})
      .then(() => console.info("Connected to MongoDB"));

    this.userModel = mongoose.model<User>("User", userSchema);
  }

  async getByEmail(email: string): Promise<UserWithoutPassword | null> {
    const dbUser = await this.userModel
      .findOne({ email })
      .select("-password -__v")
      .lean()
      .exec();

    let userWithoutPassword: UserWithoutPassword | null = null;

    if (dbUser) {
      const { _id, ...userWithoutId } = dbUser;
      userWithoutId.id = _id.toString();
      userWithoutPassword = userWithoutId;
    }

    return userWithoutPassword || null;
  }

  async create(user: CreateUserDto): Promise<UserWithoutPassword> {
    const createdUser = await this.userModel.create(user);

    const { _id, ...userWithoutId } = createdUser.toObject();

    const userWithoutPasswordMapper = new UserWithoutPasswordMapper(
      _id.toString(),
      userWithoutId.name,
      userWithoutId.email,
      userWithoutId.createdAt,
      userWithoutId.updatedAt
    );

    return userWithoutPasswordMapper.map();
  }

  async get(userId: string): Promise<UserWithoutPassword> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UserNotFoundException(
        `El usuario con el id ${userId} no existe`
      );
    }

    const userWithoutPasswordMapper = new UserWithoutPasswordMapper(
      user._id.toString(),
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt
    );

    return userWithoutPasswordMapper.map();
  }

  async getAll(): Promise<UserWithoutPassword[]> {
    const users = await this.userModel.find();

    if (!users) {
      throw new UserNotFoundException(`No existen usuarios`);
    }

    return users.map((user) => {
      const userWithoutPasswordMapper = new UserWithoutPasswordMapper(
        user._id.toString(),
        user.name,
        user.email,
        user.createdAt,
        user.updatedAt
      );

      return userWithoutPasswordMapper.map();
    });
  }

  async update(
    userId: string,
    user: UpdateUserDto
  ): Promise<UserWithoutPassword | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...user,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new UserNotFoundException(
        `El usuario con el id ${userId} no existe`
      );
    }

    const userWithoutPasswordMapper = new UserWithoutPasswordMapper(
      updatedUser._id.toString(),
      updatedUser.name,
      updatedUser.email,
      updatedUser.createdAt,
      updatedUser.updatedAt
    );

    return userWithoutPasswordMapper.map();
  }

  async delete(userId: string): Promise<boolean> {
    const user = await this.get(userId);

    const result = await this.userModel.deleteOne({ _id: user.id });
    return result.deletedCount > 0;
  }

  async getForAuth(email: string): Promise<User | null> {
    const dbUser = await this.userModel
      .findOne({ email })
      .select("-__v")
      .lean()
      .exec();

    let user: User | null = null;

    if (dbUser) {
      const { _id, ...userWithoutId } = dbUser;
      userWithoutId.id = _id.toString();
      user = userWithoutId as User;
    }

    return user || null;
  }
}
