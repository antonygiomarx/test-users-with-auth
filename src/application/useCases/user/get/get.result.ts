import { User } from "../../../../domain/models/user.model";

export interface GetUserResult {
  success: boolean;
  user?: Partial<User> | null;
  error?: string;
}
