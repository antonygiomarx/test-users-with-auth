export interface LoginResult {
  success: boolean;
  token?: string;
  error?: string;
  code?: number;
}
