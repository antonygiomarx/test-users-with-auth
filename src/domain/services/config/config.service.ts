import { injectable } from "tsyringe";

import dotenv from "dotenv";

dotenv.config();

@injectable()
export class ConfigService {
  get<T extends string | number>(key: string): T {
    const value = process.env[key];

    if (!value) {
      throw new Error(`ConfigService: key ${key} not found`);
    }

    if (Number(value) && !Number.isNaN(Number(value))) {
      return Number(value) as T;
    }

    return value as T;
  }
}
