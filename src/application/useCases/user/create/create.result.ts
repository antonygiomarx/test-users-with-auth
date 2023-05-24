import { User } from "../../../../domain/models/user.model";

export interface CreateUserResult {
  success: boolean;
  user?: Partial<User> | null;
  error?: string;
}
