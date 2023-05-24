import { User } from "../../../../domain/models/user.model";

export interface UpdateUserResponse {
  success: boolean;

  user?: Partial<User | null>;

  error?: string;
}
