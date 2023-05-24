import { User } from "../../../../domain/models/user.model";

export interface UpdateUserResult {
  success: boolean;
  user?: Partial<User> | null;
  error?: string;
}
