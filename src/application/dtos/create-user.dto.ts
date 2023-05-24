export class CreateUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
