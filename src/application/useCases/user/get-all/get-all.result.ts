import { User } from "../../../../domain/models/user.model";

export interface GetAllUsersResult {
  success: boolean;
  users?: Partial<User>[];
  error?: string;
}
