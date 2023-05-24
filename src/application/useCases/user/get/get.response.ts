import { User } from "../../../../domain/models/user.model";

export interface GetUserResponse {
  success: boolean;
  user?: Partial<User | null>;
  error?: string;
}
