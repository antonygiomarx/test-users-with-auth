import bcrypt from "bcrypt";
import { injectable } from "tsyringe";

@injectable()
export class PasswordService {
  public async hash(password: string): Promise<string> {
    if (password.length === 0) throw new Error("Password cannot be empty.");

    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    if (password.length === 0) throw new Error("Password cannot be empty.");

    if (hash.length === 0) throw new Error("Hash cannot be empty.");

    return bcrypt.compare(password, hash);
  }
}
