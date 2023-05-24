import { User } from "../../../../domain/models/user.model";

export interface GetAllUsersResponse {
  success: boolean;
  users?: Partial<User>[];
  error?: string;
}
